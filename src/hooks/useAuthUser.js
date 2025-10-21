import { useAuth } from "../providers/AuthProvider";
export function useAuthUser() {
  const { user } = useAuth();
  return user;
}
