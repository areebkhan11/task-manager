import React from "react";

interface Task {
  id: string;
  title: string;
  checklist: string[];
  completedItems: string[];
}

interface ChecklistProps {
  task: Task;
}

const Checklist: React.FC<ChecklistProps> = ({ task }) => {
  return (
    <ul>
      {task.checklist.map((item) => (
        <li key={item}>
          <input
            type="checkbox"
            checked={task.completedItems.includes(item)}
            readOnly
          />
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Checklist;
