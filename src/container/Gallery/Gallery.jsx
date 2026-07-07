import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Gallery.scss';

const springConfig = {
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const listener = (e) => setReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return reduced;
};

export const DraggableCardBody = ({ className, initialRotate, containerRef, children }) => {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef(null);
  const controls = useAnimationControls();

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);
  const opacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.9, 1, 0.9]), springConfig);
  const glareOpacity = useSpring(useTransform(mouseX, [-300, 0, 300], [0.15, 0, 0.15]), springConfig);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;

    const { clientX, clientY } = e;
    if (cardRef.current) {
      const { width, height, left, top } = cardRef.current.getBoundingClientRect();
      mouseX.set(clientX - (left + width / 2));
      mouseY.set(clientY - (top + height / 2));
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (reducedMotion) {
    return (
      <div className={`app__gallery-card ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={containerRef}
      dragElastic={0.15}
      dragMomentum
      onDragStart={() => {
        document.body.style.cursor = 'grabbing';
      }}
      onDragEnd={() => {
        document.body.style.cursor = 'default';
        controls.start({
          rotateX: 0,
          rotateY: 0,
          transition: { type: 'spring', ...springConfig },
        });
      }}
      style={{
        rotate: initialRotate,
        rotateX,
        rotateY,
        opacity,
        willChange: 'transform',
      }}
      animate={controls}
      whileHover={{ scale: 1.05, zIndex: 50 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`app__gallery-card active:cursor-grabbing ${className}`}
    >
      {children}
      <motion.div
        style={{ opacity: glareOpacity }}
        className="app__gallery-card-glare"
      />
    </motion.div>
  );
};

const CARD_PRESETS = [
  { className: 'slot-0', rotate: -6, zIndex: 10 },
  { className: 'slot-1', rotate: 3, zIndex: 20 },
  { className: 'slot-2', rotate: 7, zIndex: 10 },
  { className: 'slot-3', rotate: -4, zIndex: 30 },
  { className: 'slot-4', rotate: 2, zIndex: 40 },
  { className: 'slot-5', rotate: -8, zIndex: 20 },
  { className: 'slot-6', rotate: 5, zIndex: 10 },
  { className: 'slot-7', rotate: -3, zIndex: 30 },
];

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const reducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  useEffect(() => {
    const query = '*[_type == "gallery"] | order(_createdAt asc)';
    client.fetch(query).then((data) => {
      setGalleryItems(data);
    });
  }, []);

  const visibleImages = reducedMotion
    ? galleryItems.filter((item) => !item.mobileHidden).slice(0, 4)
    : galleryItems;

  return (
    <>
      <h2 className="head-text">
        Moments & <span>Memories</span>
      </h2>
      <p className="p-text app__gallery-subtitle">
        A glimpse into the moments, stories, and connections that make the journey unforgettable.
      </p>

      <div ref={containerRef} className="app__gallery-container">
        <div className="app__gallery-perspective">
          <p className="app__gallery-bg-text">
            Drag the photos to explore
          </p>

          {visibleImages.map((item, index) => {
            const preset = CARD_PRESETS[index % CARD_PRESETS.length];
            return (
              <DraggableCardBody
                key={item._id || index}
                initialRotate={preset.rotate}
                containerRef={containerRef}
                className={`${preset.className} ${item.mobileHidden ? 'mobile-hidden' : ''}`}
              >
                {item.imgUrl && (
                  <div className="app__gallery-card-inner">
                    <div className="app__gallery-card-img-wrapper">
                      <img
                        src={urlFor(item.imgUrl).url()}
                        alt={item.alt || 'Gallery image'}
                        draggable="false"
                      />
                    </div>
                  </div>
                )}
              </DraggableCardBody>
            );
          })}
        </div>
      </div>
      {!reducedMotion && (
        <p className="p-text app__gallery-drag-hint">
          Drag the photos to explore
        </p>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Gallery, 'app__gallery'),
  'gallery',
  'app__primarybg',
);
