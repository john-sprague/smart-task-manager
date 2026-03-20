import React from "react";

const TaskInput = () => {
    return (
        <form className="flex gap-2">
            <input className='flex-1 p-2 border rounded'/>
            <button className="px-4 py-2 bg-black text-white rounded" >
                Add
            </button>
        </form>
    );
}

export default TaskInput