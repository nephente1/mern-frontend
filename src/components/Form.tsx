import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BackendError, createItemFetchRequest, WorkoutTypes } from '../api/api';

export const Form = () => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState(0)
  const [reps, setReps] = useState(0)
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
      setLoad(0)
      setReps(0)
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
      load: load,
      reps: reps,
      date: date,
    }
    createItemMutation.mutate(obj);
  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields?.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(Number(e.target.value))} 
        value={load}
        className={emptyFields?.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(parseInt(e.target.value))} 
        value={reps}
        className={emptyFields?.includes('reps') ? 'error' : ''}
      />
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
