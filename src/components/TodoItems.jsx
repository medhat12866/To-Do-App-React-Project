import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";
function TodoItems({ text, isComplete, id, deleteTodo, toggle }) {
  return (
    <div className="flex items-center gap-2 my-4 select-none">
      <div
        onClick={() => toggle(id)}
        className="flex items-center  flex-1 cursor-pointer  "
      >
        <img
          className="w-7"
          src={isComplete ? tick : not_tick}
          alt="ticked icon"
        />
        <h3
          className={`text-slate-700 ml-4 text-[17px] capitalize
            ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </h3>
      </div>
      <img
        className="w-3.5 cursor-pointer"
        src={delete_icon}
        alt="delete icon"
        onClick={() => deleteTodo(id)}
      />
    </div>
  );
}

export default TodoItems;
