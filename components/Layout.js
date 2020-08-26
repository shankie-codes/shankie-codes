import React from "react";
import Head from "next/head";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  return (
    <div className={styles.siteWrapper}>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.closer}></div>
          <h1>shankie.codes</h1>
          <div></div>
        </div>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
