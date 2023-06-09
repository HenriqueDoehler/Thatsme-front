import { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import ListaHistory from "@/components/listas/listHistory";
import PrivateRoute from "@/components/router/privateRouter";
import { useRouter } from "next/router";
import Link from "next/link";

function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/loginadmin");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/loginadmin");
    }
  }, []);

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
          <h1 className={styles.h1}>Medalhas Resgatadas</h1>
          <div className={styles.containerDash}>
            <ListaHistory />
          </div>
          <Link href="/dashboard">
            <button className={styles.buttonAdd}>voltar</button>
          </Link>
        </div>
      </div>
    </PrivateRoute>
  );
}

export default Dashboard;
