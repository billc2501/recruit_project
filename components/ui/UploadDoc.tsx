"use client"

import React, {useState} from "react"
import { Button } from "./button";



const UploadDoc = ({ onUploadComplete} : any) => {
    const [file, setFile] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState("Marketing Manager");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handlePositionChange = (e: any) => {
        setSelectedPosition(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
            console.log(data);
            console.log(selectedPosition);
        } catch (error) {
            console.log(error);
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
        <h1>
            Header
        </h1>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your position</label>
            <select id="position" className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={selectedPosition} onChange={handlePositionChange}>

                <option value="Marketing Manager">Marketing Manager</option>
                <option value="IT Manager">IT Manager</option>
                <option value="Front Desk Associate">Front Desk Associate</option>
                <option value="Security Engineer">Security Engineer</option>
            </select>
            <input type="file" id='fileInput' onChange={handleFileChange}/>
            <Button type="submit" disabled={!file || uploading}>
                {uploading ? "Uploading...." : "Upload"}
            </Button>
        </form>
    </>
    );
}

export default UploadDoc