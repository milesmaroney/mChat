import React from 'react';
import { flushSync } from 'react-dom';
import ChatBar from './ChatBar';
import Feed from './Feed';
import socketIO from 'socket.io-client';
import Options from './config';
import Logo from './assets/mChat.png';
import useClickOutside from './useClickOutside';
import Login from './Login';
import axios from 'axios';

function App() {
  const [user, setUser] = React.useState(
    () => JSON.parse(localStorage.getItem('mChatUser')) || {}
  );

  const [darkMode, setDarkMode] = React.useState(user.darkMode);
  const [color, setColor] = React.useState(user.color);
  const [showTimestamp, setShowTimestamp] = React.useState(user.showTimestamps);
  const [colorblind, setColorblind] = React.useState(user.colorblind);

  const [messages, setMessages] = React.useState([]);
  const [autoscroll, setAutoscroll] = React.useState(true);
  const [showUserSettings, setShowUserSettings] = React.useState(false);
  const feedRef = React.useRef();
  const userSettings = React.useRef();

  React.useEffect(() => {
    localStorage.setItem('mChatUser', JSON.stringify(user));
    setDarkMode(user.darkMode);
    setColor(user.color);
    setColorblind(user.colorblind);
    setShowTimestamp(user.showTimestamps);
  }, [user]);

  React.useEffect(() => {
    setShowUserSettings(false);
    const socket = socketIO(`${Options.host}:3001`, {
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 5000,
    });
    socket.on('connect_error', () =>
      console.log('Couldnt Connect, Attempting to reconnect in 5 seconds...')
    );
    socket.on('message', (data) => {
      flushSync(() => {
        setMessages((prev) => [...prev, data]);
      });
      smoothScroll(autoscroll);
    });

    return () => socket.disconnect();
  }, [autoscroll]);

  function smoothScroll(canScroll) {
    if (canScroll) {
      let lastMessage = feedRef.current?.lastElementChild;
      lastMessage?.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'smooth',
      });
    }
  }

  React.useEffect(() => {
    if (user.username) {
      axios
        .put(`${Options.host}:3002/preferences`, {
          username: user.username,
          color: color,
          darkMode: darkMode,
          colorblind: colorblind,
          showTimestamps: showTimestamp,
        })
        .then((res) => setUser(res.data));
    }
  }, [color, darkMode, showTimestamp, colorblind]);

  function snapScroll() {
    let lastMessage = feedRef.current?.lastElementChild;
    lastMessage?.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  }

  function handleLogout() {
    localStorage.removeItem('mChatUser');
    setUser({});
    setShowUserSettings(false);
  }

  useClickOutside(userSettings, () => setShowUserSettings(false));

  return (
    <>
      {!user.username && <Login setUser={setUser} />}
      {user.username && (
        <div
          className='flex flex-col h-screen w-screen p-8 pb-6 transition-colors duration-300 border-r border-black'
          style={{
            backgroundColor: darkMode
              ? 'rgb(25, 25, 25)'
              : 'rgb(240, 240, 240)',
            color: darkMode ? 'white' : 'black',
          }}
        >
          <div className='flex items-center'>
            <div className='mr-auto'>
              <img src={Logo} alt='Logo' className='h-8' />
            </div>
            <div
              ref={userSettings}
              className='relative cursor-pointer px-4 py-1 rounded-md'
              style={{
                backgroundColor: darkMode
                  ? 'rgb(50, 50, 50)'
                  : 'rgb(200, 200, 200)',
              }}
            >
              <div onClick={() => setShowUserSettings(true)}>
                Logged in As: <b>{user.username}</b>
              </div>
              {showUserSettings && (
                <div
                  className='absolute top-10 right-0 rounded-md w-full flex justify-center py-1'
                  style={{
                    opacity: showUserSettings ? '1' : '0',
                    backgroundColor: darkMode
                      ? 'rgb(50, 50, 50)'
                      : 'rgb(200, 200, 200)',
                    fontWeight: 'bold',
                    zIndex: '10',
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              )}
            </div>
          </div>
          <div className='grow my-4 overflow-y-auto relative'>
            <Feed
              messages={messages}
              showTimestamp={showTimestamp}
              colorblind={colorblind}
              darkMode={darkMode}
              autoscroll={autoscroll}
              setAutoscroll={setAutoscroll}
              ref={feedRef}
              smoothScroll={smoothScroll}
              snapScroll={snapScroll}
            />
          </div>
          <div className=''>
            <ChatBar
              color={color}
              setColor={setColor}
              setMessages={setMessages}
              showTimestamp={showTimestamp}
              setShowTimestamp={setShowTimestamp}
              colorblind={colorblind}
              setColorblind={setColorblind}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
