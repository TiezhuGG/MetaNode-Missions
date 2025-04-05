import { useState } from "react";

export const Input = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    handleAddItem(inputValue);
    setInputValue("");
  };

  return (
    <>
      <input
        type="text"
        className="focus:outline-none shadow-md mt-5 py-4 px-10 w-[700px] bg-white text-xl rounded-full"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleAdd();
          }
        }}
      />

      <button
        className="cursor-pointer bg-cyan-500 text-white rounded-full w-[700px] h-[40px] mt-5"
        onClick={() => {
          handleAdd();
        }}
      >
        Add
      </button>
    </>
  );
};
