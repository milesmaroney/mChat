import axios from 'axios';
import React from 'react';
import Options from './config';
import Logo from './assets/mChat.png';

function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState('');

  function handleLoginSubmit() {
    axios
      .get(`${Options.host}:3002/login/${username}/${password}`)
      .then((res) => {
        if (res.data.match) {
          props.setUser(res.data.userInfo);
        } else {
          alert('Incorrect Credentials');
        }
      })
      .catch((err) => alert('No account with that username found'));
  }

  function handleSignUpSubmit() {
    if (newPassword === newPasswordConfirm) {
      axios
        .post(`${Options.host}:3002/signup`, {
          username: newUsername,
          password: newPassword,
        })
        .then((res) => props.setUser(res.data))
        .catch((err) => alert('User Exists Already'));
    } else {
      alert('Passwords Dont Match');
    }
  }

  const inputStyle = {
    borderColor: 'rgb(100, 100, 100)',
    backgroundColor: 'rgb(50, 50, 50)',
    outline: 'none',
    textIndent: '.5rem',
  };

  return (
    <div
      className=' w-screen h-screen flex flex-col justify-evenly items-center text-white'
      style={{
        backgroundColor: 'rgb(25, 25, 25)',
      }}
    >
      <img src={Logo} alt='Logo' style={{ width: '20vw' }} />
      <div className='flex flex-col w-1/3'>
        <div className='text-center text-2xl uppercase font-light'>Login</div>
        username{' '}
        <input
          className=' mb-4 border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          style={inputStyle}
          onChange={(e) => setUsername(e.target.value)}
        />
        password{' '}
        <input
          className=' mb-4 border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          style={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
        />
        <button
          className='bg-violet-600 rounded-md px-3 py-1 my-4 font-bold text-white'
          onClick={handleLoginSubmit}
        >
          Login
        </button>
      </div>
      <div className='flex flex-col w-1/3'>
        <div className='text-center text-2xl uppercase font-light'>Sign Up</div>
        username{' '}
        <input
          className=' mb-4 border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          style={inputStyle}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        password{' '}
        <input
          className=' mb-4 border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          style={inputStyle}
          onChange={(e) => setNewPassword(e.target.value)}
          type='password'
        />
        confirm password{' '}
        <input
          className=' mb-4 border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          style={inputStyle}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
          type='password'
        />
        <button
          className='bg-violet-600 rounded-md px-3 py-1 my-4 font-bold text-white'
          onClick={handleSignUpSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
