import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/menu/navbar";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Signup() {
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const router = useRouter();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://api.thatsme.site/addLonelyEventUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      const data = await response.json();

      if (data.status === "error") {
        throw new Error(`${data.message} ou clique `);
      }
      router.push("/feed");
      toast.success("Cadastrado com sucesso!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Thats Me</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="Thats Me APP" />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.trophy}>
            <iframe
              frameborder="0"
              allowfullscreen
              mozallowfullscreen="true"
              webkitallowfullscreen="true"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              xr-spatial-tracking
              execution-while-out-of-viewport
              execution-while-not-rendered
              web-share
              width="1000"
              height="1000"
              src={`https://sketchfab.com/models/56c6c36c4ca2498985ff4728d6659d1f/embed?autostart=1&preload=1&transparent=1&ui_animations=0&ui_infos=0&ui_stop=0&ui_inspector=0&ui_watermark_link=0&ui_watermark=0&ui_ar=0&ui_help=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&dnt=1`}
            ></iframe>
          </div>

          <div className={styles.right}>
            <h1>MINHA</h1>
            <h2>CARTEIRA DIGITAL</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="email">
                Crie sua digital wallet preenchendo os campos abaixo.
              </label>

              <input
                className={styles.input}
                type="text"
                name="name"
                placeholder="Nome Completo"
                value={formState.name}
                onChange={handleInputChange}
                required
              />
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="E-mail"
                value={formState.email}
                onChange={handleInputChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="phone"
                placeholder="Telefone (Opcional)"
                value={formState.phone}
                onChange={handleInputChange}
              />
              {error && (
                <div className={styles.error}>
                  {error}{" "}
                  <Link
                    href="/suporte"
                    style={{ color: "yellow", textDecoration: "none" }}
                    passHref
                  >
                    <span>AQUI.</span>
                  </Link>
                </div>
              )}

              <button className={styles.button} type="submit">
                Cadastrar
              </button>
            </form>
            <p>
              Já está cadastrado?{" "}
              <Link href="/" style={{ color: "white" }}>
                Entre Aqui!
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
