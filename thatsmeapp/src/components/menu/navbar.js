import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
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

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <img
            onClick={handleLogoClick}
            className={styles.logoImg}
            src="/nameLogo.svg"
            alt="Logo"
          />
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
        <Link style={{ textDecoration: "none" }} href="/" passHref>
          <span>Home</span>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/about" passHref>
          <span>FAQ & Suporte</span>
        </Link>
        <Link style={{ textDecoration: "none" }} href="/contact" passHref>
          <span>Como funciona</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
