import InputField from "./InputField";

type SectionPropes = {
  sectionId: string;
  team: string;
};

const Section = ({ sectionId, team }: SectionPropes) => {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl shadow-md shadow-blue-400 md:max-w-[500px] ${
        team !== sectionId && "hidden"
      }`}
    >
      <p className="border-b-2 bg-green-300 p-2 text-xl font-extrabold text-green-900">
        فريق {team}
      </p>
      <div className="flex flex-col justify-between gap-6 bg-green-400 px-6 py-8">
        <InputField sectionId={sectionId} inputIndex="0" />
        <InputField sectionId={sectionId} inputIndex="1" />
        <InputField sectionId={sectionId} inputIndex="2" />
        <InputField sectionId={sectionId} inputIndex="3" />
        <InputField sectionId={sectionId} inputIndex="4" />
      </div>
    </div>
  );
};

export default Section;
