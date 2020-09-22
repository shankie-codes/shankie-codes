import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import Layout from "../components/Layout";
import styles from "./[id].module.scss";
import sanitize from "../helpers/sanitize";
import get from "lodash.get";
import LoadingSpinner from "../components/LoadingSpinner";

// We do a direct request to the API here (rather than using the Firebase SDK) because it's a one-off at build time. We don't need to be able do interact with the document.
const FirestorePagesURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/pages`;

// export async function getStaticPaths() {
//   // by returning an empty list, we are forcing each page to be rendered on request.
//   // these pages will only be rendered once on first request.
//   // the resultant .html and .json will be cached by the CDN indefinitely, with the following cache headers
//   // cache-control: public,max-age=31536000,immutable

//   // firebase hosting deployment should invalidate these cached values
//   // additionally, a new `next build` will create a new Build ID which is
//   // used in the path for the returned .json data file.
//   return {
//     paths: [],
//     fallback: true,
//   };
// }

// This function gets called at on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getServerSideProps({ params }) {
  try {
    // Call an external API endpoint to get posts.
    const res = await fetch(`${FirestorePagesURL}/${params.id}`); // grabs the whole document with the provided document id
    const page = await res.json();

    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        page: {
          id: params.id,
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

// posts will be populated by getStaticProps() at either:
// - build time
// - first request
function Page({ page, found }) {
  const router = useRouter();

  if (!router.isFallback && !found) {
    return <Error statusCode={404} title="No pages with the provided ID" />;
  }

  if (router.isFallback) {
    return <LoadingSpinner fullscreen={true} />;
  }

  return (
    <Layout>
      <Head>
        <title>{page.title}</title>
      </Head>

      <main className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className={styles.title}>{page.title}</h1>
          <div
            className={styles.subtitle}
            dangerouslySetInnerHTML={{ __html: page.subtitle }}
          />
        </header>

        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </main>
    </Layout>
  );
}

export default Page;
