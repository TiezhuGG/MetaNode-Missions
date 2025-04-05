import { useState } from "react";
import { Input } from "./Input";
import { List } from "./List";
import { Filter } from "./Filter";

const originList = [
  {
    id: 1,
    text: "吃饭",
    isDone: false,
  },
  {
    id: 2,
    text: "睡觉",
    isDone: false,
  },
  {
    id: 3,
    text: "打豆豆",
    isDone: false,
  },
];

export const TodoList = () => {
  const [list, setList] = useState(originList);
  const [curFilter, setCurFilter] = useState("All");
  const [isAllDone, setIsAllDone] = useState(false);

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
    if (status === "choose-all") {
      setList(
        list.map((item) => {
          return {
            ...item,
            isDone: isAllDone ? false : true,
          };
        })
      );
      setIsAllDone(list.every((item) => !item.isDone));
      setCurFilter("All");
      return;
    } else if (status === "remove-all") {
      setList([]);
      setIsAllDone(false);
      setCurFilter("All");
      return;
    }
    setCurFilter(status);
  };

  return (
    <>
      <div className="flex flex-col items-center m-10">
        <h1 className="text-center text-5xl font-bold">Todo List</h1>

        <Input handleAddItem={handleAddItem} />
        <Filter
          list={list}
          isAllDone={isAllDone}
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
