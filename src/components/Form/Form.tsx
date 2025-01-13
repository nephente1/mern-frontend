import {  useState } from 'react';
import { useAuthContext } from '../useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendError, createItemFetchRequest, WorkoutTypes } from '../../api/api';
import { Notifications, ResultType } from '../Notifications/Notifications';
import { useNotification } from '../Notifications/useNotificationsHook';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { pl } from 'date-fns/locale';

export const Form = () => {
  const { user } = useAuthContext();
  const { notification, showNotification, hideNotification } = useNotification();
  const [title, setTitle] = useState('')
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState('00:00')
  const [date, setDate] = useState(new Date());
  const [errorSet, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const queryClient = useQueryClient();


  const handleTimeChange = (event) => {
    let value = event.target.value;
    // If user enters only digits and the value is less than 60, treat it as minutes
    if (/^\d+$/.test(value) && parseInt(value) < 60) {
      value = `00:${value.padStart(2, '0')}`; // Add leading zero for minutes
    }

    // Handle the "HH:mm" format where hours are optional
    // if (/^([0-9]{1,2}):([0-5]?[0-9])$/.test(value) || value === '') {
      setTime(value);
    // }
  };

  const createItemMutation = useMutation({ 
    mutationFn: (obj: WorkoutTypes) => createItemFetchRequest(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      showNotification(ResultType.SUCCESS, 'Workout added successfully');
      setError(null)
      setTitle('')
      setDistance(0)
      setTime('00:00')
      setEmptyFields([])
    },
    onError: (error: BackendError) => {
        console.error(`Error from backend: ${error.error}`);
        console.error("Empty Fields:", error.emptyFields);
        setEmptyFields(error.emptyFields)
        setError(error.error)
        showNotification(ResultType.ERROR, 'Workout cannot be created');
    },
  })
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!user) {
      setError('You must log in')
      return
    }
    const obj: WorkoutTypes = {
      title: title,
      distance: distance,
      time: time,
      date: date,
    }
    createItemMutation.mutate(obj);
  }

  return (
    <form className="createForm" onSubmit={handleSubmit}> 
      <h3>Add new workout</h3>
      <div>
        <label>Training Title:</label>
        <input
          placeholder='Training title'
          type="text" 
          onChange={(e) => setTitle(e.target.value)} 
          value={title}
          className={emptyFields?.includes('title') ? 'error' : ''}
        />
      </div>
      <div>
        <label htmlFor='distance'>Distance (km):</label>
        <input
          name="distance"
          type="number" 
          onChange={(e) => setDistance(Number(e.target.value))} 
          value={distance}
          className={emptyFields?.includes('distance') ? 'error' : ''}
        />
      </div>
      <div>
        <label>Time (hh:mm):</label>
        <input 
          type="text" 
          onChange={handleTimeChange}
          value={time}
          className={emptyFields?.includes('time') ? 'error' : ''}
          placeholder='hh:mm or minutes'
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
        <div>
        <label>Date:</label>
        <DatePicker className="custom-datepicker"
          format="dd/MM/yyyy"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          slotProps={{
            textField: {
              size: 'small',
            },
            actionBar: {
              actions: ['clear'],
            },
          }}
        />
        </div>
      </LocalizationProvider>

      <button>Add Workout</button>
      {errorSet && <div className="error">{errorSet}</div>}
      <Notifications 
        isOpen={notification.isOpen}
        result={notification.result}
        message={notification.message}
        onClose={hideNotification}
      />
    </form>
  )
}
