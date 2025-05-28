import { useState, useCallback, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    toast.success('✅ Password copied!', {
      position: "top-right",
      autoClose: 1500,
      pauseOnHover: false,
      draggable: false,
      theme: "dark",
    });
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4'>
      <ToastContainer />
      <h1 className='text-white font-extrabold text-4xl mb-6 text-center drop-shadow-md'>🔐 Password Generator</h1>

      <div className='flex flex-col sm:flex-row items-center bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-xl'>
        <input
          ref={passwordRef}
          type="text"
          value={password}
          readOnly
          placeholder='Generated password'
          className='flex-1 text-lg px-4 py-3 outline-none'
        />
        <button
          onClick={copyPasswordToClipboard}
          className='bg-purple-600 hover:bg-purple-500 text-white font-semibold px-5 py-3 transition duration-200'
        >
          Copy
        </button>
      </div>

      <div className="bg-white mt-6 p-4 rounded-lg shadow-md w-full max-w-xl space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="length" className='font-medium text-gray-700'>Length: <span className='font-bold text-purple-600'>{length}</span></label>
          <input
            id="length"
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-2/3 accent-purple-600 cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className='flex items-center gap-2 text-gray-700'>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(prev => !prev)}
              className="accent-purple-600"
            />
            Include Numbers
          </label>
          <label className='flex items-center gap-2 text-gray-700'>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(prev => !prev)}
              className="accent-purple-600"
            />
            Include Symbols
          </label>
        </div>
      </div>
    </div>
  )
}

export default App;
