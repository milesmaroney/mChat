function Settings(props) {
  return (
    <div
      className='absolute bottom-9 right-0 flex flex-col w-80 p-2 items-center bg-neutral-700 rounded-md shadow-lg text-white'
      onClick={() => props.setShowTimestamp((prev) => !prev)}
    >
      <div className='flex w-full justify-between items-center px-2 py-1 rounded-md hover:bg-neutral-500 cursor-pointer'>
        <span>Show Timestamps</span>
        <span>{props.showTimestamp ? 'On' : 'Off'}</span>
      </div>
    </div>
  );
}

export default Settings;
