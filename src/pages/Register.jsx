import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Brand from "../assets/images/logomark-brand.svg";
import { apiLogin, apiRegister } from "../utils/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickEye = () => {
    setShowPassword(!showPassword);
  }

  const handleRegisterButton = async () => {
    if (!name) {
      window.alert('Username required!');
    }
    if (!email) {
      window.alert('Password required!');
    }
    if (!username) {
      window.alert('Username required!');
    }
    if (!password) {
      window.alert('Password required!');
    }

    const dataRegister = {
      name,
      email,
      username,
      password
    }

    const response = await apiRegister(dataRegister);
    if (response.status === 200) {
      window.alert('Register Success');
      navigate('/');
    } else if (response.status === 400) {
      window.alert('Username/Email sudah digunakan!');
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="w-fit min-w-[400px] h-fit flex flex-col gap-4 mx-auto md:rounded-2xl p-8 md:shadow">
        <div className="flex flex-col gap-4">
          <img src={Brand} alt="Binar Academy" />
          <div className="w-full border border-gray-200 rounded-lg flex">
            <input name="username" autoComplete="off" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Nama" type="text" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full border border-gray-200 rounded-lg flex">
            <input name="username" autoComplete="off" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="w-full border border-gray-200 rounded-lg flex">
            <input name="username" autoComplete="off" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Username akun Anda" type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="w-full border border-gray-200 rounded-lg flex items-center">
            <input name="password" autoComplete="new-password" className="p-4 text-sm rounded-lg w-full focus-visible:outline-none" placeholder="Password akun Anda" type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} />
            <span className="border-l-2 h-fit px-6 cursor-pointer" onClick={handleClickEye}>{showPassword ? <AiFillEyeInvisible size={28} /> : <AiFillEye size={28} />}</span>
          </div>
        </div>
        <button className="px-16 rounded-full text-md font-bold block text-center py-3 text-sm md:text-base bg-success-50 text-white w-full bg-[#2d3e50]" onClick={handleRegisterButton}>Register</button>
        <a className="mx-auto text-blue-700" onClick={() => navigate('/')}>Punya akun</a>
      </div>
    </div>
  );
}

export default Register;