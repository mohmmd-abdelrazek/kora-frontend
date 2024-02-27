import { useAuth, useLeague } from "../services/queries";

export const useIsOwner = () => {
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useAuth();

  const {
    data: leagueData,
    isLoading: leagueLoading,
    error: leagueError,
  } = useLeague();

  const isLoading = userLoading || leagueLoading;

  const error = userError || leagueError;

  const isOwner = userData?.user?.id === leagueData?.user_id;

  return { isOwner, isLoading, error };
};
