import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/navbar.module.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    setClicks(clicks + 1);
    if (clicks === 10) {
      window.location.href = "/loginadmin";
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    router.push("/");
  };


  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <img
            onClick={handleLogoClick}
            className={styles.logoImg}
            src="/logo3.svg"
            alt="Logo"
          />
          <img className={styles.sig} src="/asFundo.svg" alt="Logo" />
        </Link>
      </div>
      <button className={styles.menuIcon} onClick={handleMenuClick}>
        <img src={isOpen ? "/X.svg" : "/menuIcon.svg"} alt="MENU" />
      </button>
      <div
        className={`${styles.menu} ${isOpen ? styles.open : ""} ${
          isOpen ? styles.fadeIn : ""
        }`}
      >
        <div className={styles.walletAndFeedContainer}>
        <Link style={{ textDecoration: "none" }} href="/feed" passHref>
          <span className={styles.span}>Feed</span>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/wallet" passHref>
          <span className={styles.span}>Carteira</span>
        </Link>
        </div>
        <Link style={{ textDecoration: "none" }} href="/" passHref>
          <span className={styles.span}>Home</span>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/suporte" passHref>
          <span className={styles.span}>FAQ & Suporte</span>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/comoFunciona" passHref>
          <span className={styles.span}>Como funciona</span>
        </Link>
        <div className={styles.walletAndFeedContainer}>
        <a onClick={handleLogout} style={{ textDecoration: "none" }} passHref>
          <span className={styles.span}>Sair</span>
        </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
