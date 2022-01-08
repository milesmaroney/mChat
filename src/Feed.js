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
          <img src='/LUL.png' alt='LUL' key={i} className='inline' />
        );
      }
    }
    return output;
  }

  const feedMessages = props.messages.map((m) => (
    <div
      // className='flex'
      key={m.id}
      style={{
        color: props.darkMode ? 'rgb(175, 175, 175)' : 'rgb(125, 125, 125)',
      }}
    >
      {props.showTimestamp && <span className='pr-2'>{m.timestamp}</span>}
      <span
        style={{
          color: m.color,
          fontWeight: 'bold',
        }}
      >
        {m.username}
      </span>
      <span style={{ color: props.darkMode ? 'white' : 'black' }}>
        : {emojify(m.message)}
      </span>{' '}
    </div>
  ));
  return <div className='flex flex-col h-full mt-4 gap-1'>{feedMessages}</div>;
}

export default Feed;
