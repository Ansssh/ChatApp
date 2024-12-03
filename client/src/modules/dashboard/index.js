import React, { useEffect } from 'react'
import { useState } from "react";
import SassyAvatar from '../../assets/SassyAvatar.svg'
import f3 from '../../assets/Friend-3.svg'

const Dashboard = () => {
    // eslint-disable-next-line no-unused-vars
    const [user, setuser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [conversations, setConversations] = useState([]);
    const [mess, setmess] = useState({});
    const [people, setpeople] = useState([]);
    const [message, setmessage] = useState('');

    useEffect(() => {
        const Usrdata = JSON.parse(localStorage.getItem('user:detail'));
        const fetchConvo = async () => {
            const response = await fetch(`http://localhost:8000/api/conversation/${Usrdata.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            const data = await response.json();
            // console.log('data :>>', data);
            setConversations(data);
        }
        fetchConvo();
    }, [])

    useEffect(() => {
        const fetchPeople = async () => {
            const response = await fetch(`http://localhost:8000/api/users/${user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData = await response.json();
            setpeople(resData)
        }
        fetchPeople()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const GetMessage = async (conversationId, fool) => {
        const response = await fetch(`http://localhost:8000/api/message/${conversationId}?senderID=${user.id}&&ReceiverId=${fool?.ReceiverId}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });
        const data = await response.json();
        console.log('data :>>', data);
        setmess({ massage: data, fool, gallan: conversationId });
    }


    const sendMessage = async (e) => {
        // eslint-disable-next-line no-unused-vars
        const response = await fetch('http://localhost:8000/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ConvoID: mess?.gallan,
                SenderID: user.id,
                Message: message,
                ReceiverId: mess?.fool?.ReceiverId
            })
        });

        // const data = await response.json();
        // console.log('Message Sent Successfully :>>', data);
        setmessage('')
    }



    return (
        <div className='w-screen  flex '>
            <div className='w-[25%] h-screen overflow-auto bg-r-primary'>
                <div className='flex justify-center items-center mt-5 my-5 '>
                    <img src={SassyAvatar} alt='icon' width={75} className='border-l rounded-full ' />
                    <div className='ml-1'>
                        <h3 className='text-2xl font-extrabold'>{user.name}</h3>
                        <p className='text-lg font-light'>My Account </p>
                    </div>
                </div>
                <hr />
                <div className=''>
                    <div className='text-2xl font-extrabold text-center'>Messages</div>
                    <div className='mt-4'>
                        {
                            conversations.length > 0 ?
                                conversations.map(({ conversationId, child }) => {
                                    return (
                                        <div className='flex justify-start items-center cursor-pointer mt-4 ml-2' onClick={() => {
                                            GetMessage(conversationId, child);
                                        }}>
                                            <div><img src={f3} alt='icon' width={75} className={`border-l rounded-full ${"img" === f3 ? 'bg-white' : 'bg-r-secondary'}`} /></div>
                                            <div className='ml-5'>
                                                <h3 className='text-lg font-semibold'>{child?.name}</h3>
                                                <p className='text-sm font-light '>{child?.email} </p>

                                            </div>
                                        </div>
                                    )
                                }) : <div className='text-center text-lg font-semibold mt-[50%]'>No Conversations found</div>
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%] h-screen bg-l-primary flex flex-col items-center'>
                {
                    mess?.fool?.name &&
                    <div className='w-[75%] bg-l-secondary h-[80px] mt-14 rounded-full flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left cursor-pointer ml-2">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <img src={SassyAvatar} alt='icon' width={60} className=' rounded-full ' />

                        <div className=''>
                            <h3 className='text-2xl font-semibold cursor-pointer'>{mess?.fool?.name}</h3>
                            <p className='text-base font-light'>{mess?.fool?.email}</p>
                        </div>

                        <div className='ml-auto mr-6 flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-video mr-4 cursor-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" /><path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-phone-call cursor-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
                        </div>
                    </div>
                }

                <div className='h-[75%] w-full overflow-y-auto'>
                    <div className=' px-5 py-5'>
                        {/* <div className='max-w-[45%] bg-primary rounded-b-xl rounded-tr-xl px-2 py-2 text-lg font-medium'>
                            Hello Didi.
                        </div>
                        <div className='max-w-[45%] bg-r-secondary rounded-b-xl rounded-tl-xl ml-auto text-lg font-medium p-2 py-2 text-right items-center'>
                            O han vyi Kiddaan
                        </div> */}

                        {
                            mess?.massage?.length > 0 ?
                                mess.massage.map(({ message, sender: { id } = {} }) => {
                                    return (
                                        <div className={`max-w-[45%] rounded-b-xl text-lg font-medium px-2 py-2 items-center my-1 ${id === user?.id ? 'bg-r-secondary rounded-tl-xl ml-auto text-right text-white' : 'bg-primary rounded-tr-xl'}`}>{message}</div>
                                    )
                                }) : mess?.fool?.name ? <div className='text-center text-primary text-lg font-bold '>No Messages</div> : <div className='text-center text-primary text-lg font-bold my-[10%]'>No Conversation Selected</div>
                        }
                    </div>
                </div>
                {
                    mess?.fool?.name &&

                    <div className='w-[100%] p-14 flex items-center'>
                        <input type='text' placeholder='Type a message...' value={message} onChange={(e) => { setmessage(e.target.value) }} className='rounded-full w-full bg-transparent min-h-15 p-4 font-semibold text-white shadow-lg shadow-r-primary focus:ring-0 outline-none'></input>
                        <div >
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#dda15e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-paperclip cursor-pointer ml-3 p-[5px] rounded-full shadow shadow-r-secondary"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" /></svg>
                        </div>
                        <div className={`cursor-pointer ml-3 p-[5px] rounded-full shadow shadow-r-secondary ${!message ? 'pointer-events-none' : ""}`} onClick={() => sendMessage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#dda15e" stroke='none' strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-send-2 cursor-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                        </div>
                    </div>
                }

            </div>
            <div className='w-[25%] border bg-r-primary'>
                <div className='p-5 text-lg font-bold'>Peoples</div>
                {
                    people.length > 0 ?
                        people.map(({ userId, user }) => {
                            return (
                                <div className='flex justify-start items-center cursor-pointer mt-4 ml-2' onClick={() => {
                                    GetMessage('new', user);
                                }}>
                                    <div><img src={f3} alt='icon' width={75} className={`border-l rounded-full ${"img" === f3 ? 'bg-white' : 'bg-r-secondary'}`} /></div>
                                    <div className='ml-5'>
                                        <h3 className='text-lg font-semibold'>{user?.name}</h3>
                                        <p className='text-sm font-light '>{user?.email} </p>
                                    </div>
                                </div>
                            )
                        }) : <div className='text-center text-lg font-semibold mt-[50%]'>No People found</div>
                }
            </div>
        </div>
    )
}

export default Dashboard