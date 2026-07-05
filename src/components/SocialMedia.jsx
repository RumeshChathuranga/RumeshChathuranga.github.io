import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/rumeshchathuranga" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://github.com/RumeshChathuranga" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BsGithub />
      </a>
    </div>
  </div>
);

export default SocialMedia;
