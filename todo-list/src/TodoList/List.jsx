import { TodoItem } from "./TodoItem";

export const List = ({ list, curFilter, ...props }) => {
  const filterList = list.filter((todo) => {
    if (curFilter === "Active") return !todo.isDone;
    if (curFilter === "Done") return todo.isDone;
    return true;
  });

  return (
    <div className="w-[700px] mt-5">
      {filterList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </div>
  );
};
