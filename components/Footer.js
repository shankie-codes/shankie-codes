import React from "react";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.item}>Something</li>
      <li className={styles.item}>Else</li>
      <li className={styles.item}>Else</li>
      <li className={styles.item}>Else</li>
    </ul>
  );
};

export default Footer;
