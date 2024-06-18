import React, { useState, FormEvent, ChangeEvent } from "react";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.apispreadsheets.com/data/dx5hDvBO8sOoum6l/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Form Data Submitted :)");
      } else {
        alert("There was an error :(");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error :(");
    }
  };

  return (
    <section id="contact">
      <h1 className="section-header">Contact</h1>
      <div className="contact-wrapper">
        <form id="contact-form" className="form-horizontal" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="NAME"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="input-container">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <textarea
            className="form-control"
            rows={10}
            placeholder="MESSAGE"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
            <div className="alt-send-button">
              <i className="fa fa-paper-plane"></i><span className="send-text">SEND</span>
            </div>
          </button>
        </form>
        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <i className="fa fa-map-marker fa-2x">
                <span className="contact-text place">City, State</span>
              </i>
            </li>
            <li className="list-item">
              <i className="fa fa-phone fa-2x">
                <span className="contact-text phone">
                  <a href="tel:1-212-555-5555" title="Give me a call">ext. 7000</a>
                </span>
              </i>
            </li>
            <li className="list-item">
              <i className="fa fa-envelope fa-2x">
                <span className="contact-text gmail">
                  <a href="mailto:#" title="Send me an email">example@gmail.com</a>
                </span>
              </i>
            </li>
          </ul>
          <hr />
          <ul className="social-media-list">
            <li><a href="#" target="_blank" className="contact-icon">
              <i className="fa fa-github" aria-hidden="true"></i></a>
            </li>
            <li><a href="#" target="_blank" className="contact-icon">
              <i className="fa fa-codepen" aria-hidden="true"></i></a>
            </li>
            <li><a href="#" target="_blank" className="contact-icon">
              <i className="fa fa-twitter" aria-hidden="true"></i></a>
            </li>
            <li><a href="#" target="_blank" className="contact-icon">
              <i className="fa fa-instagram" aria-hidden="true"></i></a>
            </li>
          </ul>
          <hr />
          <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;