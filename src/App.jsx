import { useEffect, useRef, useState } from 'react';
import { Chat, RequestForm } from '@/components';

const systemPrompt = 'You are a web developer assistant that only replies in haikus.';

const App = () => {
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'system',
      content: systemPrompt
    }
  ]);

  useEffect(() => {
    chatRef.current.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages]);

  return (
    <div className='container mx-auto h-screen flex flex-col justify-around'>
      <div ref={chatRef} className='h-[70%] p-5 bg-base-200 rounded-lg shadow-md overflow-y-scroll'>
        <Chat messages={messages} />
      </div>
      <div className='h-[25%] p-5 bg-base-200 rounded-lg shadow-md'>
        <RequestForm messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default App;
