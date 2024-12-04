import { useRef } from "react";
import { patchDataFetch, WorkoutTypes } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const EditForm = ({workout, setEdit}) => {
  const titleRef = useRef(null);
  const loadRef = useRef(null);
  const repsRef = useRef(null);
  const queryClient = useQueryClient()
  
  const patchMutation = useMutation({
    // useMutation fn takes only one argument so here we have to pass it as an one object, with passed data inside
    mutationFn: ({ id, obj }: { id: string; obj: WorkoutTypes }) => patchDataFetch(id, obj), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    }
  })

const handleSubmit = async(event) => {
  event?.preventDefault();
  const obj: WorkoutTypes = {
    title: titleRef.current.value,
    load: loadRef.current.value,
    reps: repsRef.current.value,
  }
  patchMutation.mutate({ id: workout._id, obj });
  setEdit(false);
}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Excersize Title</label>
      <input type="text" name="title" placeholder="Title" defaultValue={workout.title} ref={titleRef} required/>
      <label htmlFor="content">Load</label>
      <input type="number" name="load" placeholder="Load" defaultValue={workout.load} ref={loadRef} required/>
      <label htmlFor="content">Reps</label>
      <input type="number" name="reps" placeholder="Reps" defaultValue={workout.reps} ref={repsRef} required/>

      <button type="submit">Submit</button>
    </form>
  )
}
