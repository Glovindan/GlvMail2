import React, {useState} from 'react';
import classes from "./AuthForm.module.css";
import MyInput from "../UI/input/MyInput";

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  return (
    <div className={classes.container}>
      <MyInput type="email" placeholder={"email"} onChange={(ev) => setEmail(ev.target.value)} value={email}/>
      <MyInput type="password" placeholder={"password"} onChange={(ev) => setPassword(ev.target.value)} value={password}/>
      <select name="email" id="email" onChange={(ev) => setServer(ev.target.value)}
              value={server}>
        <option value="" disabled>Выбор почтового сервера</option>
        <option value="0"> gmail </option>
        <option value="1"> yandex </option>
        <option value="2"> другой </option>
      </select>

      {
        server === '2' &&
        <div className={classes.settingsWrapper}>
          <h5>SMTP:</h5>
          <div className={classes.settingsInputWrapper}>
            <MyInput type="text" placeholder={"SMTP address"}/>
            <MyInput type="text" placeholder={"SMTP port"}/>
          </div>
          <h5>IMAP:</h5>
          <div className={classes.settingsInputWrapper}>
            <MyInput type="text" placeholder={"IMAP address"}/>
            <MyInput type="text" placeholder={"IMAP port"}/>
          </div>
        </div>
      }

      <button>Вход</button>
    </div>
  );
};

export default AuthForm;