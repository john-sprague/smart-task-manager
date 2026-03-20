import React from 'react'; 
import type {Task} from '../types/Task';

interface Props{
    task: Task;
};

const TaskItem = ({task}: Props) => {
    return (
        <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
            <span className={task.completed ? "line-through" : ""}>
                {task.text}
            </span>
            </div>
=        </div>
    )
}

export default TaskItem