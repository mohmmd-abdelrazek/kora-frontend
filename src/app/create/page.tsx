"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/src/services/fetcher";
import EditTeamsModal from "@/src/components/TeamsNamesModal";
import withAuth from "@/src/utils/withAuth";

interface LeagueFormData {
  leagueName: string;
  numberOfTeams: number;
  playersPerTeam: number;
  date: string; // To capture only the date
  startTime: string; // To capture only the time
  matchDuration: number; // Duration in minutes
  breakDuration: number;
  totalPlayTime: number; // Total available play time in minutes
  numberOfPlaygrounds: number; // Number of available playgrounds
  teamNames: string[]; // Team names
}

const CreateLeaguePage: React.FC = () => {
  const [formData, setFormData] = useState<LeagueFormData>({
    leagueName: "",
    numberOfTeams: 0,
    playersPerTeam: 0,
    date: "",
    startTime: "",
    matchDuration: 0,
    breakDuration: 0,
    totalPlayTime: 1,
    numberOfPlaygrounds: 1,
    teamNames: [], // Initialize as empty array
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekday, setWeekday] = useState("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedValue: any = value;
    if (
      name === "numberOfTeams" ||
      name === "playersPerTeam" ||
      name === "matchDuration"
    ) {
      updatedValue = parseInt(value);
      if (name === "numberOfTeams") {
        // Update team names state when number of teams changes
        const newTeamNames = Array(updatedValue)
          .fill(null)
          .map((_, index) => formData.teamNames[index] || `فريق ${index + 1}`);
        setFormData((prev) => ({ ...prev, teamNames: newTeamNames }));
      }
    } else if (name === "date") {
      // Calculate the weekday
      const date = new Date(value);
      const days = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت",
      ];
      setWeekday(days[date.getDay()]);
    }
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      ...formData,
      teamNames: formData.teamNames.filter((name) => name.trim() !== ""), // Filter out empty team names
    };
    try {
      const response = await axiosInstance.post("/league", payload); // Adjust API endpoint as needed
      router.push(`/league/${response.data.league.id}`);
    } catch (error) {
      console.error("Failed to create league:", error);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="leagueName"
            className="block text-sm font-medium text-gray-700"
          >
            اسم الدوري
          </label>
          <input
            type="text"
            name="leagueName"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="numberOfTeams"
            className="block text-sm font-medium text-gray-700"
          >
            عدد الفرق
          </label>
          <input
            type="number"
            name="numberOfTeams"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
          <>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-4 rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600"
            >
              عدل أسماء الفرق
            </button>
            <EditTeamsModal
              isOpen={isModalOpen}
              numberOfTeams={formData.numberOfTeams}
              initialTeamNames={formData.teamNames}
              onSave={(teamNames) => {
                setFormData((prev) => ({ ...prev, teamNames }));
                setIsModalOpen(false);
              }}
              onClose={() => setIsModalOpen(false)}
            />
          </>
        </div>
        <div>
          <label
            htmlFor="playersPerTeam"
            className="block text-sm font-medium text-gray-700"
          >
            عدد اللاعبين في الفريق
          </label>
          <input
            type="number"
            name="playersPerTeam"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            تاريخ البداية
          </label>
          <input
            type="date"
            name="date"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
          <span>{weekday}</span> {/* Display the calculated weekday here */}
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            وقت البداية
          </label>
          <input
            type="time"
            name="startTime"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="matchDuration"
            className="block text-sm font-medium text-gray-700"
          >
            مدة المباراة (بالدقائق)
          </label>
          <input
            type="number"
            name="matchDuration"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="breakDuration"
            className="block text-sm font-medium text-gray-700"
          >
            Break Duration (minutes)
          </label>
          <input
            type="number"
            id="breakDuration"
            name="breakDuration"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            value={formData.breakDuration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="totalPlayTime"
            className="block text-sm font-medium text-gray-700"
          >
            الوقت الكلي للعب (بالدقائق)
          </label>
          <input
            type="number"
            name="totalPlayTime"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="numberOfPlaygrounds"
            className="block text-sm font-medium text-gray-700"
          >
            عدد الملاعب المتاحة
          </label>
          <input
            type="number"
            name="numberOfPlaygrounds"
            required
            min="1"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            تسجيل
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuth(CreateLeaguePage);
