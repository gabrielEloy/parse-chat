import { useLayoutEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";

export default function Auth() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const listRef = useRef(null);
  
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, inputMessage]);
    setInputMessage("");
  };

  useLayoutEffect(() => {
    if(listRef && listRef.current && listRef.current.children){
      const lastChild = listRef.current.children[listRef.current.children.length - 1]
      if(lastChild){
        lastChild.scrollIntoView();
      }
    }
  }, [messages])

  const handleupdateInput = (e) => {
    setInputMessage(e.currentTarget.value);
  };

  const messageClassName = (index) =>
    index % 2 === 0 ? styles.myMessage : null;

    console.log(messages)

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        <ul ref={listRef}>
          {messages.map((message, index) => (
            <div key={index} className={messageClassName(index)}>
              <li className={messageClassName(index)}>
                <span className={messageClassName(index)}>username</span>
                <p>{message}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmitMessage} className={styles.actionsContainer}>
        <input value={inputMessage} onChange={handleupdateInput} />
        <button>send message</button>
      </form>
    </div>
  );
}
