import { useState } from "react";

export const TodoItem = ({
  todo,
  handleRemoveItem,
  handleCheckItem,
  handleEditText,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const handleSave = (id) => {
    if (editText !== "") {
      handleEditText(id, editText);
      setIsEdit(false);
      return;
    }

    alert("Type Something You Need To do...");
  };

  const handleEdit = (text) => {
    setIsEdit(true);
    setEditText(text);
  };

  return (
    <div className="group hover:bg-gray-50 flex justify-between p-4 border-b-1 border-b-gray-200 bg-white">
      <div className="flex">
        <input
          className="w-[24px] h-[24px] accent-cyan-500"
          type="checkbox"
          checked={todo.isDone}
          onChange={() => handleCheckItem(todo.id)}
        />

        {isEdit ? (
          <div>
            <input
              className="ml-4 focus:outline-none shadow-md"
              type="text"
              autoFocus
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
              }}
            />
            <button
              className="cursor-pointer bg-cyan-500 text-white px-3 py-1 rounded-full ml-2"
              onClick={() => handleSave(todo.id)}
            >
              Save
            </button>
            <button
              className="cursor-pointer bg-gray-300 text-white px-3 py-1 rounded-full ml-2"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p
            className={`ml-4 ${
              todo.isDone ? "line-through text-gray-300" : "cursor-pointer"
            }`}
          >
            {todo.text}
          </p>
        )}
      </div>

      <div className="hidden group-hover:block">
        <button
          className="cursor-pointer mr-5"
          onClick={() => handleEdit(todo.text)}
        >
          ✏️
        </button>
        <button
          className="cursor-pointer"
          onClick={() => handleRemoveItem(todo.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};
