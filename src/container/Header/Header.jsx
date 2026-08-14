import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsLinkedin, BsGithub, BsFacebook } from 'react-icons/bs';
import { HiDownload, HiOutlineExternalLink, HiOutlineDocumentText } from 'react-icons/hi';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import { client, urlFor } from '../../client';
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

const formatSize = (bytes) => {
  if (!bytes) return null;
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
};

const Header = () => {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const query = `*[_type == "resume" && isCurrent == true] | order(updatedOn desc)[0]{
      "fileUrl": file.asset->url,
      "fileSize": file.asset->size,
      "fileName": file.asset->originalFilename,
      "previewImage": pages[0]
    }`;

    client.fetch(query).then((data) => {
      if (data?.fileUrl) setResume(data);
    });
  }, []);

  const downloadUrl = resume
    ? `${resume.fileUrl}?dl=${resume.fileName || 'Rumesh_Chathuranga_CV.pdf'}`
    : null;
  const sizeLabel = resume ? formatSize(resume.fileSize) : null;
  const previewSrc = resume?.previewImage
    ? urlFor(resume.previewImage)
      .width(96)
      .height(136)
      .fit('crop')
      .url()
    : null;

  return (
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
            <p className="p-text">BSc Computer Science &amp; Engineering Undergraduate</p>
            <p className="p-text">University of Moratuwa</p>
          </div>

          {downloadUrl && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="resume-group"
            >
              <a
                href={downloadUrl}
                className="resume-cmp app__flex"
                aria-label="Download my CV as a PDF"
              >
                {previewSrc ? (
                  <img src={previewSrc} alt="" className="resume-cmp-thumb" />
                ) : (
                  <div className="resume-cmp-thumb resume-cmp-thumb--fallback">
                    <HiOutlineDocumentText />
                  </div>
                )}
                <div className="resume-cmp-text">
                  <p className="resume-cmp-title">
                    <HiDownload />
                    Download CV
                  </p>
                  <p className="resume-cmp-meta">{sizeLabel ? `PDF · ${sizeLabel}` : 'PDF'}</p>
                </div>
              </a>

              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="resume-cmp-view"
              >
                View CV
                <HiOutlineExternalLink />
              </a>
            </motion.div>
          )}
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
          fetchPriority="high"
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
};

export default AppWrap(Header, 'home');
