import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiPaperplane } from "react-icons/ci";
import io from 'socket.io-client';

let socket = io('http://34.132.193.158', {
  autoConnect: false
});

function Chat() {
  const token = sessionStorage.getItem('userToken');
  const dataUser = JSON.parse(sessionStorage.getItem('dataUser'));
  
  const navigate = useNavigate();

  const [newMessage, setNewMessage] = useState('');

  const [adminRoom, setAdminRoom] = useState(1);
  const [rooms, setRooms] = useState([]);
  
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    socket.connect();

    socket.emit('join', dataUser.id);

    socket.on('getRooms', (updatedRooms) => {
      setRooms(updatedRooms);
    });
    

    socket.on('messageUserAdmin', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('messageUserAdmin');
      socket.off('getRooms');
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('dataUser');
    socket.emit('leave', dataUser.id);
    socket.disconnect();
    navigate('/');
  }

  const handleSendNewMessage = (e) => {
    e.preventDefault();
    socket.emit('messageUserAdmin', { room: dataUser.role === 'admin' ? adminRoom : dataUser.id, newMessage, sender: dataUser.email, role: dataUser.role });
    // socket.emit('messageUserAdmin', { room: 1, newMessage, sender: dataUser.email, role: dataUser.role });
    setNewMessage('');
  }

  const handleChangeRoom = (e) => {
    setAdminRoom(e.target.value);
    setMessages([]);
    socket.emit('join', Number(e.target.value));
  }
  
  
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className='flex flex-col items-center mb-2'>
        <p className='font-bold mb-1'>Role</p>
        <p>{dataUser.role}</p>
      </div>
      {dataUser.role === 'admin' &&
        <div className='flex flex-col items-center'>
          <label className='font-bold mb-1' htmlFor="rooms">Pilih Room</label>
          <select className='mb-4 max-w-[200px] mx-auto border border-black rounded' name="rooms" id="rooms" value={adminRoom} onChange={handleChangeRoom}>
            {rooms.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      }
      <div className="w-fit min-w-[400px] h-fit flex flex-col gap-4 mx-auto rounded-2xl p-8 shadow">
        <div className="flex justify-between">
          <h1>Chat</h1>
          <button className="text-blue-400" onClick={handleLogout}>Logout</button>
        </div>
        <hr />
        <div className="flex flex-col gap-4 max-h-[200px] overflow-y-scroll">
          {messages.map((message, index) => (
            <div key={index} className={"w-fit max-w-[200px] flex flex-col border border-gray-200 rounded-lg p-2 " + (message.role === 'admin' ? 'items-start' : 'items-end self-end')}>
              <p className="text-xs w-fit max-w-3/4">{message.sender} - {message.role}</p>
              <p className="text-sm rounded-lg w-fit">{message.message}</p>
            </div>
          ))}
          
        </div>
        <div className="flex gap-2 w-full">
          <input className="grow border border-[#2d3e50] rounded-lg focus-visible:outline-none p-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
          <button className="p-3 rounded-full text-md font-bold block text-center text-sm md:text-base bg-success-50 text-white bg-[#2d3e50] cursor-pointer" onClick={handleSendNewMessage} ><CiPaperplane /></button>
        </div>
      </div>
    </div>
  );
}

export default Chat;