import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <meta
          name="description"
          content="A THATS ME é uma empresa especializada na criação e produção de medalhas em 3D para eventos de todos os tipos. Com uma equipe talentosa e experiente, estamos comprometidos em fornecer medalhas personalizadas que refletem a excelência e o espírito competitivo dos participantes."
        />
        <meta
          name="keywords"
          content="Medalhas, Troféus, Evento, Eventos Esportivos, Esporte, Medalhas 3D, Conquistas, Prêmios, Reconhecimento, Personalização, Design, Qualidade, Customização, Gravação, Competição, Participação, Celebração, Cerimônia, Esportividade, Excelência, Inovação, Exclusividade, Memória, Honra, Criaçao de Medalhas 3D"
        />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/phoneIcon.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/phoneIcon.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
