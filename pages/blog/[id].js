import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "next/error";
import Layout from "../../components/Layout";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./[id].module.scss";

const FirestoreBlogPostsURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts`;

export async function getStaticPaths() {
  // by returning an empty list, we are forcing each page to be rendered on request.
  // these pages will only be rendered once on first request.
  // the resultant .html and .json will be cached by the CDN indefinitely, with the following cache headers
  // cache-control: public,max-age=31536000,immutable

  // firebase hosting deployment should invalidate these cached values
  // additionally, a new `next build` will create a new Build ID which is
  // used in the path for the returned .json data file.
  return {
    paths: [],
    fallback: true,
  };
}

// This function gets called at on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps({ params }) {
  try {
    // Call an external API endpoint to get posts.
    const res = await fetch(`${FirestoreBlogPostsURL}/${params.id}`); // grabs the whole document with the provided document id
    const post = await res.json();
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        post: {
          id: params.id,
          title: post.fields.title.stringValue || "",
          subtitle: post.fields.subtitle.stringValue || "",
          content: post.fields.content.stringValue || "<p/>",
        },
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
function Post({ post }) {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <Error statusCode={404} title="No Blog Post with the provided ID" />;
  }

  if (router.isFallback) {
    return <LoadingSpinner fullscreen={true} />;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.wrapper}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </main>
    </Layout>
  );
}

export default Post;
