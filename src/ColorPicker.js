import React from 'react';
import { RgbStringColorPicker } from 'react-colorful';
import useClickOutside from './useClickOutside';

export default function ColorPicker(props) {
  const [showPicker, setShowPicker] = React.useState(false);
  const popover = React.useRef();

  useClickOutside(popover, () => setShowPicker(false));
  return (
    <div className='relative'>
      <section
        className='h-6 w-6 cursor-pointer rounded-[4px] transition-all duration-300'
        style={{
          backgroundColor: props.color,
          border: `1px solid ${
            props.darkMode ? 'rgb(150, 150, 150)' : 'rgb(50, 50, 50)'
          }`,
        }}
        onClick={() => setShowPicker(true)}
      ></section>
      {showPicker && (
        <div
          className='absolute bottom-0 left-7 border rounded-lg border-black'
          ref={popover}
        >
          <RgbStringColorPicker color={props.color} onChange={props.setColor} />
        </div>
      )}
    </div>
  );
}
