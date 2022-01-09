function Settings(props) {
  return (
    <div className='absolute bottom-9 right-0 flex flex-col w-80 p-2 items-center bg-neutral-700 rounded-md shadow-lg text-white'>
      <div
        className='flex w-full justify-between items-center px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer'
        onClick={() => props.setDarkMode((prev) => !prev)}
      >
        <span>Dark Mode</span>
        <span>{props.darkMode ? 'On' : 'Off'}</span>
      </div>
      <div
        className='flex w-full justify-between items-center px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer'
        onClick={() => props.setColorblind((prev) => !prev)}
      >
        <span>Colorblind Mode</span>
        <span>{props.colorblind ? 'On' : 'Off'}</span>
      </div>
      <div
        className='flex w-full justify-between items-center px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer'
        onClick={() => props.setShowTimestamp((prev) => !prev)}
      >
        <span>Show Timestamps</span>
        <span>{props.showTimestamp ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
}

export default Settings;
