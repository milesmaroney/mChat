import React from 'react';
import ChatBar from './ChatBar';
import Feed from './Feed';
import socketIO from 'socket.io-client';
import Options from './config';

function App() {
  const [darkMode, setDarkMode] = React.useState(
    () => JSON.parse(localStorage.getItem('mChatTheme')) || false
  );
  const [color, setColor] = React.useState(
    () =>
      JSON.parse(localStorage.getItem('mChatUserColor')) || 'rgb(255, 255, 255)'
  );
  const [showTimestamp, setShowTimestamp] = React.useState(
    () => JSON.parse(localStorage.getItem('mChatTimestamp')) || false
  );
  const [colorblind, setColorblind] = React.useState(
    () => JSON.parse(localStorage.getItem('mChatColorblind')) || false
  );

  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    const socket = socketIO(`${Options.host}:3001`, {
      withCredentials: true,
      reconnection: true,
      reconnectionDelay: 5000,
      reconnectionDelayMax: 5000,
    });
    socket.on('connect', (data) => console.log('Connected to mChat!'));
    socket.on('disconnect', () =>
      console.log('Disconnected, Attempting to reconnect in 5 seconds...')
    );
    socket.on('connect_error', () =>
      console.log('Couldnt Connect, Attempting to reconnect in 5 seconds...')
    );
    socket.on('message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => socket.disconnect();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('mChatUserColor', JSON.stringify(color));
  }, [color]);
  React.useEffect(() => {
    localStorage.setItem('mChatTheme', JSON.stringify(darkMode));
  }, [darkMode]);
  React.useEffect(() => {
    localStorage.setItem('mChatTimestamp', JSON.stringify(showTimestamp));
  }, [showTimestamp]);
  React.useEffect(() => {
    localStorage.setItem('mChatColorblind', JSON.stringify(colorblind));
  }, [colorblind]);

  return (
    <div
      className='flex flex-col h-screen w-screen p-8 pb-6 transition-colors duration-300 border-r border-black'
      style={{
        backgroundColor: darkMode ? 'rgb(25, 25, 25)' : 'rgb(240, 240, 240)',
        color: darkMode ? 'white' : 'black',
      }}
    >
      <div className='flex items-center'>
        <div className='text-xl font-bold mr-auto'>mChat</div>
        <div onClick={() => setDarkMode(!darkMode)}>
          <input type='checkbox' className='mr-2' readOnly checked={darkMode} />
          <span className='cursor-pointer'>Dark Mode</span>
        </div>
      </div>
      <div className='grow'>
        <Feed
          messages={messages}
          showTimestamp={showTimestamp}
          colorblind={colorblind}
          darkMode={darkMode}
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
        />
      </div>
    </div>
  );
}

export default App;
