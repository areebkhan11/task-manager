import React from "react";
import Checklist from "./Checklist";

interface Task {
  id: string;
  title: string;
  checklist: string[];
  completedItems: string[];
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <Checklist task={task} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
