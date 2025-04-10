export const Filter = ({ curFilter, handleFilterStatus }) => {
  const status = ["All", "Active", "Done"];

  return (
    <div className="flex justify-between items-center w-[700px] mt-5">
      {/* <div className="flex">
        <button
          className={`px-5 py-2 rounded-full ${
            list.length
              ? "cursor-pointer bg-cyan-500 text-white"
              : "cursor-not-allowed bg-gray-300 text-gray-400"
          }`}
          onClick={() => handleFilterStatus("choose-all")}
          disabled={!list.length}
        >
          {isAllDone ? "Inverse All" : "Choose All"}
        </button>
        {isAllDone && list.length ? (
          <button
            className="cursor-pointer bg-red-500 text-white px-5 py-2 rounded-full ml-2"
            onClick={() => handleFilterStatus("remove")}
          >
            Remove
          </button>
        ) : null}
      </div> */}

      <div className="flex">
        {status.map((item) => (
          <button
            className={`w-[80px] cursor-pointer ${
              item === curFilter
                ? "bg-cyan-500 text-white px-5 py-2 rounded-full"
                : ""
            }`}
            key={item}
            onClick={() => handleFilterStatus(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
