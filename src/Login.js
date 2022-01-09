import axios from 'axios';
import React from 'react';
import Options from './config';

function Login(props) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [newUsername, setNewUsername] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  function handleLoginSubmit() {
    axios
      .get(`${Options.host}:3002/login/${username}/${password}`)
      .then((res) => {
        if (res.data.match) {
          props.setUser(res.data.userInfo);
        } else {
          alert('Incorrect Credentials');
        }
      });
  }

  function handleSignUpSubmit() {
    axios
      .post(`${Options.host}:3002/signup`, {
        username: newUsername,
        password: newPassword,
      })
      .then((res) => console.log(res))
      .catch((err) => alert('User Exists Already'));
  }

  return (
    <div className=' w-screen h-screen flex'>
      <div className='flex flex-col w-5/12'>
        <div>Login:</div>
        username: <input onChange={(e) => setUsername(e.target.value)} />
        password: <input onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginSubmit}>Login</button>
      </div>
      <div className='flex flex-col w-5/12'>
        <div>Sign Up:</div>
        username: <input onChange={(e) => setNewUsername(e.target.value)} />
        password: <input onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={handleSignUpSubmit}>Sign Up</button>
      </div>
    </div>
  );
}

export default Login;
