import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/menu/navbar";
import styles from "@/styles/404.module.css";

export default function Custom404() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <h1>Oops! Esta página não existe.</h1>
        <img src="/404.svg" alt="404 ERROR" />
        <p>404 ERROR</p>
        <Link href="/">
          <span style={{ color: "white" }}>Voltar para a página inicial</span>
        </Link>
      </div>
    </>
  );
}
