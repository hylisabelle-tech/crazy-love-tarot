import React, { useState, useEffect, useMemo } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { tarotDeck } from '../data/tarotData';

export default function PickCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, question } = location.state || {};
  const isMobile = useMediaQuery('(max-width: 1439px)');

  const [pickedCount, setPickedCount] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isParting, setIsParting] = useState(false);

  // Generate 57 scattered card positions in an Oval (Ellipse) boundary using Fermat's Spiral
  const scatteredCards = useMemo(() => {
    const cards = [];
    const n = 57;
    const goldenAngle = 137.508 * (Math.PI / 180);
    
    // Spread area based on screen (Ellipse axes)
    const spreadWidth = isMobile ? 320 : 1100;
    const spreadHeight = isMobile ? 600 : 650;

    for (let i = 0; i < n; i++) {
      // Radius goes from ~0 to 1
      const r = Math.sqrt((i + 0.5) / n);
      const theta = i * goldenAngle;
      
      const normalizedX = r * Math.cos(theta);
      const normalizedY = r * Math.sin(theta);
      
      // Scale to ellipse and add slight natural jitter
      const x = (normalizedX * (spreadWidth / 2)) + (Math.random() - 0.5) * 30;
      const y = (normalizedY * (spreadHeight / 2)) + (Math.random() - 0.5) * 30;
      
      cards.push({
        id: i,
        x: x,
        y: y,
        rotation: Math.random() * 360, // 0 to 360 degrees
        zIndex: Math.floor(Math.random() * 100),
      });
    }
    
    // 배열 순서를 랜덤하게 섞어서 zIndex나 렌더링 순서가 자연스럽도록 처리
    return cards.sort(() => Math.random() - 0.5);
  }, [isMobile]);

  useEffect(() => {
    // After 1 sec, part the cards in the middle to reveal the text
    const timer = setTimeout(() => {
      setIsParting(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePick = (id) => {
    if (selectedIndices.includes(id) || pickedCount >= 3) return;
    
    setSelectedIndices(prev => [...prev, id]);
    setPickedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (pickedCount === 3) {
      setTimeout(() => {
        const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
        navigate('/loading', { state: { category, question, cards: shuffled.slice(0, 3) } });
      }, 1000);
    }
  }, [pickedCount, navigate, category, question]);

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: '#ffffff', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Title / Counter */}
      <Box sx={{ position: 'absolute', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none' }}>
        <AnimatePresence>
          {isParting && pickedCount === 0 && (
            <motion.img 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              src="/img_pickcard_text_title.png" 
              alt="Pick 3 Cards" 
              style={{ width: isMobile ? '200px' : '300px' }}
            />
          )}
          {pickedCount > 0 && (
            <motion.div
              key={pickedCount}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <img src={`/img_num_${pickedCount}.png`} alt={`${pickedCount}`} style={{ height: isMobile ? '40px' : '60px', objectFit: 'contain' }} />
              <img src="/img_num_total3.png" alt="/ 3" style={{ height: isMobile ? '40px' : '60px', objectFit: 'contain' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Cards */}
      {scatteredCards.map((card) => {
        const isSelected = selectedIndices.includes(card.id);
        
        let animateX = card.x;
        let animateY = card.y;
        
        if (isParting && !isSelected) {
          // Push cards away from center text area
          const safeZoneX = isMobile ? 120 : 200;
          const safeZoneY = isMobile ? 60 : 100;
          if (Math.abs(card.x) < safeZoneX && Math.abs(card.y) < safeZoneY) {
            animateX = card.x > 0 ? card.x + safeZoneX : card.x - safeZoneX;
            animateY = card.y > 0 ? card.y + safeZoneY : card.y - safeZoneY;
          }
        }

        if (isSelected) {
          animateY = 1000; // Fall down
        }

        return (
          <motion.div
            key={card.id}
            initial={{ x: card.x, y: card.y, rotate: card.rotation }}
            animate={{ x: animateX, y: animateY, rotate: isSelected ? card.rotation + 180 : card.rotation }}
            transition={{ duration: isSelected ? 0.8 : 1, ease: isSelected ? "easeIn" : "easeOut" }}
            onClick={() => handlePick(card.id)}
            style={{
              position: 'absolute',
              zIndex: card.zIndex,
              width: isMobile ? '46px' : '80px',
              height: isMobile ? '69px' : '120px',
              backgroundImage: 'url(/img_tarotcard_back_01.png)',
              backgroundSize: '100% 100%', // 이미지 자체의 그림자가 잘리지 않도록 꽉 채움
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              cursor: 'pointer',
              // 이미지 자체에 그림자가 있으므로 CSS 그림자 제거 (혹은 잘림 방지)
            }}
            whileHover={{ scale: isSelected ? 1 : 1.1, zIndex: 1000 }}
          />
        );
      })}
    </Box>
  );
}
