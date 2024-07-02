import { useState } from 'react';

const RequestForm = ({ setMessages }) => {
  const [loading, setLoading] = useState(false);
  const [{ message, stream }, setFormState] = useState({
    message: '',
    stream: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormState(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!message) return alert('Please enter a message.');
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: crypto.randomUUID(),
          role: 'user',
          content: message
        }
      ]);
      setFormState(prev => ({ ...prev, message: '' }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className='label cursor-pointer flex justify-end gap-2'>
        <span className='label-text'>Stream response</span>
        <input
          type='checkbox'
          name='stream'
          checked={stream}
          onChange={handleChange}
          className='checkbox'
        />
      </label>
      <textarea
        name='message'
        value={message}
        rows='2'
        onChange={handleChange}
        placeholder='Ask me anything...'
        className='w-full textarea textarea-bordered'
      ></textarea>
      <button type='submit' className='btn btn-primary mt-2 w-full' disabled={loading}>
        {loading ? (
          <>
            <span className='loading loading-spinner'></span>
            Processing
          </>
        ) : (
          <>
            Send{' '}
            <span role='img' aria-label='sparkles'>
              ✨
            </span>
          </>
        )}
      </button>
    </form>
  );
};

export default RequestForm;
