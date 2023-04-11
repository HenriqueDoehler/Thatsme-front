import Head from "next/head";

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Thats Me</title>
        <meta name="description" content="Thats Me APP" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.textSoon}>EM BREVE</h1>
        <img
          className={styles.logoimg}
          src="/logoWhite.svg"
          alt="Logo Loading..."
        />
      </main>
    </>
  );
}
