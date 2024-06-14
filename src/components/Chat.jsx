import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../baseUrl';
import { IoMdSend } from "react-icons/io";

export const Chat = ({ data , onClose}) => {
    const [ threadId, setThreadId] = useState(null);
    const [ assistantId, setAssistantId] = useState(null);
    const [ message, setMessage] = useState('');
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);

    let debounceTimer;

    const startConversation = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/assistant`, {
                data
            });

            if (response.status === 200 && response.data) {
                setAssistantId(response.data.assistantId);
                setThreadId(response.data.threadId);
                setMessage(response.data.content);
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            setLoading(false);
        }
    };

    const debouncedStartConversation = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(startConversation, 1000); 
    };

    const sendMessage = async(question) => {
        if(!threadId || !assistantId || !question) {
            return;
        }
        setQuestion('');
        setLoading(true);

        try {
            const response = await axios.post(`${baseUrl}/assistant/chat`, {
                threadId,
                assistantId,
                message: question
            });

            if(response.status === 200 ){
                setMessage(response.data.content);
            }
        } catch (error) {
            console.log(error.message);
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!data || loading) {
            return;
        }
        debouncedStartConversation();
    }, []);

    return (
        <div className="fixed inset-0 z-50  overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white min-h-[70vh] rounded-lg w-2/3 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-bold">AI Chat</h2>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => onClose()}>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex justify-center min-h-[60vh] items-center">

                    <h2 className='text-xl font-semibold'>
                        {loading ? "Loading ... " : message}
                    </h2>
                </div>
                
                <div className="rounded-md flex gap-2 w-full justify-between items-center">

                    <input type="text" value={question} placeholder='Enter your question...' onChange={(e)=>setQuestion(e.target.value)} className='w-[95%] p-2 border-2 rounded-md' />

                    <IoMdSend size={"2rem"} className=' cursor-pointer' onClick={()=>sendMessage(question)}/>

                </div>
            </div>
        </div>
    );
};
