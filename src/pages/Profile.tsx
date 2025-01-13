import { useQueryClient } from "@tanstack/react-query";
import { StatisticsPanel } from "../components/StatisticsPanel.tsx/StatisticsPanel";
import { useAuthContext } from "../components/useAuthContext";

export const Profile = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const cachedWorkouts = queryClient.getQueryData(['workouts']);
  
  return (
    <div>
      <h2>My Profile</h2>
      <p>email/login: {user.email}</p>
      <StatisticsPanel workouts={cachedWorkouts} />
    </div>
  )
}
