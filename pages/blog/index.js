import React, { Fragment } from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

import { generatePosts } from "../../helpers/utils";
import Layout from "../../components/Layout";
import styles from "./index.module.scss";

// Only fetch the title and blurb.
const FirestoreBlogPostsURL = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/posts?mask.fieldPaths=subtitle&mask.fieldPaths=title`;
const fetcher = (url) => fetch(url).then((r) => r.json());

export async function getServerSideProps(context) {
  const data = await fetcher(FirestoreBlogPostsURL);
  const posts = generatePosts(data);

  return { props: { posts } };
}

function Blog(props) {
  const initialData = props.posts;
  const { data } = useSWR(FirestoreBlogPostsURL, fetcher, { initialData });
  // initialData is already transformed, so only transform refetches
  const posts = data.documents ? generatePosts(data) : data;

  return (
    <Layout>
      <Head>
        <title>Teachers Notes - The Poli Blog</title>
      </Head>
      <Fragment>
        <main className={styles.wrapper}>
          <h1 className={styles.title}>Teachers Notes</h1>
          <p className={styles.subtitle}>
            Tips, tricks and ideas for how to make the most out of Poli
          </p>
        </main>
        <div className={styles.grid}>
          {data &&
            posts.map((post) => (
              <article className={styles.post} key={`${post.pid}`}>
                <Link href="blog/[pid]" as={`/blog/${post.pid}`}>
                  <a>
                    <h2>{post.title}</h2>
                    <p>{post.subtitle}</p>
                  </a>
                </Link>
              </article>
            ))}
        </div>
      </Fragment>
    </Layout>
  );
}

export default Blog;
