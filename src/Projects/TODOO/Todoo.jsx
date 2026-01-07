import { useState, useEffect } from "react";
import { MdCheckCircle, MdDeleteForever } from "react-icons/md";

const todokey = "ReactTodo"
export const Todoo = () => {
  const [inputval, setInputval] = useState({ content: "", isdone: false });
  const [datetime, setDatetime] = useState("");
 
  const [task, setTask] = useState(()=>{
      const rawData = localStorage.getItem(todokey) // adding condition to save the data in localstorage
      if(!rawData) return []

      return JSON.parse(rawData)
  });

  //  Live Date & Time code
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const time = now.toLocaleTimeString();
      const date = now.toLocaleDateString();
      setDatetime(`${time} - ${date}`);
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  //  Handle input change
  function handelChange(e) {
    setInputval({ ...inputval, content: e.target.value });
  }

  //  Add Task
  function handelSubmit(e) {
    e.preventDefault();

    const { content } = inputval;
    if (!content.trim()) return; // avoid empty tasks

    // !Check if already exists
    const matchedval = task.find(
      (currtask) => currtask.content.toLowerCase() === content.toLowerCase()
    );
    if (matchedval) return;

    const newTask = {
      id: Date.now(),
      content,
      isdone: false,
    };

    setTask((prevData) => [...prevData, newTask]);
    setInputval({ content: "", isdone: false }); // clear input
  }

  //! ✅ Toggle Done / Undo
  function taskDone(currtask) {
    const updatedTasks = task.map((t) =>
      t.id === currtask.id ? { ...t, isdone: !t.isdone } : t
    );
    setTask(updatedTasks);
    confirm("Your Task Completed ?")
  }

  //! ❌ Delete a Task
  function deleteClick(content) {
    const updatedTasks = task.filter((t) => t.content !== content);
    setTask(updatedTasks);
  }

  // Adding data into Localstroage
  localStorage.setItem("ReactTodo",JSON.stringify(task))

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col items-center p-5 shadow transition duration-700">
      <div className="text-white text-center">
        <h1 className="text-4xl font-serif mb-2">Todo List</h1>
        <p className="text-lg font-sans mb-4">{datetime}</p>
      </div>

      {/* Input & Add Button */}
      <form
        onSubmit={handelSubmit}
        className="flex justify-center items-center mb-4"
      >
        <input
          onChange={handelChange}
          value={inputval.content}
          type="text"
          placeholder="Enter a task..."
          className=" max-sm:p-1  p-2 outline-red-500  bg-white text-black focus:bg-green-200 outline-none rounded-l-full  w-64"
        />
        <button
          type="submit"
          className= " max-sm:text-[10px]  p-2 bg-red-500 rounded-r-full"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="w-[80%] max-w-md">
        {task.map((currtask) => (
          <li
            key={currtask.id}
            className="bg-white text-black mt-3 p-2 rounded-lg flex justify-between items-center shadow-sm"
          >
            <span
              className={`text-lg font-sans transition-all duration-200 ${
                currtask.isdone ? "line-through text-gray-500" : ""
              }`}
            >
              {currtask.content}
            </span>

            <div className="flex gap-3 items-center">
              <button
                className={`text-2xl ${
                  currtask.isdone
                    ? "text-green-700 hover:text-green-900"
                    : "text-green-500 hover:text-green-600"
                }`}
                onClick={() => taskDone(currtask)}
                title={currtask.isdone ? "Mark as Undone" : "Mark as Done"}
              >
                <MdCheckCircle />
              </button>

              <button
                className="text-2xl text-red-500 hover:text-red-700"
                onClick={() => deleteClick(currtask.content)}
                title="Delete Task"
              >
                <MdDeleteForever />
              </button>
            </div>
          </li>
        ))}

        {/* Clear All Button */}
        {task.length > 0 && (
          <li className="mt-6 flex justify-center">
            <button
              onClick={() =>` ${setTask([])} ${confirm("Are you sure! Delete All Task ?")}`}
              className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md"
            >
              Clear All
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
