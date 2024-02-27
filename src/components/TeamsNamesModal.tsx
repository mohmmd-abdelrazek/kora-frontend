'use client'
import { useState, useEffect } from 'react';

interface EditTeamsModalProps {
  isOpen: boolean;
  numberOfTeams: number;
  initialTeamNames: string[];
  onSave: (teamNames: string[]) => void;
  onClose: () => void;
}

const EditTeamsModal: React.FC<EditTeamsModalProps> = ({ isOpen, numberOfTeams, initialTeamNames, onSave, onClose }) => {
  const [teamNames, setTeamNames] = useState<string[]>([]);

  useEffect(() => {
    // Initialize team names with default values or existing ones
    const names = Array(numberOfTeams).fill(null).map((_, index) => initialTeamNames[index] || `فريق ${index + 1}`);
    setTeamNames(names);
  }, [numberOfTeams, initialTeamNames]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 max-h-screen overflow-scroll">
        <h2 className="text-lg">عدل أسماء الفرق</h2>
        {teamNames.map((name, index) => (
          <input
            key={index}
            type="text"
            value={name}
            onChange={(e) => {
              const newTeamNames = [...teamNames];
              newTeamNames[index] = e.target.value;
              setTeamNames(newTeamNames);
            }}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mb-2"
          />
        ))}
        <div className="flex justify-end gap-2">
          <button onClick={() => onSave(teamNames)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            تم
          </button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            الغاء
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditTeamsModal;