import Navbar from "@/components/menu/navbar";
import styles from "@/styles/comoFunciona.module.css";

export default function howWorks() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.divC}>
          <img src="/howWorks.svg" alt="" />
          <div className={styles.containerHow}>
            <img className={styles.imgText} src="/icon01.svg" alt="" />
            <h1>
              Participe de eventos organizados por nossas empresas parceiras!
            </h1>
            <p>
              Busque se desafiar. Todas competições de empresas parceiras, terão
              como prêmio nossa medalha 3D personalizada. Estamos trabalhando
              para que você possa ter medalhas em tudo que dedica seu tempo. :)
            </p>
          </div>

          <div className={styles.containerHow2}>
            <img src="/icon02.svg" alt="" />
            <h1>
              Fique atento às instruções do evento. Você receberá um Short Code
              para resgatar sua medalha digital.
            </h1>
            <p>
              Acesse a Home da That`s Me e entre na sua carteira digital com o
              seu e-mail registrado no evento.
            </p>
          </div>
          <div className={styles.containerHow3}>
            <img src="/icon03.svg" alt="" />
            <h1>
              Na sua carteira digital você tem acesso a todas suas medalhas, e
              essa conquista está eternizada em nossa rede.
            </h1>
            <p>Mas não acabou por aqui... Bora conquistar mais?</p>
          </div>
        </div>
      </main>
    </>
  );
}
