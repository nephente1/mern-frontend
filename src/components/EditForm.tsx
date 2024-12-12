import { useRef } from "react";
import { patchDataFetch, WorkoutTypes } from "../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const EditForm = ({workout, setEdit}) => {
  const titleRef = useRef(null);
  const distanceRef = useRef(null);
  const timeRef = useRef(null);
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
    distance: distanceRef.current.value,
    time: timeRef.current.value,
  }
  patchMutation.mutate({ id: workout._id, obj });
  setEdit(false);
}

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Excersize Title</label>
      <input type="text" name="title" placeholder="Title" defaultValue={workout.title} ref={titleRef} required/>
      <label htmlFor="content">Distance (km)</label>
      <input type="number" name="distance" placeholder="distance" defaultValue={workout.distance} ref={distanceRef} required/>
      <label htmlFor="content">Time</label>
      <input type="number" name="time" placeholder="time" defaultValue={workout.time} ref={timeRef} required/>

      <button type="submit">Submit</button> <button onClick={() => setEdit(false)} type="button">Cancel</button>
    </form>
  )
}
