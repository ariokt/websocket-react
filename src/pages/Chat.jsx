import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiPaperplane } from "react-icons/ci";
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

function Chat() {
  const token = sessionStorage.getItem('userToken');
  const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
  console.log(dataUser)
  
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState('');
  
  const [room, setRoom] = useState(dataUser?.dataUser?.role === 'admin' ? null : dataUser?.dataUser?.id);
  const [messages, setMessages] = useState([]);
  console.log(messages)

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [])

  useEffect(() => {

    if (room) {
      socket.emit('joinRoom', room);
    }

    socket.on('messageUserAdmin', (message) => {
      console.log(message)
      setMessages(prev => [...prev, message]);
    })

    return () => {
      socket.off('messageUserAdmin')
    }

  }, [room])

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    socket.emit('messageUserAdmin', { room, newMessage });
    setNewMessage('');
  }
  
  
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="w-fit min-w-[400px] h-fit flex flex-col gap-4 mx-auto rounded-2xl p-8 shadow">
        <h1>Chat</h1>
        <div className="flex flex-col gap-4">
          
        </div>
        <div className="flex gap-2 w-full">
          <input className="grow border border-[#2d3e50] rounded-lg focus-visible:outline-none p-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button className="p-3 rounded-full text-md font-bold block text-center text-sm md:text-base bg-success-50 text-white bg-[#2d3e50]" onClick={handleSendNewMessage} ><CiPaperplane /></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;