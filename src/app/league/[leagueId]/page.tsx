"use client";
import { use, useEffect, useState } from "react";
import Tab from "@/src/components/Tab";
import Image from "next/image";
import ball from "@/public/icons/football.png";
import Pagination from "@/src/components/Pagination";
import HomeButton from "@/src/components/HomeButton";
import AdminButton from "@/src/components/AdminButton";
import { Team } from "@/src/types/team";
import TeamSection from "@/src/components/TeamSection";
import LoadingIndicator from "@/src/components/LoadingIndicator";
import ShareButton from "@/src/components/ShareButton";
import { useIsOwner } from "@/src/hooks/useIsOwner";
import { useLeague, useTeams } from "@/src/services/queries";

const League = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const { data: teams, isLoading, error } = useTeams();
  const {
    data: league,
    isLoading: leagueLoading,
    error: leagueError,
  } = useLeague();
  const { isOwner, isLoading: ownerLoading, error: ownerError } = useIsOwner();

  useEffect(() => {
    if (teams && teams.length > 0 && !selectedTeam) {
      setSelectedTeam(teams[0].team_id);
    }
  }, [teams, selectedTeam]);

  if (error || ownerError || leagueError)
    return <div>{error?.response?.data.message || "Failed to load teams."}</div>;
  if (isLoading || ownerLoading || leagueLoading)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col items-center gap-20 bg-slate-700 shadow-md max-sm:hidden">
        <div className="flex items-center gap-6">
          <h2 className="my-5 flex items-center gap-2 text-white">
            <Image src={ball} alt="ball" height={30}></Image>
            {league?.name}
          </h2>
          {isOwner && (
            <div className="p-4">
              <ShareButton />
            </div>
          )}
        </div>
        <ul className="flex w-full flex-col items-center justify-center gap-6 rounded-xl px-4 py-3 text-sm font-medium text-text dark:text-gray-400">
          {teams.map((team: Team) => (
            <Tab
              key={team.team_id}
              teamId={team.team_id}
              selectedTeam={selectedTeam}
              handleClick={() => setSelectedTeam(team.team_id)}
              teamName={team.name}
            />
          ))}
          ;
        </ul>
      </div>
      <div className="flex h-full w-4/6 flex-col gap-6 bg-slate-100 max-sm:w-full max-sm:gap-2">
        <div className="px-16 pt-5 text-right max-sm:hidden max-sm:py-10 sm:px-[5%] md:px-[8%] lg:pr-[30%]">
          <h2 className="mb-5 text-right text-slate-700">انضم إلى فريق الآن</h2>
          <p className="font-bold text-slate-500">
            اذا كانت جميع الفرق ممتلئة فلا يمكنك الاشتراك <br />
            يمكنك المحاولة في مرة قادمة
          </p>
        </div>
        <div className="flex gap-6 overflow-x-scroll p-2 px-4 max-sm:py-4 sm:hidden sm:px-[5%] md:px-[8%] lg:pr-[30%]">
          {teams.map((team: Team) => (
            <Pagination
              key={team.team_id}
              teamId={team.team_id}
              selectedTeam={selectedTeam}
              handleClick={() => setSelectedTeam(team.team_id)}
              teamName={team.name}
            />
          ))}
        </div>
        <div className="px-4 max-sm:py-4 sm:px-[5%] md:px-[8%] lg:pr-[30%]">
          {teams.map((team: Team) => (
            <TeamSection
              key={team.team_id}
              teamId={team.team_id}
              selectedTeam={selectedTeam}
              teamName={team.name}
            />
          ))}
        </div>

        <div className="flex w-full items-center justify-center gap-6 bg-white p-8 max-sm:p-4">
          <HomeButton />
          <AdminButton />
        </div>
      </div>
    </div>
  );
};

export default League;
