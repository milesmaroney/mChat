import moment from 'moment';
import React from 'react';
import ColorPicker from './ColorPicker';
import Settings from './Settings';
import useClickOutside from './useClickOutside';
import socketIO from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import Options from './config';

function ChatBar(props) {
  const [message, setMessage] = React.useState('');
  const [user, setUser] = React.useState('');
  const [showSettings, setShowSettings] = React.useState(false);

  const settings = React.useRef();

  useClickOutside(settings, () => setShowSettings(false));

  function handleGrow() {
    const growers = document.querySelectorAll('.grow-wrap');

    growers.forEach((grower) => {
      const textarea = grower.querySelector('textarea');
      textarea.addEventListener('input', () => {
        grower.dataset.replicatedValue = textarea.value;
      });
    });
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (message && user) {
      const socket = socketIO(`${Options.host}:3001`, {
        withCredentials: true,
      });
      socket.emit('message', {
        id: uuidv4(),
        username: user,
        color: props.color,
        timestamp: moment().format(),
        message: message,
      });
      // props.setMessages((prev) => [
      //   ...prev,
      //   {
      //     id: prev.length + 1,
      //     username: user,
      //     color: props.color,
      //     timestamp: moment().format('h:mm'),
      //     message: message,
      //   },
      // ]);
      setMessage('');
    }
  }

  const inputStyle = {
    borderColor: props.darkMode ? 'rgb(100, 100, 100)' : 'rgb(155, 155, 155)',
    backgroundColor: props.darkMode ? 'rgb(50, 50, 50)' : 'rgb(200, 200, 200)',
    outline: 'none',
  };

  return (
    <div
      className='flex flex-col w-full transition-all duration-300'
      style={{ color: props.darkMode ? 'white' : 'black' }}
    >
      <div className='grow-wrap pb-2'>
        <textarea
          className='border rounded-lg focus:bg-black focus:ring focus:ring-violet-600'
          placeholder='Send a Message'
          maxLength={500}
          value={message}
          style={inputStyle}
          onInput={handleGrow}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleEnter}
        />
      </div>
      <div className='flex w-full gap-2 items-center'>
        Chat As:
        <input
          autoComplete='off'
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder='Enter a Username'
          className='focus:bg-black focus:ring focus:ring-violet-600 rounded-sm indent-1 w-60'
          style={{ ...inputStyle, fontWeight: 'bold', color: props.color }}
          maxLength={25}
        />
        <ColorPicker
          color={props.color}
          setColor={props.setColor}
          darkMode={props.darkMode}
        />
        <div
          className='ml-auto mr-2 relative cursor-pointer'
          onClick={() => setShowSettings(true)}
        >
          ⚙️
          {showSettings && (
            <div ref={settings}>
              <Settings
                setShowTimestamp={props.setShowTimestamp}
                showTimestamp={props.showTimestamp}
              />
            </div>
          )}
        </div>
        <button
          className='bg-violet-600 rounded-md px-3 py-1 font-bold text-white'
          onClick={handleSubmit}
          disabled={!message || !user}
        >
          Chat
        </button>
      </div>
    </div>
  );
}

export default ChatBar;
