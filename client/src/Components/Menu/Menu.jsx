import React from 'react';
import classes from "./Menu.module.css";
import MyInput from "../UI/input/MyInput";
const Menu = () => {
  return (
    <div className={classes.container}>
      <div className={classes.searchBar}>
        <div className={classes.menuButtonWrapper}>
          <button></button>
        </div>
        <div>
          <input type="text" className={classes.searchField} placeholder={"Поиск"}/>
        </div>
      </div>
    </div>
  );
};

export default Menu;