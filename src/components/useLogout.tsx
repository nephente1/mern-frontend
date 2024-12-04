import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')
    // clear cache data from useQuery
    queryClient.clear();

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }
  return { logout }
}
