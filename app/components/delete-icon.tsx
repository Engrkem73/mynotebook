"use client";
import { useState } from "react";
import { Delete } from "lucide-react";
import DeleteButton from './delete';
import { on } from "events";

function DeleteIcon({onDelete, notebookId}: any) {
    const [askConfirm, setAskConfirm] = useState(false);

    function showConfirm() {
        setAskConfirm(true);
    }
    function hideConfirm() {
        setAskConfirm(false);
    };


    return (
        <>
            <button onClick={showConfirm} className="delete-button">
                <Delete className="delete-button" />
            </button>
    
                    
            <div className={askConfirm ? "confirm-content" : "hide-confirm"}>
                <h2>Are you sure you want to DELETE? You can not undo this action</h2>
                <button onClick={hideConfirm} className="close-button">No</button>
                <DeleteButton notebookId={notebookId} onDelete={onDelete} />
            </div>
           
        </>
    );
}

export default DeleteIcon;