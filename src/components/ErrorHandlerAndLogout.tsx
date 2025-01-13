import { useLogout } from "./useLogout";

export const ErrorHandlerAndLogout = ({error}) => {
  const { logout } = useLogout();
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={logout}>Please login again</button>
    </div>
  )
}
