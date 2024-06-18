import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div id="footer-wrap">
      <footer className="footer-container">
        <div className="top-footer">
          <div className="footer-content">
            <div className="footer-logo">
              <a href="/" title="Mercury">
                <img
                  src="/logo.png"
                  width="150"
                  alt="Mercury-Logo"
                  className="img-fluid"
                />
                Alive 10.0
              </a>
              <p className="tagline">Tagline Alive 10.0</p>
            </div>

            <nav className="footer-nav">
              <h4>Link</h4>
              <ul className="footer-link">
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </nav>

            <nav className="footer-nav">
              <h4>About Us</h4>
              <ul className="footer-link">
                <li>
                  <a href="#" title="Faq">
                    Faq
                  </a>
                </li>
                <li>
                  <a href="#" title="Blog">
                    Blog
                  </a>
                </li>
              </ul>
            </nav>

            <div className="contact-info">
              <h4>Contact Us</h4>
              <ul className="footer-link">
                <li>
                  <a href="mailto:smartlight.eip@gmail.com" title="Contact">
                    example@gmail.com
                  </a>
                </li>
                <li>
                  <ul className="social-media-list">
                    <li>
                      <a href="#" target="_blank" className="contact-icon">
                        <i className="fa fa-github" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="contact-icon">
                        <i className="fa fa-codepen" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="contact-icon">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank" className="contact-icon">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <p className="copyright pt-3">
            Copyright &copy; 2024 UMN Medical Center
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
