import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { tarotDeck } from '../data/tarotData';

export default function PickCard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category, question } = location.state || {};

  const [pickedCount, setPickedCount] = useState(0);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isParting, setIsParting] = useState(false);

  // Generate 57 scattered card positions once
  const scatteredCards = useMemo(() => {
    const cards = [];
    for (let i = 0; i < 57; i++) {
      cards.push({
        id: i,
        // Random position spread across the screen
        x: (Math.random() - 0.5) * 800, // -400 to 400
        y: (Math.random() - 0.5) * 600, // -300 to 300
        rotation: (Math.random() - 0.5) * 180, // -90 to 90 degrees
        zIndex: Math.floor(Math.random() * 100),
      });
    }
    return cards;
  }, []);

  useEffect(() => {
    // After 1 sec, part the cards in the middle
    const timer = setTimeout(() => {
      setIsParting(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePick = (id) => {
    if (selectedIndices.includes(id) || pickedCount >= 3) return;
    
    // Play paper sound if we had it
    // const audio = new Audio('/sound_flip.mp3'); audio.play();

    setSelectedIndices(prev => [...prev, id]);
    setPickedCount(prev => prev + 1);
  };

  useEffect(() => {
    if (pickedCount === 3) {
      setTimeout(() => {
        // Randomly pick 3 cards from the deck for now since we don't map all 57 visually yet
        const shuffled = [...tarotDeck].sort(() => 0.5 - Math.random());
        navigate('/loading', { state: { category, question, cards: shuffled.slice(0, 3) } });
      }, 1000); // wait for falling animation
    }
  }, [pickedCount, navigate, category, question]);

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: '#ffffff', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Title / Counter */}
      <Box sx={{ position: 'absolute', zIndex: 200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AnimatePresence>
          {isParting && pickedCount === 0 && (
            <motion.img 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              src="/img_pickcard_text_title.png" 
              alt="Pick 3 Cards" 
              style={{ width: '300px' }}
            />
          )}
          {pickedCount > 0 && (
            <motion.div
              key={pickedCount}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: '#ff2a55', fontSize: '4rem', textShadow: '2px 2px 0 #000' }}
            >
              {pickedCount} / 3
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Cards */}
      {scatteredCards.map((card) => {
        const isSelected = selectedIndices.includes(card.id);
        
        // Parting logic: if parting is true, move cards away from center (0,0)
        let animateX = card.x;
        let animateY = card.y;
        
        if (isParting && !isSelected) {
          // Push cards away from center X if they are too close
          if (Math.abs(card.x) < 150 && Math.abs(card.y) < 100) {
            animateX = card.x > 0 ? card.x + 200 : card.x - 200;
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
              width: '120px',
              height: '180px',
              backgroundImage: 'url(/img_tarotcard_back_01.png)',
              backgroundSize: 'cover',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
            whileHover={{ scale: isSelected ? 1 : 1.1, zIndex: 1000 }}
          />
        );
      })}
    </Box>
  );
}
