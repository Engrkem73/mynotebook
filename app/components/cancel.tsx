"use client";

import Link from "next/link";
import { useState } from "react";

function Cancel() {
    const [askConfirm, setAskConfirm] = useState(false);

    function showConfirm() {
        setAskConfirm(true);
    }
    function hideConfirm() {
        setAskConfirm(false);
    };



    return (
        <>
            <button type="button" onClick={showConfirm} className="cancel-button">
                Cancel
            </button>
    
                    
            <div className={askConfirm ? "confirm-content" : "hide-confirm"}>
                <h2>Are you sure you want to cancel? You can not undo this action</h2>
                <button type="button" onClick={hideConfirm} className="close-button">No</button>
                <Link href="/" className="continue-button">Yes</Link>
            </div>
           
        </>
    );
}

export default Cancel;