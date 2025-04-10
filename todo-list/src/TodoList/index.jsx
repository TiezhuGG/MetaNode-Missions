import { useState } from "react";
import { Input } from "./Input";
import { List } from "./List";
import { Filter } from "./Filter";
import { useEffect } from "react";

export const TodoList = () => {
  const [list, setList] = useState(() => {
    const data = localStorage.getItem("todo-list");
    return data ? JSON.parse(data) : [];
  });

  const [curFilter, setCurFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(list));
  }, [list]);

  const generateId = () => {
    return Date.now() + Math.random().toString().substring(2, 6);
  };

  const handleAddItem = (text) => {
    if (text !== "") {
      setList([
        ...list,
        {
          id: generateId(),
          text,
          isDone: false,
        },
      ]);
      return;
    }

    alert("Type Something You Need To do...");
  };

  const handleRemoveItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const handleCheckItem = (id) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleEditText = (id, text) => {
    setList(
      list.map((item) => (item.id === id ? { ...item, text: text } : item))
    );
  };

  const handleFilterStatus = (status) => {
    setCurFilter(status);
  };

  return (
    <>
      <div className="flex flex-col items-center m-10">
        <h1 className="text-center text-5xl font-bold">Todo List</h1>

        <Input handleAddItem={handleAddItem} />
        <Filter
          list={list}
          curFilter={curFilter}
          handleFilterStatus={handleFilterStatus}
        />
        <List
          list={list}
          curFilter={curFilter}
          handleRemoveItem={handleRemoveItem}
          handleCheckItem={handleCheckItem}
          handleEditText={handleEditText}
        />
      </div>
    </>
  );
};
