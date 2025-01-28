"use client";
import { useState } from "react";
import { Delete } from "lucide-react";
import DeleteButton from './delete';
import useHoverHook from "../hooks/useHoverHook";

function DeleteIcon({onDelete, notebookId}) {
    const [askConfirm, setAskConfirm] = useState(false)
    const { hover, onHover, onLeave } = useHoverHook()

    function showConfirm() {
        setAskConfirm(true);
    }
    function hideConfirm() {
        setAskConfirm(false);
    };

    return (
        <>
            <button onClick={showConfirm} 
                    className="relative p-2" 
                    aria-label='Delete-button' 
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}>
                <Delete size={14}/>
                {hover ?<div className='bg-gray-600 text-xs absolute bottom-7 right-1 p-2 rounded-md'>Delete</div>: null }
            </button>
    
            <div className={askConfirm ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" : "hidden"}>
                <div className="bg-white p-6 rounded-lg w-[400px] h-[300px] flex flex-col items-center justify-center">
                    <h2 className="text-lg text-black font-bold mb-4">Are you sure you want to DELETE? You can not undo this action</h2>
                    <div className="flex flex-row gap-5">
                        <button onClick={hideConfirm} className="bg-blue-500 w-[100px] text-white px-4 py-2 rounded-md mb-4">No</button>
                        <DeleteButton notebookId={notebookId} onDelete={onDelete} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteIcon;