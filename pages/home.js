import { useLayoutEffect, useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";
import { encodeParseQuery, useParseQuery } from "@parse/react-ssr";
import Parse from "parse";
import { useRouter} from 'next/router';

export async function getServerSideProps() {
  const parseQuery = new Parse.Query("Message");
  parseQuery.ascending("createdAt");
  parseQuery.greaterThanOrEqualTo('createdAt', new Date());
  
  return {
    props: {
      parseQuery: await encodeParseQuery(parseQuery), // Return encoded Parse Query for server side rendering
    },
  };
}

export default function Auth({ parseQuery }) {
  const [inputMessage, setInputMessage] = useState("");
  const { results: messages } = useParseQuery(parseQuery);
  const router = useRouter();
  
  
  const listRef = useRef(null);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const Message = Parse.Object.extend("Message");
    const newMessage = new Message();
    newMessage.save({
      content: inputMessage,
      senderName: Parse.User.current().get('username'),
      senderId: Parse.User.current().id,
    });
    setInputMessage("");
  };

  const order = (messages) => {
    return messages.sort((a, b) => {
      return a.get("createdAt") - b.get("createdAt");
    });
  };

  useLayoutEffect(() => {
    if (listRef && listRef.current && listRef.current.children) {
      const lastChild =
        listRef.current.children[listRef.current.children.length - 1];
      if (lastChild) {
        lastChild.scrollIntoView();
      }
    }
  }, [messages]);

  useEffect(() => {
    async function checkUser() {
      const currentUser = await Parse.User.currentAsync();
      if (!currentUser) {
        router.push("/");
      }
    }
    checkUser();
  }, []);

  const handleupdateInput = (e) => {
    setInputMessage(e.currentTarget.value);
  };

  const messageClassName = (id) =>
    id === Parse.User.current().id ? styles.myMessage : null;

  return (
    <div className={styles.container}>
      <div className={styles.messagesContainer}>
        <ul ref={listRef}>
          {messages &&
            order(messages).map((message, id) => (
              <div
                key={message.id}
                className={messageClassName(message.get("senderId"))}
              >
                <li className={messageClassName(message.get("senderId"))}>
                  <span className={messageClassName(message.get("senderId"))}>
                    {message.get('senderName')}
                  </span>
                  <p>{message.get("content")}</p>
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
