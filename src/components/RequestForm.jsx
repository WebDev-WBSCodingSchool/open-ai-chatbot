import { useState } from 'react';

const RequestForm = ({ messages, setMessages }) => {
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
      const res = await fetch(`${import.meta.env.VITE_OPENAI_PROXY}/api/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json ',
          provider: 'open-ai',
          mode: import.meta.env.VITE_OPENAI_PROXY_MODE
        },
        body: JSON.stringify({ model: 'gpt-4o', messages, stream })
      });
      if (stream) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder('utf-8');
        let result = false;
        const newMessageId = crypto.randomUUID();
        while (!(result = await reader.read()).done) {
          const chunk = decoder.decode(result.value, { stream: true });
          const lines = chunk.split('\n');
          lines.forEach(line => {
            if (line.startsWith('data:')) {
              const jsonStr = line.replace('data:', '');
              const data = JSON.parse(jsonStr);
              const content = data.choices[0]?.delta?.content;
              if (content) {
                setMessages(prev => {
                  const isMessageAlreadyAdded = prev.find(m => m.id === newMessageId);
                  if (isMessageAlreadyAdded)
                    return prev.map(m =>
                      m.id === newMessageId ? { ...m, content: `${m.content}${content}` } : m
                    );
                  return [...prev, { id: newMessageId, role: 'assistant', content }];
                });
              }
            }
          });
        }
      } else {
        const { message } = await res.json();
        setMessages(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            ...message
          }
        ]);
      }
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
