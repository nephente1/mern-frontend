import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDataFetch } from "../api/api";
import { formatedDate, formatMinutes } from "../utils";
import { EditForm } from "./EditForm";

export const ElementDetails = ({ workout }: any) => {
  const queryClient = useQueryClient()
  const [isEdited, setEdit] = useState(false);

  const deleteMutation = useMutation({ 
    mutationFn: () => deleteDataFetch(workout._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts'] })
    }
  })

  const handleDelete = () => {
    deleteMutation.mutate()
  }

  const handleEdit = () => {
    setEdit(!isEdited);
  }

  const date = workout.date ? formatedDate(workout.date) : formatedDate(workout.createdAt);

  return (
    <div className="details-box">
      <h4>{workout.title}</h4>
      {isEdited ? 
        <EditForm workout={workout} setEdit={setEdit} /> :
        (
          <>
            <p><b>Distance: </b>{workout.distance} km</p>
            <p><b>Time: </b>{formatMinutes(workout.time)}</p>
            {/* <p>{formatedDate(workout.date) ?? formatedDate(workout.createdAt)}</p> */}
            <p>{date}</p>
          </>
        )
      }
      <span className="material-symbols-outlined" onClick={handleEdit}>edit_square</span>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  )
}