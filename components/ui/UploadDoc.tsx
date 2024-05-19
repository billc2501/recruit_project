"use client"

import React, {useState} from "react"

const UploadDoc = ({ onUploadComplete} : any) => {
    const [file, setFile] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState("Marketing Manager");
    const [uploading, setUploading] = useState(false);
    const [showPop, setShowPop] = useState(false);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handlePositionChange = (e: any) => {
        setSelectedPosition(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setShowPop(false);
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("position", selectedPosition)
        try {
            const response = await fetch('/api/submitDoc', {
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            if (data.error){
                console.log('error', data.error)
                setShowPop(true);
            }
        } catch (error) {
            console.log("error", error);
        }
        finally {
            setFile(null);
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }
            setUploading(false);
            onUploadComplete();
        }
    }

    return (
    <>
        <h1 className="text-center text-xl font-semibold text-gray-900 dark:text-white mb-5">
            Application Portal
        </h1>
        <form className="max-w-sm mx-auto pb-5" onSubmit={handleSubmit}>
            <div className="mb-5">
                {showPop &&
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <span className="font-medium">Submission Error</span> Already submitted an application
                </div>}
                <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your position</label>
                <select
                    id="position"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={selectedPosition}
                    onChange={handlePositionChange}
                >
                    <option value="Marketing Manager">Marketing Manager</option>
                    <option value="IT Manager">IT Manager</option>
                    <option value="Front Desk Associate">Front Desk Associate</option>
                    <option value="Security Engineer">Security Engineer</option>
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="fileInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload your resume</label>
                <input
                    type="file"
                    id="fileInput"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    onChange={handleFileChange}
                />
            </div>
            <button
                type="submit"
                disabled={!file || uploading}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {uploading ? "Uploading..." : "Submit"}
            </button>
        </form>
    </>
    );
}

export default UploadDoc