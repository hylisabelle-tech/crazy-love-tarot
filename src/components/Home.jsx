import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cardControls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Initial drop and rotate sequence for the card
    const sequence = async () => {
      await cardControls.start({
        y: [-500, 0],
        opacity: [0, 1],
        transition: { delay: 0.3, duration: 0.8, ease: "easeOut" }
      });
      // Infinite rotate with idle pause
      cardControls.start({
        rotateY: [0, 360, 360],
        y: [0, 0, -10, 10, 0], // subtle shaking idle
        transition: { 
          rotateY: { duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 },
          y: { duration: 3, ease: "easeInOut", repeat: Infinity }
        }
      });
    };
    sequence();
  }, [cardControls]);

  const handleScroll = (e) => {
    if (e.target.scrollTop > 50 && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  const flickerAnimation = {
    opacity: [1, 0.8, 1, 0.9, 1, 0.5, 1],
    x: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
  };

  return (
    <Box className="scroll-container" onScroll={handleScroll}>
      {/* Landing Section */}
      <Box className="scroll-section" sx={{ bgcolor: '#ffffff', overflow: 'hidden' }}>
        {/* Background HA HA HA */}
        <motion.img 
          src="/img_lading_text_haha.png" 
          alt="HAHAHA"
          animate={hasScrolled ? { y: -1000, opacity: 0 } : flickerAnimation}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', height: '100vh', objectFit: 'cover', zIndex: 0 }}
        />

        {/* Title */}
        <motion.img 
          src="/img_lading_text_title.png"
          alt="Mad-X Love Tarot"
          animate={hasScrolled ? { opacity: 0 } : { opacity: 1 }}
          style={{ position: 'absolute', zIndex: 1, width: '80%', maxWidth: '800px' }}
        />

        {/* Tarot Card */}
        <motion.div
          animate={cardControls}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          style={{
            position: 'relative',
            zIndex: 2,
            width: '250px',
            height: '380px',
            cursor: 'pointer',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Card Back */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundImage: 'url(/img_tarotcard_back_01.png)',
              backgroundSize: 'cover',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
            animate={{ rotateY: isHovered ? 180 : 0 }}
            transition={{ duration: 0.6 }}
          />
          {/* Card Front */}
          <motion.div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              backgroundImage: 'url(/img_tarotcard_front_01.png)',
              backgroundSize: 'cover',
              borderRadius: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              transform: 'rotateY(180deg)'
            }}
            animate={{ rotateY: isHovered ? 0 : -180 }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Scroll Down */}
        <motion.img 
          src="/btn_scrolldown.png"
          alt="Scroll Down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '50px', zIndex: 2, height: '80px' }}
        />
      </Box>

      {/* Category Section */}
      <Box className="scroll-section" sx={{ bgcolor: '#ffffff' }}>
        <Box sx={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
          {[
            { id: 'true_feelings', base: '/img_category_icon_01.png', hover: '/img_category_icon_01_hover.png' },
            { id: 'obsession', base: '/img_category_icon_02.png', hover: '/img_category_icon_02_hover.png' },
            { id: 'reunion', base: '/img_category_icon_03.png', hover: '/img_category_icon_03_hover.png' }
          ].map((cat, i) => (
            <CategoryItem key={cat.id} category={cat} onClick={() => navigate('/question', { state: { category: cat.id } })} flickerAnimation={flickerAnimation} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function CategoryItem({ category, onClick, flickerAnimation }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <img src={category.base} alt={category.id} style={{ width: '150px' }} />
      {hover && (
        <motion.img 
          src={category.hover} 
          alt={`${category.id} text`}
          animate={flickerAnimation}
          style={{ position: 'absolute', top: '100%', width: '180px', marginTop: '10px' }}
        />
      )}
    </motion.div>
  );
}
