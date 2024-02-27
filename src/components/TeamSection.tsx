import useSWR from "swr";
import InputField from "./PlayerInput";
import { useParams } from "next/navigation";

type TeamSectionPropes = {
  teamId: string;
  teamName: string;
  selectedTeam: string;
};

const TeamSection = ({
  teamId,
  teamName,
  selectedTeam,
}: TeamSectionPropes) => {
  const { leagueId } = useParams();
  const { data: league, isLoading, error } = useSWR(`/league/${leagueId}`);

  if (error)
    return <div>{error.response.data.message || "Failed to load player."}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl shadow-md shadow-blue-400 md:max-w-[400px] ${
        selectedTeam !== teamId && "hidden"
      }`}
    >
      <p className="border-b-2 bg-green-300 p-2 text-xl font-extrabold text-green-900">
        {teamName}
      </p>
      <div className="flex flex-col justify-between gap-6 bg-green-400 px-6 py-8">
        {[...Array(league.players_per_team)].map((_, index) => (
          <InputField
            key={index}
            teamId={teamId}
            playerIndex={String(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
