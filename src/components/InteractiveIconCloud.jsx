import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Cloud } from 'react-icon-cloud';
import { urlFor } from '../client';

export const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingTop: 10,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 1,
    activeCursor: 'default',
    tooltip: 'native',
    initial: [0.05, -0.05],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: '#0000',
    maxSpeed: 0.02,
    minSpeed: 0.01,
  },
};

export function IconCloud({ skills }) {
  const [renderedSkills, setRenderedSkills] = useState([]);

  useEffect(() => {
    let active = true;
    const generateIcons = async () => {
      const promises = skills.map((skill) => {
        const iconUrl = urlFor(skill.icon);
        const bgColor = skill.bgColor || '#fef4f5';

        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 150; // High resolution for crisp rendering
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // Draw circular background
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = bgColor;
            ctx.fill();

            // Draw icon image centered at 50% scale
            const imgSize = size * 0.5;
            const imgX = (size - imgSize) / 2;
            const imgY = (size - imgSize) / 2;
            ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

            resolve({
              name: skill.name,
              dataUrl: canvas.toDataURL(),
            });
          };
          img.onerror = () => {
            // Fallback: draw circle background only
            const canvas = document.createElement('canvas');
            const size = 150;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.fillStyle = bgColor;
            ctx.fill();
            resolve({
              name: skill.name,
              dataUrl: canvas.toDataURL(),
            });
          };
          img.src = iconUrl;
        });
      });

      const list = await Promise.all(promises);
      if (active) {
        setRenderedSkills(list);
      }
    };

    if (skills && skills.length > 0) {
      generateIcons();
    }
    return () => {
      active = false;
    };
  }, [skills]);

  if (renderedSkills.length === 0) {
    return <div className="p-text">Loading cloud...</div>;
  }

  return (
    <Cloud containerProps={cloudProps.containerProps} options={cloudProps.options}>
      {renderedSkills.map((skill) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a
          key={skill.name}
          href="#"
          onClick={(e) => e.preventDefault()}
          title={skill.name}
        >
          <img
            src={skill.dataUrl}
            alt={skill.name}
            style={{ width: '40px', height: '40px' }}
          />
        </a>
      ))}
    </Cloud>
  );
}
