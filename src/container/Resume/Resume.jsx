import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HiDownload, HiOutlineExternalLink } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Resume.scss';
import { urlFor, client } from '../../client';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const formatRevised = (value) => {
  if (!value) return null;
  const [year, month] = value.split('-');
  return `Updated ${MONTHS[Number(month) - 1]} ${year}`;
};

const formatSize = (bytes) => {
  if (!bytes) return null;
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
};

const Resume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const query = `*[_type == "resume" && isCurrent == true] | order(updatedOn desc)[0]{
      title,
      updatedOn,
      pages,
      "fileUrl": file.asset->url,
      "fileSize": file.asset->size,
      "fileName": file.asset->originalFilename
    }`;

    client.fetch(query)
      .then((data) => {
        setResume(data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const pages = resume?.pages || [];
  const pageCount = pages.length;
  // Sanity's ?dl= param is what forces a save; the HTML download attribute is
  // ignored cross-origin.
  const downloadUrl = resume?.fileUrl
    ? `${resume.fileUrl}?dl=${resume.fileName || 'resume.pdf'}`
    : null;

  const meta = resume ? [
    formatRevised(resume.updatedOn),
    pageCount ? `${pageCount} ${pageCount === 1 ? 'page' : 'pages'}` : null,
    'PDF',
    formatSize(resume.fileSize),
  ].filter(Boolean) : [];

  // Two blank sheets stand in while loading or if nothing is published yet, so
  // the section keeps its shape instead of collapsing.
  const sheets = pageCount
    ? pages.map((page, index) => ({
      // eslint-disable-next-line no-underscore-dangle
      key: page._key || `page-${index}`,
      src: urlFor(page).width(720).url(),
      alt: `Résumé page ${index + 1} of ${pageCount}`,
    }))
    : [{ key: 'blank-1', src: null }, { key: 'blank-2', src: null }];

  const stackInner = (
    <div className="app__resume-stack">
      {sheets.slice().reverse().map((sheet, index) => {
        const depth = sheets.length - 1 - index;
        return (
          <motion.div
            key={sheet.key}
            className={`app__resume-sheet app__resume-sheet--${depth}`}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40, rotate: 0 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: depth * 0.12, ease: 'easeOut' }}
          >
            {sheet.src
              ? <img src={sheet.src} alt={sheet.alt} loading="lazy" decoding="async" />
              : <div className="app__resume-sheet-blank" aria-hidden="true" />}
          </motion.div>
        );
      })}
    </div>
  );

  return (
    <>
      <h2 className="head-text">My <span>Résumé</span></h2>

      {meta.length > 0 && (
        <p className="app__resume-meta">{meta.join(' · ')}</p>
      )}

      <div className="app__resume-body">
        {downloadUrl ? (
          <a
            href={downloadUrl}
            className="app__resume-paper"
            aria-label={`Download the résumé as a PDF, ${pageCount} pages`}
          >
            {stackInner}
          </a>
        ) : (
          <div className="app__resume-paper app__resume-paper--idle">
            {stackInner}
          </div>
        )}

        <div className="app__resume-copy">
          <p className="app__resume-lead">
            {pageCount
              ? `Everything above, on ${pageCount} ${pageCount === 1 ? 'page' : 'pages'} of A4.`
              : 'Everything above, condensed onto A4.'}
          </p>

          {downloadUrl ? (
            <>
              <a href={downloadUrl} className="app__resume-cta">
                <HiDownload />
                Download PDF
              </a>
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="app__resume-link"
              >
                Open in browser
                <HiOutlineExternalLink />
              </a>
            </>
          ) : (
            <p className="app__resume-empty">
              {loading ? 'Loading the résumé…' : 'The résumé is being updated.'}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Resume, 'app__resume'),
  'resume',
  'app__primarybg',
);
