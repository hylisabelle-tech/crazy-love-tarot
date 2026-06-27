import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoadingRitual() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [iconIndex, setIconIndex] = useState(1);
  const [textIndex, setTextIndex] = useState(1);

  useEffect(() => {
    // Flicker intervals
    const iconInterval = setInterval(() => {
      setIconIndex(prev => (prev % 5) + 1);
    }, 100);

    const textInterval = setInterval(() => {
      setTextIndex(prev => (prev % 3) + 1);
    }, 150);

    // Route after 3.5 seconds
    const routeTimer = setTimeout(() => {
      navigate('/result', { state: location.state });
    }, 3500);

    return () => {
      clearInterval(iconInterval);
      clearInterval(textInterval);
      clearTimeout(routeTimer);
    };
  }, [navigate, location.state]);

  return (
    <Box sx={{ width: '100%', height: '100vh', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
      <img 
        src={`/img_loading_0${iconIndex}.png`} 
        alt="loading icon" 
        style={{ width: '120px' }} 
      />
      <img 
        src={`/img_loading_text_0${textIndex}.png`} 
        alt="loading text" 
        style={{ width: '250px' }} 
      />
    </Box>
  );
}
