"use client";

import { useState, useEffect } from "react";
import styles from "./Header.module.css";

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHideOnScroll(true); // scroll ke bawah -> sembunyikan navbar
      } else {
        setHideOnScroll(false); // scroll ke atas -> tampilkan navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  
  return (
 <nav className={`${styles.navbar} ${hideOnScroll ? styles.navbarHidden : ""}`}>

      <div className={styles.container}>
        <a href="#" className={styles.logoLink}>
          <img
            src="./images/rembulan.png"
            alt="Rembulan Logo"
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Rembulan</span>
        </a>

        {/* Tombol login + toggle, untuk mobile */}
        <div className={styles.actionArea}>
          <button type="button" className={styles.loginButtonMobile}>
            Login
          </button>
<button
  type="button"
  className={styles.toggleButton}
  aria-controls="navbar-sticky"
  aria-expanded={isMenuOpen}
  onClick={() => setIsMenuOpen(!isMenuOpen)}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={styles.menuIcon}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
</button>

        </div>

        <div
          className={`${styles.navMenu} ${isMenuOpen ? styles.showMenu : ""}`}
          id="navbar-sticky"
        >
          <ul className={styles.navList}>
            <li
              className={`${styles.navLink} ${styles.navItemAnimate}`}
              style={{ animationName: "slideInLeft", animationDelay: "0.05s" }}
            >
              <a href="#">Home</a>
            </li>
            <li
              className={`${styles.navLink} ${styles.navItemAnimate}`}
              style={{ animationName: "slideInRight", animationDelay: "0.15s" }}
            >
              <a href="#">About</a>
            </li>
            <li
              className={`${styles.navLink} ${styles.navItemAnimate}`}
              style={{ animationName: "slideInLeft", animationDelay: "0.25s" }}
            >
              <a href="#">Services</a>
            </li>
            <li
              className={`${styles.navLink} ${styles.navItemAnimate}`}
              style={{ animationName: "slideInRight", animationDelay: "0.35s" }}
            >
              <a href="#">Contact</a>
            </li>
            {/* Tombol login khusus desktop */}
            <li>
              <button type="button" className={styles.loginButtonDesktop}>
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


