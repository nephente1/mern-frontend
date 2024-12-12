import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendError, createItemFetchRequest, WorkoutTypes } from '../api/api';

export const Form = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState('')
  const [distance, setDistance] = useState(0)
  const [time, setTime] = useState(0)
  const [date, setDate] = useState<Date | string>(() => {
      // Ustawiamy dzisiejszą datę w formacie 'YYYY-MM-DD'
      const today = new Date();
      return today.toISOString().split('T')[0];
    }
  )
  const [errorSet, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const queryClient = useQueryClient();

  const createItemMutation = useMutation({ 
    mutationFn: (obj: WorkoutTypes) => createItemFetchRequest(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
      setError(null)
      setTitle('')
      setDistance(0)
      setTime(0)
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

      <label>Time (mins):</label>
      <input 
        type="number" 
        onChange={(e) => setTime(parseInt(e.target.value))} 
        value={time}
        className={emptyFields?.includes('time') ? 'error' : ''}
      />
      <label>Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.valueAsDate)} 
        value={typeof date === 'string' ? date : date.toISOString().split('T')[0]}
      />

      <button>Add Workout</button>
      {errorSet && <div className="error">{errorSet}</div>}
    </form>
  )
}
