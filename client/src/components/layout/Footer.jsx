import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AAA</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: contact@AAA.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AAA. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

