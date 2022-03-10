import styles from './Header.module.css';

const Header = ({ content }) => {
    return <div className={styles.header}> {content} </div>;
};

export default Header;