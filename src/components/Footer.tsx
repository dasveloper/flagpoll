const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center mt-12 p-4 text-base-content">
      <div>
        <p>© {year} Flagpoll - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
