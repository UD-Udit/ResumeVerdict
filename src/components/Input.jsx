import React, { useState, useRef, useEffect } from 'react';
import { FaRegFilePdf, FaAngleRight } from "react-icons/fa";
import { baseUrl } from '../baseUrl';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Input = ({setResults}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setProgress(0);
    const formData = new FormData();  
    selectedFiles.forEach((file, index) => {
      formData.append(`resumes`, file);
    });
    const totalFiles = selectedFiles.length;
    const totalTime = totalFiles * 7;
    let progressValue = 0;
    intervalRef.current = setInterval(() => {
      progressValue += (100 / totalTime);
      if (progressValue >= 100) {
        progressValue = 100;
        setProgress(progressValue);
        clearInterval(intervalRef.current);
      } else {
        setProgress(progressValue);
      }
    }, 1000);
    
    try {
      const response = await axios.post(`${baseUrl}/resumes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      clearInterval(intervalRef.current);
      if(response.status === 200 && response.data){
        console.log('Response:', response.data);
        setResults(response.data.result)
        navigate('/result');
      }else{
        console.log(response.data);
      }
    } catch (error) {
      clearInterval(intervalRef.current);
      console.error('Error uploading files:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return (
    <div className="border-1 text-white border-white rounded-2xl p-2 w-[70%] gap-8 h-4/5 flex flex-col items-center bg-[#ebebeb30]">
      <div
        className={`bg-white p-4 rounded-2xl flex-col w-4/5 h-1/2 flex cursor-pointer justify-center items-center mt-8 shadow-2xl ${dragActive ? 'border-4 border-dashed border-blue-400' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <FaRegFilePdf color='black' size={"6rem"} />
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          multiple
          ref={inputRef}
          style={{ display: 'none' }}
        />
        <p className="mt-4 text-center font-semibold text-gray-600">
            {
                selectedFiles.length === 0 ?
                "Drag and drop the resumes" : 
                ` ${selectedFiles.length} File(s) Selected`
            }
        </p>
        
      </div>

      <h3 className='text-2xl p-2 font-semibold'>
        We will extract important information from the resumes for you!
      </h3>

      <button className='w-4/5 p-4  flex justify-center items-center rounded-md outline-none shadow-md bg-red-600 font-bold text-white' onClick={handleSubmit}>
        {
          loading ? 
            <div className='flex justify-center items-center gap-2'>
              <div className="loader"></div>
              <p className='text-white'>
              {Math.min(progress, 100).toFixed(2)}% Processed...
              </p>
            </div>
            :
            <div className='flex justify-center items-center gap-2'>
              <FaAngleRight color='white'/>
              <p className='text-white'>Lets Go!</p>
            </div>
        }
      </button>
    </div>
  );
};
