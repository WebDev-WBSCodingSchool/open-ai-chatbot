const Chat = ({ messages }) => {
  return messages
    .filter(m => m.role !== 'system') // Filter out system messages
    .map(m => (
      <div key={m.id} className={`chat ${m.role === 'assistant' ? 'chat-start' : 'chat-end'}`}>
        <div
          className={`chat-bubble ${
            m.role === 'assistant' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
          }`}
        >
          {m.content}
        </div>
      </div>
    ));
};

export default Chat;
