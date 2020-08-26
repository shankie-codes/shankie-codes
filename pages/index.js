import React from "react";
import useSWR from "swr";
import Head from "next/head";
import Layout from "../components/Layout";
import { generatePosts } from "../helpers/utils";

import styles from "./index.module.scss";

const FirestorePagesURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/pages`;
const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getServerSideProps(context) {
  const data = await fetcher(FirestorePagesURL);
  const pages = generatePosts(data) || [];
  return { props: { pages } };
}

function Home(props) {
  const initialData = props.pages;
  const { data } = useSWR(FirestorePagesURL, fetcher, { initialData });
  // initialData is already transformed, so only transform refetches
  const pages = data.documents ? generatePosts(data) : data;

  return (
    <Layout>
      <Head>
        <title>shankie.codes</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/shankie-atkinson-384.png"
            alt="A scruffy guy in a t-shirt"
          />
        </div>
        <div className={styles.content}>
          <p>Hi, I'm Shankie</p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
