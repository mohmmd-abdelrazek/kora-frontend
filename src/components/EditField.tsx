"use client";
import { useEffect, useState } from "react";

type EditFieldPropes = {
  sectionId: string;
  inputIndex: string;
};

const EditField = ({ sectionId, inputIndex }: EditFieldPropes) => {
  const [inputValue, setInputValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  let role = "";
  switch (inputIndex) {
    case "0":
      role = "حارس مرمى";
      break;
    case "1":
      role = "مدافع";
      break;
    case "2":
      role = "وسط";
      break;
    case "3":
      role = "مهاجم";
      break;
    case "4":
      role = "مهاجم";
      break;

    default:
      "";
      break;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://kora-api-053t.onrender.com/retrieve/${sectionId}`,
        );
        const data = await response.json();

        if (data.data) {
          setInputValue(data.data[inputIndex]);
          if (data.data[inputIndex] !== "") {
            setIsDisabled(true);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [sectionId, inputIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputValue;

    try {
      const response = await fetch(
        "https://kora-api-053t.onrender.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sectionId, inputIndex, value }),
        },
      );

      const responseData = await response.json();
      if (responseData.success && value !== "") {
        setIsDisabled(true);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  function handleEdit() {
    setIsDisabled(false);
  }

  async function handleDelete() {
    const value = "";

    try {
      const response = await fetch(
        "https://kora-api-053t.onrender.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sectionId, inputIndex, value }),
        },
      );

      const responseData = await response.json();
      if (responseData.success) {
        setIsDisabled(false);
        setInputValue("");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="h-18 relative flex items-center justify-center gap-4"
    >
      <label
        className={`max-sm:text-sm h-full w-20 text-right text-md font-semibold text-white ${
          isDisabled && "text-gray-400"
        }`}
      >
        {role}
      </label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isDisabled}
        placeholder="اكتب اسمك..."
        className="text-md h-full min-w-0 flex-1 rounded-lg p-2 font-bold text-text focus:outline-accent disabled:bg-yellow-100"
      />
      <button
        type="submit"
        disabled={isDisabled}
        className="w-30 absolute left-1 items-center rounded-lg bg-slate-800 px-2 py-1 text-md font-medium text-white hover:bg-gradient-to-br disabled:hidden"
      >
        سجل
      </button>

      <button
        type="button"
        disabled={!isDisabled}
        onClick={handleEdit}
        className="w-30 absolute left-16 items-center rounded-lg bg-slate-800 px-2 py-1 text-md font-medium text-white hover:bg-gradient-to-br disabled:hidden"
      >
        تعديل
      </button>
      <button
        type="button"
        disabled={!isDisabled}
        onClick={handleDelete}
        className="w-30 absolute left-1 items-center rounded-lg bg-slate-800 px-2 py-1 text-md font-medium text-white hover:bg-gradient-to-br disabled:hidden"
      >
        حذف
      </button>
    </form>
  );
};

export default EditField;
