import InputField from "./PlayerInput";

type SectionPropes = {
  teamId: string;
  selectedTeam: string;
  teamName: string;
};

const Section = ({ teamId, selectedTeam, teamName }: SectionPropes) => {
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
        <InputField teamId={teamId} playerIndex="0" />
        <InputField teamId={teamId} playerIndex="1" />
        <InputField teamId={teamId} playerIndex="2" />
        <InputField teamId={teamId} playerIndex="3" />
        <InputField teamId={teamId} playerIndex="4" />
      </div>
    </div>
  );
};

export default Section;
