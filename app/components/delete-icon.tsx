"use client";
import { useState } from "react";
import { Delete } from "lucide-react";
import DeleteButton from './delete';
import useHoverHook from "../hooks/useHoverHook";

function DeleteIcon({onDelete, notebookId}) {
    const [askConfirm, setAskConfirm] = useState(false);
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
                    className="relative" 
                    aria-label='Delete-button' 
                    onMouseEnter={onHover}
                    onMouseLeave={onLeave}>
                <Delete size={14}/>
                {hover ?<div className='bg-gray-600 text-xs absolute bottom-7 right-1 p-2 rounded-md'>Delete</div>: null }
            </button>
    
                    
            <div className={askConfirm ? "" : "hidden"}>
                <h2>Are you sure you want to DELETE? You can not undo this action</h2>
                <button onClick={hideConfirm} className="close-button">No</button>
                <DeleteButton notebookId={notebookId} onDelete={onDelete} />
            </div>
           
        </>
    );
}

export default DeleteIcon;