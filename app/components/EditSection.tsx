import EditField from "./EditField";

type EditSectionPropes = {
  sectionId: string;
  team: string;
};

const EditSection = ({ sectionId, team }: EditSectionPropes) => {
  return (
    <div
      className="overflow-hidden rounded-2xl shadow-md shadow-blue-400"
    >
      <p className="border-b-2 bg-green-300 p-2 text-xl font-extrabold text-green-900">
        فريق {team}
      </p>
      <div className="flex flex-col justify-between gap-6 bg-green-400 px-6 py-8">
        <EditField sectionId={sectionId} inputIndex="0" />
        <EditField sectionId={sectionId} inputIndex="1" />
        <EditField sectionId={sectionId} inputIndex="2" />
        <EditField sectionId={sectionId} inputIndex="3" />
        <EditField sectionId={sectionId} inputIndex="4" />
      </div>
    </div>
  );
};

export default EditSection;
