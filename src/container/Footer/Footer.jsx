import React, { useState } from 'react';
import { BsCopy, BsCheck } from 'react-icons/bs';
// eslint-disable-next-line import/no-extraneous-dependencies
import Lottie from 'lottie-react';

import confettiAnimation from '../../assets/confetti.json';
import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import { client } from '../../client';
import './Footer.scss';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState('');

  const { username, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: formData.username,
      email: formData.email,
      message: formData.message,
    };

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <>
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card" onClick={() => handleCopy('rumarumesh1220@gmail.com', 'email')}>
          <img src={images.email} alt="email" />
          <div className="app__footer-card-info">
            <span className="p-text">rumarumesh1220@gmail.com</span>
          </div>
          <div className="app__footer-card-copy">
            {copied === 'email' ? (
              <BsCheck className="copy-icon checked" />
            ) : (
              <BsCopy className="copy-icon" />
            )}
            {copied === 'email' && (
              <div className="app__footer-card-confetti">
                <Lottie animationData={confettiAnimation} loop={false} />
              </div>
            )}
          </div>
        </div>
        <div className="app__footer-card" onClick={() => handleCopy('+94710420359', 'phone')}>
          <img src={images.mobile} alt="mobile" />
          <div className="app__footer-card-info">
            <span className="p-text">+94710420359</span>
          </div>
          <div className="app__footer-card-copy">
            {copied === 'phone' ? (
              <BsCheck className="copy-icon checked" />
            ) : (
              <BsCopy className="copy-icon" />
            )}
            {copied === 'phone' && (
              <div className="app__footer-card-confetti">
                <Lottie animationData={confettiAnimation} loop={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input className="p-text" type="text" placeholder="Your Name" name="username" value={username} onChange={handleChangeInput} />
          </div>
          <div className="app__flex">
            <input className="p-text" type="email" placeholder="Your Email" name="email" value={email} onChange={handleChangeInput} />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">
            Thank you for getting in touch!
          </h3>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg',
);
