import React from 'react';
import { motion } from 'framer-motion';
import { BsLinkedin, BsGithub, BsFacebook } from 'react-icons/bs';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => (
  <div className="app__header app__flex">
    <motion.div
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="app__header-info"
    >
      <div className="app__header-badge">
        <div className="badge-cmp app__flex">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
              <span>👋</span>
              <p className="p-text" style={{ marginLeft: 15 }}>Hello, I am</p>
            </div>
            <h1 className="head-text">Rumesh Chathuranga</h1>
          </div>
        </div>

        <div className="tag-cmp app__flex">
          <p className="p-text">BSc Computer Science & Engineering Undergraduate</p>
          <p className="p-text">University of Moratuwa</p>
        </div>
      </div>
    </motion.div>

    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 0.5, delayChildren: 0.5 }}
      className="app__header-img"
    >
      <motion.img
        whileInView={{ scale: [0, 1] }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        src={images.circle}
        alt="profile_circle"
        className="overlay_circle"
      />
      <img
        src={`${process.env.PUBLIC_URL}/profile.webp`}
        alt="profile_bg"
        className="profile_img"
        fetchpriority="high"
        decoding="async"
      />
    </motion.div>

    <motion.div
      variants={scaleVariants}
      whileInView={scaleVariants.whileInView}
      className="app__header-circles"
    >
      {[
        { icon: <BsGithub />, link: 'https://github.com/RumeshChathuranga' },
        { icon: <BsLinkedin />, link: 'https://www.linkedin.com/in/rumeshchathuranga' },
        { icon: <BsFacebook />, link: 'https://www.facebook.com/rumarumesh1220' },
      ].map((circle, index) => (
        <a
          href={circle.link}
          target="_blank"
          rel="noreferrer"
          className="circle-cmp app__flex"
          key={`circle-${index}`}
        >
          {circle.icon}
        </a>
      ))}
    </motion.div>
  </div>
);

export default AppWrap(Header, 'home');
