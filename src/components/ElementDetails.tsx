import { memo, useState } from "react";
import { EditForm } from "./EditForm";
import { formatedDate } from "../utils";


export const ElementDetails = memo(({ workout, onDelete }: any) => {
  const [isEdited, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!isEdited);
  }

  const date = workout.date ? formatedDate(workout.date) : formatedDate(workout.createdAt);

  const handleDelete = () => {
    onDelete(workout._id);
  };

  return (
    <div className="details-box">
      <h4>{workout.title}</h4>
      {isEdited ? 
        <EditForm workout={workout} setEdit={setEdit} /> :
        (
          <>
            <p><b>Distance: </b>{workout.distance} km</p>
            <p><b>Time: </b>{workout.time}</p>
            {/* <p>{formatedDate(workout.date) ?? formatedDate(workout.createdAt)}</p> */}
            <p><b>Date: </b>{date}</p>
          </>
        )
      }
      <span className="material-symbols-outlined" translate="no" aria-hidden="true" onClick={handleEdit}>edit_square</span>
      <span className="material-symbols-outlined" translate="no" aria-hidden="true" onClick={handleDelete}>delete</span>
    </div>
  )
})
