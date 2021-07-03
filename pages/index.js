import { useState } from "react";
import styles from "../styles/Auth.module.css";

export default function Auth() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUserName] = useState(false);
  const [password, setPassword] = useState(false);

  const toggleIsRegistering = () => setIsRegistering(!isRegistering);

  const handleLogin = () => {};
  const handleRegister = () => {};

  const handleAuth = () => (isRegistering ? handleRegister() : handleLogin());
  const [spanText, authText] = isRegistering
    ? ["already have an account ? log in!", "sign up"]
    : ["don't have an account ? register", "sign in"];

  return (
    <div className={styles.container}>
      <h1>Auth</h1>
      <input
        className={styles.input}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="user name"
      />
      <input
        className={styles.input}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <span className={styles.toggleRegistering} onClick={toggleIsRegistering}>
        {spanText}
      </span>
      <button onClick={handleAuth}>{authText}</button>
    </div>
  );
}
