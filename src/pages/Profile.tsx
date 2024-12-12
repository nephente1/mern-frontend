import { useAuthContext } from "../components/useAuthContext";

export const Profile = () => {
  const { user } = useAuthContext();
  
  return (
    <div>
      <p>email/login: {user.email}</p>
    </div>
  )
}
