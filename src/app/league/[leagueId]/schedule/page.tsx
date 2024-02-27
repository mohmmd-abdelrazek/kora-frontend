"use client";

import { useSchedule } from "@/src/services/queries";
import LeagueButton from "@/src/components/LeagueButton";

const SchedulePage = () => {
  const { data: schedule, isLoading, error } = useSchedule(); // Update the URL to your API endpoint
  
  console.log(schedule)
  // const schedule = scheduleData?.schedule;
  if (isLoading) return <div className="py-10 text-center">Loading...</div>;
  if (error)
  return <div>{error.response?.data.message || "Failed to load teams."}</div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold">League Schedule</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Round
              </th>
              <th scope="col" className="px-6 py-3">
                Home Team
              </th>
              <th scope="col" className="px-6 py-3">
                Away Team
              </th>
              <th scope="col" className="px-6 py-3">
                Playground
              </th>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3">
                End Time
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {schedule?.map((match: any, index: any) => (
              <tr
                key={index}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td className="px-6 py-4">{match.round}</td>
                <td className="px-6 py-4">{match.homeTeam}</td>
                <td className="px-6 py-4">{match.awayTeam}</td>
                <td className="px-6 py-4">{match.playground}</td>
                <td className="px-6 py-4">{match.startTime}</td>
                <td className="px-6 py-4">{match.endTime}</td>
                <td className="px-6 py-4">{match.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LeagueButton />
    </div>
  );
};

export default SchedulePage;
