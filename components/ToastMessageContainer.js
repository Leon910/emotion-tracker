import ToastMessage from "./ToastMessage";

const ToastMessageContainer = ({ messages }) => (
  <div aria-live="polite" aria-atomic="true">
    {messages.map((message) => (
      <ToastMessage
        key={message._id}
        message={message.text}
        visible={message.visible}
      />
    ))}
  </div>
);

export default ToastMessageContainer;
