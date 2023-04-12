import Head from "next/head";
import Navbar from "@/components/menu/navbar";

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Thats Me</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Thats Me APP" />
      </Head>
      <Navbar />
      <main className={styles.main}></main>
    </>
  );
}
