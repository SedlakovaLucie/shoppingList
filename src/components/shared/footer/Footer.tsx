import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <p>© {new Date().getFullYear()}</p>
      <p>
        @{" "}
        <a
          href="https://lucie-sedlakova.cz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lucie Sedláková
        </a>
      </p>
    </div>
  );
};

export default Footer;
