"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { axiosInstance } from "../services/fetcher";
import { useIsOwner } from "../hooks/useIsOwner";
import LoadingIndicator from "./LoadingIndicator";

type playerNameProps = {
  teamId: string;
  playerIndex: string;
};

const PlayerInput = ({ teamId, playerIndex }: playerNameProps) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    data: player,
    isLoading,
    error,
  } = useSWR(`/player/${teamId}/${playerIndex}`);
  const { isOwner } = useIsOwner();

  useEffect(() => {
    if (player?.name && player?.position) {
      setPlayerName(player.name);
      setSelectedPosition(player.position);
      setIsDisabled(true);
    } else {
      setPlayerName("");
      setSelectedPosition("");
      setIsDisabled(false);
    }
  }, [player?.name, player?.position]);

  if (isLoading)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  if (error) return <div>Error fetching data</div>;

  const positions = ["حارس مرمى", "مدافع", "وسط", "مهاجم"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/player/submit", {
        teamId,
        playerIndex,
        name: playerName,
        position: selectedPosition, // Submit the selected position along with other data
      });

      if (response) {
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setIsDisabled(false); // Enable input for editing
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put(
        `/player/${teamId}/${playerIndex}`,
        {
          name: playerName,
          position: selectedPosition,
        },
      );
      setIsEditMode(false); // Exit edit mode
      setIsDisabled(true);
      // Handle successful edit
      console.log("Edit successful", response.data);
    } catch (error) {
      console.error("Error editing data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    // Confirm before deleting
    if (!confirm("Are you sure you want to delete this player?")) return;
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.delete(
        `/player/${teamId}/${playerIndex}`,
      );
      setPlayerName("");
      setIsDisabled(false)
      // Handle successful deletion
      console.log("Delete successful", response.data);
      // Optionally reset state or inform parent component to remove the player from the list
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={isEditMode ? handleSubmitEdit : handleSubmit}
      className="h-18 relative flex items-center justify-center gap-4"
    >
      <select
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        disabled={isDisabled || isSubmitting}
        className="text-md h-full rounded-lg p-2 font-bold text-text focus:outline-accent disabled:bg-green-100"
      >
        <option value="">اختر مركز</option>
        {positions.map((position, index) => (
          <option key={index} value={position}>
            {position}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        disabled={isDisabled || isSubmitting}
        placeholder="اكتب اسمك..."
        className="text-md h-full flex-1 rounded-lg p-2 font-bold text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <button
        type="submit"
        disabled={isDisabled || isEditMode || !selectedPosition || !playerName}
        className={`w-30 text-md absolute left-1 items-center rounded-lg px-2 py-1 font-medium ${
          isSubmitting
            ? "bg-slate-500 text-white"
            : "bg-slate-800 text-white hover:bg-gradient-to-br"
        } disabled:hidden`}
      >
        {isSubmitting ? ".....جاري التسجيل" : "سجل"}
      </button>

      {isOwner && isDisabled && (
        <div className="absolute left-0 flex gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="w-30 text-md items-center rounded-lg bg-slate-800 px-2 py-1 font-medium text-white hover:bg-gradient-to-br"
          >
            تعديل
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-30 text-md items-center rounded-lg bg-slate-800 px-2 py-1 font-medium text-white hover:bg-gradient-to-br"
          >
            حذف
          </button>
        </div>
      )}
      {isEditMode && (
        <div className="absolute left-0 flex gap-2">
          <button
            type="submit"
            className="w-30 text-md items-center rounded-lg bg-slate-800 px-2 py-1 font-medium text-white hover:bg-gradient-to-br"
          >
            تم
          </button>
          <button
            type="button" // Make sure this is of type "button" to prevent form submission
            onClick={() => {
              setIsEditMode(false); // Exit edit mode
              setIsDisabled(true); // Disable input
              // Optionally reset the player name and position to their original values
              setPlayerName(player?.name || "");
              setSelectedPosition(player?.position || "");
            }}
            className="w-30 text-md items-center rounded-lg bg-red-500 px-2 py-1 font-medium text-white hover:bg-red-700" // Adjust the positioning as needed
          >
            إلغاء
          </button>
        </div>
      )}
    </form>
  );
};

export default PlayerInput;
