import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion
        sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            O que é a That’s Me?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ background: "rgba(120, 120, 120, 0.1)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            A That’s Me é uma plataforma online que, por meio de um modelo
            único, certifica conquistas, armazena informações, e premia
            resultados. Nosso objetivo com essa rede é validar todo o mérito do
            indivíduo, de forma lúdica e gamificada.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Como conquisto minhas medalhas?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ background: "rgba(120, 120, 120, 0.1)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Para garantirmos o grau de segurança e confiabilidade que prezamos,
            apenas empresas parceiras poderão registrar a recompensa em sua
            carteira digital. Estamos trabalhando para que você consiga
            conquistar sua primeira medalha o mais rápido possível! ;)
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
          sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Como acessar minha conta?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ background: "rgba(120, 120, 120, 0.1)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Por enquanto a opção “criar conta” não está disponível em nossa
            rede, mas não se preocupe, seu e-mail será validado assim que você
            estiver participando de uma competição parceira. Depois, basta logar
            com o seu e-mail na página inicial, e acessar sua carteira digital!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
          sx={{ background: "rgba(128, 128, 128, 0.8)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Ocorreu algum problema com a minha medalha. E agora?
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ background: "rgba(120, 120, 120, 0.1)", color: "white" }}
        >
          <Typography sx={{ fontFamily: "inter" }}>
            Entre em contato com nosso suporte! Faremos de tudo para eternizar
            sua conquista. Entre em contato através do email
            suporte@thatsme.site ou deixe sua mensagem na caixinha de suporte
            abaixo.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
