import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion sx={{ background: "rgba(128, 128, 128, 0.8)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>O que é a That’s Me?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A That’s Me é uma plataforma online que, por meio de um modelo
            único, certifica conquistas, armazena informações, e prêmia
            resultados. Nosso objetivo com essa rede é validar todo o mérito que
            o indivíduo , de forma lúdica e gamificada.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "rgba(128, 128, 128, 0.8)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Como conquisto minhas medalhas?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Para garantirmos o grau de segurança e confiabilidade que prezamos,
            apenas empresas parceiras poderão registrar a recompensa em sua
            carteira digital. Estamos trabalhando para que você consiga
            conquistar sua primeira medalha o mais rápido possível! ;)
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "rgba(128, 128, 128, 0.8)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Como acessar minha conta?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Por enquanto a opção “criar conta” não está disponível em nossa
            rede, mas não se preocupe, seu e-mail será validado assim que você
            estiver participando de uma competição parceira. Depois, basta logar
            com o seu e-mail na página inicial, e acessar sua carteira digital!
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: "rgba(128, 128, 128, 0.8)" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>
            Ocorreu algum problema com a minha medalha. E agora?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Entre em contato com nosso suporte! Faremos de tudo para eternizar
            sua conquista.Entre em contato através do email suporte@thatsme.site
            ou clique na seta abaixo.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
