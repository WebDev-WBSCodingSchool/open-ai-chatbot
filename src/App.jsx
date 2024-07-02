const App = () => {
  return (
    <div className='container mx-auto h-screen flex flex-col justify-around'>
      <div className='h-[70%] p-5 bg-base-200 rounded-lg shadow-md'></div>
      <div className='h-[25%] p-5 bg-base-200 rounded-lg shadow-md'>
        <form>
          <label className='label cursor-pointer flex justify-end gap-2'>
            <span className='label-text'>Stream response</span>
            <input type='checkbox' className='checkbox' />
          </label>
          <textarea
            rows='2'
            placeholder='Ask me anything...'
            className='w-full textarea textarea-bordered'
          ></textarea>
          <button id='submit' type='submit' className='btn btn-primary mt-2 w-full'>
            Submit✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
