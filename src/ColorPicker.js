import React from 'react';
import { RgbStringColorPicker } from 'react-colorful';
import useClickOutside from './useClickOutside';

export default function ColorPicker(props) {
  const [showPicker, setShowPicker] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const popover = React.useRef();

  useClickOutside(popover, () => setShowPicker(false));
  function handleClick() {
    if (!props.colorblind) {
      setShowPicker(true);
    }
  }

  function handleMouseOver() {
    if (props.colorblind) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }
  return (
    <div className='flex items-center relative'>
      <div
        className='h-6 w-6 rounded-[4px] transition-all duration-300'
        style={{
          backgroundColor: props.color,
          border: `1px solid ${
            props.darkMode ? 'rgb(150, 150, 150)' : 'rgb(50, 50, 50)'
          }`,
          cursor: props.colorblind ? 'default' : 'pointer',
        }}
        onMouseOver={handleMouseOver}
        onClick={handleClick}
      ></div>
      <div
        className='text-sm ml-2 text-red-500 transition-all duration-300'
        style={{ opacity: showError ? '1' : '0' }}
      >
        Disable Colorblind Mode
      </div>
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
