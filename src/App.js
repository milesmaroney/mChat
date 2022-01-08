import React from 'react';
import ChatBar from './ChatBar';
import Feed from './Feed';
import sampleMessages from './sampleData';
import socketIO from 'socket.io-client';

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

  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    const socket = socketIO('http://localhost:3001', {
      withCredentials: true,
    });
    // socket.on('message', (data) => console.log(data));
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
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;
