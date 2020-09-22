import React from "react";
import useSWR from "swr";
import get from "lodash.get";
import sanitize from "../helpers/sanitize";
import Head from "next/head";
import Layout from "../components/Layout";

import styles from "./index.module.scss";

const FirestorePagesURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/pages`;

// This function gets called at on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getServerSideProps({ params }) {
  try {
    // Call an external API endpoint to get posts.
    const res = await fetch(`${FirestorePagesURL}/index`); // grabs the whole document with the provided document id
    const page = await res.json();

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        page: {
          title: get(page, "fields.title.stringValue") || "",
          subtitle: get(page, "fields.subtitle.stringValue") || "",
          video: get(page, "fields.video.stringValue") || "",
          content: sanitize(
            get(page, "fields.content.stringValue") || "<p></p>"
          ), // html content should be sanitized before using React's dangerouslySetInnerHTML
        },
        found: !(page.error && page.error.code === 404),
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}

function Home({ page }) {
  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img
            src="/images/shankie-atkinson-384.png"
            alt="A scruffy guy in a t-shirt"
          />
        </div>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
