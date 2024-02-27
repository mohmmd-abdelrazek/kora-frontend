import useSWR from "swr";
import { Page } from "../types/page";
import { Match } from "../types/match";
import { useParams } from "next/navigation";

export function useAuth() {
  return useSWR("/auth/status");
}

export function useLeagues() {
  return useSWR<Page[]>("/leagues");
}

export function useLeague() {
  const { leagueId } = useParams();
  return useSWR<Page>(leagueId ? `/league/${leagueId}` : null);
}

export function useTeams() {
  const { leagueId } = useParams();
  return useSWR(leagueId ? `/teams/${leagueId}` : null);
}

export function useSchedule() {
  const { leagueId } = useParams();
  console.log(leagueId)
  return useSWR(leagueId ? `/league/${leagueId}/schedule` : null);

}
