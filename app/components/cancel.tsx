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
            <button type="button" onClick={showConfirm} className="bg-red-500 w-[100px] text-center text-white px-4 py-2 rounded-md mb-4">
                Cancel
            </button>
    
                    
            <div className={askConfirm ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" : "hidden"}>
            <div className="bg-white p-6 rounded-lg w-[400px] h-[300px] flex flex-col items-center justify-center">
                    <h2 className="text-lg text-black font-bold mb-4">Are you sure you want to CANCEL? You will lose your unsave notes</h2>
                    <div className="flex flex-row gap-5">
                        <button onClick={hideConfirm} className="bg-blue-500 w-[100px] text-white px-4 py-2 rounded-md mb-4">No</button>
                        <Link href="/" className="bg-red-500 w-[100px] text-center text-white px-4 py-2 rounded-md mb-4">Yes</Link>
                    </div>
                </div>
                
            </div>
           
        </>
    );
}

export default Cancel;