import moment from 'moment';
import React from 'react';

const Feed = React.forwardRef((props, ref) => {
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

  function handleClick() {
    props.snapScroll();
    props.setAutoscroll(true);
  }

  function checkScroll(e) {
    if (
      e.target.scrollHeight - e.target.scrollTop >=
      e.target.clientHeight + 100
    ) {
      props.setAutoscroll(false);
    } else {
      props.setAutoscroll(true);
    }
  }

  return (
    <>
      <div
        className='flex flex-col h-full gap-1 overflow-y-auto'
        ref={ref}
        onScroll={checkScroll}
      >
        {feedMessages.length ? feedMessages : 'Welcome to the chat room!'}
      </div>
      <div
        className='absolute bottom-4 right-1/2 translate-x-1/2 transition-opacity duration-300 py-1 px-4 rounded-md cursor-pointer'
        onClick={handleClick}
        style={{
          opacity: props.autoscroll ? '0' : '1',
          backgroundColor: props.darkMode
            ? 'rgba(25, 25, 25, .9)'
            : 'rgba(225, 225, 225, .9)',
          border: `1px solid ${
            props.darkMode ? 'rgb(50, 50, 50)' : 'rgb(200, 200, 200)'
          }`,
          fontWeight: 'bold',
        }}
      >
        Auto Scroll Paused
      </div>
    </>
  );
});

export default Feed;
