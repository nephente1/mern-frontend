import { sumTimes } from "../../utils";

export const StatisticsPanel = ({workouts}) => {
	const durations = workouts ? sumTimes(workouts?.map(el => el.time)) : 0;
  const sumDistance = workouts ? workouts?.reduce((acc, el) => acc + el.distance, 0) : 0;
  return (  
    <div>
      <div className="flex">
        <div className="stats"><h4>Total time: </h4> <span> {durations} h</span></div>
        <div className="stats"><h4>Total distance:</h4> <span>{sumDistance} km</span></div>
      </div>
    </div>
  )
}