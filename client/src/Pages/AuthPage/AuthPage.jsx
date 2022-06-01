import React from 'react';
import classes from "./AuthPage.module.css";
import AuthForm from "../../Components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <div className={classes.container}>
      <h1>Вход</h1>
      <div className={classes.formContainer}>
        <AuthForm/>
      </div>
    </div>
  );
};

export default AuthPage;