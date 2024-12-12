import {  useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendError, createItemFetchRequest, WorkoutTypes } from '../api/api';

export const Form = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState('')
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState('00:00')

  const [date, setDate] = useState<Date | string>(() =>{
    // Initialize with today's date in the correct format for input type="date"
    const today = new Date();
    return today.toISOString().split('T')[0]
  });
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
    if (/^([0-9]{1,2}):([0-5]?[0-9])$/.test(value) || value === '') {
      setTime(value);
    
    }
  };

  const createItemMutation = useMutation({ 
    mutationFn: (obj: WorkoutTypes) => createItemFetchRequest(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      setError(null)
      setTitle('')
      setDistance(0)
      setTime('00:00')
      setEmptyFields([])
    },
    onError: (error: BackendError) => {
        console.error(`Error from backend: ${error.error}`);
        console.error("Empty Fields:", error.emptyFields); // Log the missing fields
   
        setEmptyFields(error.emptyFields)
        setError(error.error)
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
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add new workout</h3>
      <label>Training Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''}
      />

      <label>Distance (km):</label>
      <input 
        type="number" 
        onChange={(e) => setDistance(Number(e.target.value))} 
        value={distance}
        className={emptyFields?.includes('distance') ? 'error' : ''}
      />

      <label>Time (hh:mm):</label>
      <input 
        type="text" 
        // onChange={(e) => setTime(parseInt(e.target.value))} 
        onChange={handleTimeChange}
        value={time}
        className={emptyFields?.includes('time') ? 'error' : ''}
        placeholder='hh:mm or minutes'
      />
      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={typeof date === 'string' ? date : date.toISOString().split('T')[0].split('-').reverse().join('-')}
        // value={typeof date === 'string' ? date : date.toISOString().split('T')[0].split('-').reverse().join('-')}
      />

      <button>Add Workout</button>
      {errorSet && <div className="error">{errorSet}</div>}
    </form>
  )
}
