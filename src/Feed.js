import moment from 'moment';
import React from 'react';

function Feed(props) {
  function emojify(message) {
    let split = message.split('LUL');
    let output = [];
    for (let i = 0; i < split.length; i++) {
      let fragment = split[i];
      output.push(fragment);
      if (i > 0) {
        output.push(
          <img
            src='/emotes/LUL.png'
            style={{ width: '1.2rem' }}
            alt='LUL'
            key={i}
            className='inline mx-1'
          />
        );
      }
    }
    return output;
  }

  const feedMessages = props.messages.map((m) => {
    return (
      <div
        key={m.id}
        style={{
          color: props.darkMode ? 'rgb(175, 175, 175)' : 'rgb(125, 125, 125)',
        }}
      >
        {props.showTimestamp && (
          <span className='pr-2'>{moment(m.timestamp).format('h:mm')}</span>
        )}
        <span
          style={{
            color: props.colorblind
              ? props.darkMode
                ? 'rgb(255, 255, 255'
                : 'rgb(0, 0, 0)'
              : m.color,
            fontWeight: 'bold',
          }}
        >
          {m.username}
        </span>
        <span style={{ color: props.darkMode ? 'white' : 'black' }}>
          : {emojify(m.message)}
        </span>{' '}
      </div>
    );
  });
  return (
    <div className='flex flex-col h-full mt-4 gap-1'>
      {feedMessages.length ? feedMessages : 'Quiet in here...'}
    </div>
  );
}

export default Feed;
