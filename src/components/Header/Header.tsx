import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Crypto Tracker
      </Link>
    </header>
  );
};

export default Header;
