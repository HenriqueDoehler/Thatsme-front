import { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import ListaEmpresas from "@/components/listas/listCompany";
import PrivateRoute from "@/components/router/privateRouter";
import { useRouter } from "next/router";

function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/loginadmin");
  };

  function handleEmpresaClick(empresa) {
    // substituir a lista de empresas por outra lista relacionada à empresa clicada
  }

  function handleCadastrarClick() {}

  return (
    <PrivateRoute>
      <div className={styles.container} style={{ overflow: "auto" }}>
        <div className={styles.sideMenu}>
          <h1 className={styles.textLeft}>Bem Vindo ao Dashboard</h1>
          <button onClick={handleLogout} className={styles.leftButton}>
            Sair
          </button>
        </div>
        <div className={styles.topMenu}>
          <img src="/logoDash.svg" alt="Logo" />
        </div>
        <div className={styles.containerM}>
          <h1 className={styles.h1}>EMPRESAS CADASTRADAS</h1>
          <div className={styles.containerDash}>
            <ListaEmpresas />
            {/* <div className={styles.topMenu}>
              <img src="/logoDash.svg" alt="Logo" />
              <button onClick={handleCadastrarClick}>
                Cadastrar Nova Empresa
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
