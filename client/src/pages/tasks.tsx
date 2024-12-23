import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchTasks } from "../redux/slices/taskSlice";

const TasksComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskStatus = useSelector((state: RootState) => state.tasks.status);
  const taskError = useSelector((state: RootState) => state.tasks.error);

  useEffect(() => {
    const userId = "someUserId"; // Replace with actual user ID
    dispatch(fetchTasks(userId));
  }, [dispatch]);

  if (taskStatus === "loading") {
    return <div>Loading tasks...</div>;
  }

  if (taskStatus === "failed") {
    return <div>Error: {taskError}</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksComponent;
