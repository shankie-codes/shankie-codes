import React, { Fragment, useState } from "react";
import MenuButton from "./MenuButton";

import styles from "./Footer.module.scss";

const Footer = () => {
  const [darkModeActive, setDarkModeActive] = useState(false);
  return (
    <Fragment>
      <ul className={styles.wrapper}>
        <li>
          <MenuButton>Something</MenuButton>
        </li>
        <li>
          <MenuButton>Else</MenuButton>
        </li>
        <li>
          <MenuButton>Else</MenuButton>
        </li>
        <li>
          <MenuButton>Else</MenuButton>
        </li>
        <li>
          <MenuButton onClick={() => setDarkModeActive(true)}>
            Dark mode
          </MenuButton>
        </li>
      </ul>
      {darkModeActive && (
        <div className={styles.darkMode}>
          <MenuButton onClick={() => setDarkModeActive(false)}>
            Ok, very funny
          </MenuButton>
        </div>
      )}
    </Fragment>
  );
};

export default Footer;
