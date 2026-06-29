import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const sampleText = `🌑 그는 나와 데이트했던 순간들을 생각하나요?
❤️ 연인 · 🖤 악마 · ⚡ 타워
네.

다만 그 기억은 '좋았던 추억' 정도로 끝난 것이 아닙니다.

❤️ 연인은 당신과 함께했던 순간이 그의 마음에 강하게 각인되었음을 보여줍니다. 그날의 대화, 분위기, 시선까지 평범한 기억으로 흘려보내지 못했을 가능성이 큽니다.

🖤 악마는 더 집요합니다.
잊으려 할수록 더 선명해지는 기억.
문득 떠오르고, 이유 없이 다시 곱씹게 되는 기억.
당신은 그에게 쉽게 지워지는 사람이 아니라, 자꾸 의식을 건드리는 사람으로 남아 있습니다.

⚡ 그리고 타워.
당신과의 데이트는 그의 감정을 흔들어 놓았습니다.
예상보다 더 깊게 스며들었고, 그래서 오히려 애써 아닌 척하려 할 수도 있습니다.
하지만 한 번 흔들린 마음은 이전으로 돌아가지 않습니다.

🖤 한 줄 리딩
그는 당신과의 데이트를 잊지 못하는 것이 아니라, 잊으려 할수록 더 선명하게 떠오르는 기억으로 간직하고 있습니다.
그런 기억은 시간이 해결해 주는 것이 아닙니다.
오히려 아무렇지 않은 어느 날, 가장 잔인하게 다시 떠오르는 법이니까요.
※ 이 해석은 러버스·데빌·타워가 상징하는 심리적 흐름을 바탕으로 풀어낸 타로 리딩입니다. 실제 상대의 생각이나 감정을 확인하는 것은 아닙니다.`;

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 1439px)');
  const { question } = location.state || { question: "질문이 없습니다." };

  const [typedText, setTypedText] = useState('');
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef(null);

  // Typewriter effect starts when user scrolls to second section
  useEffect(() => {
    if (hasScrolled) {
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(sampleText.slice(0, i));
        i++;
        if (i > sampleText.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [hasScrolled]);

  const handleScroll = (e) => {
    if (e.target.scrollTop > window.innerHeight / 2 && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  const sampleCards = [
    '/img_tarotcard_front_lovers.png',
    '/img_tarotcard_front_thedevil.png',
    '/img_tarotcard_front_tower.png'
  ];

  return (
    <Box className="scroll-container" onScroll={handleScroll} ref={containerRef} sx={{ position: 'relative' }}>
      
      {/* Sticky Navigation for Section 1 */}
      <Box sx={{ position: 'fixed', top: isMobile ? 20 : 30, left: isMobile ? 20 : 30, right: isMobile ? 20 : 30, display: 'flex', justifyContent: 'space-between', zIndex: 100 }}>
        <motion.img 
          src="/btn-home.png" 
          alt="Home" 
          onClick={() => navigate('/')} 
          whileHover={{ scale: 1.1 }} 
          style={{ width: isMobile ? '30px' : '40px', cursor: 'pointer' }} 
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <motion.img 
            src="/btn-email.png" 
            alt="Email" 
            whileHover={{ scale: 1.1 }} 
            style={{ width: isMobile ? '30px' : '40px', cursor: 'pointer' }} 
            onClick={() => alert("이메일 발송 준비중입니다.")}
          />
          <motion.img 
            src="/btn-share.png" 
            alt="Share" 
            whileHover={{ scale: 1.1 }} 
            style={{ width: isMobile ? '30px' : '40px', cursor: 'pointer' }} 
            onClick={() => alert("공유하기 준비중입니다.")}
          />
        </Box>
      </Box>

      {/* Section 1: The Cards */}
      <Box className="scroll-section" sx={{ bgcolor: '#ffffff', flexDirection: 'column', gap: isMobile ? '20px' : '40px', pt: isMobile ? '60px' : '0px' }}>
        
        {/* Category Image */}
        <img 
          src="/img_devil.png" 
          alt="Category" 
          style={{ 
            width: isMobile ? '60px' : '106px', 
            height: isMobile ? '100px' : '180px',
            objectFit: 'contain'
          }} 
        />
        
        {/* User Question */}
        <Typography 
          sx={{ 
            fontSize: isMobile ? '16px' : '24px', 
            color: '#000',
            fontWeight: 'bold',
            textAlign: 'center',
            px: '20px',
            wordBreak: 'keep-all'
          }}
        >
          {question}
        </Typography>
        
        {/* The 3 Cards */}
        <Box sx={{ display: 'flex', gap: isMobile ? 2 : 4, mb: isMobile ? 5 : 10, mt: isMobile ? 2 : 4 }}>
          {sampleCards.map((src, idx) => (
            <ParallaxCard key={idx} src={src} delay={idx * 0.3} isMobile={isMobile} />
          ))}
        </Box>

        {/* Scroll Down */}
        <motion.img 
          src="/btn_scrolldown.png"
          alt="Scroll Down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ 
            position: 'absolute', 
            bottom: isMobile ? '20px' : '50px', 
            height: isMobile ? '60px' : '80px',
            objectFit: 'contain'
          }}
        />
      </Box>

      {/* Section 2: The Reading */}
      <Box className="scroll-section" sx={{ flexDirection: isMobile ? 'column' : 'row', bgcolor: '#1a1a1a' }}>
        {/* Video Left (Top on Mobile) */}
        <Box sx={{ width: isMobile ? '100%' : '50%', height: isMobile ? '40%' : '100%' }}>
          <video 
            src="/videos/movie.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        {/* Text Right (Bottom on Mobile) */}
        <Box sx={{ width: isMobile ? '100%' : '50%', height: isMobile ? '60%' : '100%', p: isMobile ? 4 : 8, overflowY: 'auto' }}>
          <Typography variant="body1" sx={{ color: '#fff', fontSize: isMobile ? '1rem' : '1.4rem', whiteSpace: 'pre-wrap', lineHeight: 1.8, fontFamily: 'inherit' }}>
            {typedText}
          </Typography>
          
          {/* Return to Home Button */}
          {typedText.length === sampleText.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, pb: 4 }}>
              <motion.div
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/');
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 42, 85, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  padding: '16px 40px', 
                  border: '2px solid #ff2a55', 
                  borderRadius: '50px', 
                  color: '#ff2a55', 
                  cursor: 'pointer',
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}
              >
                처음으로 돌아가기
              </motion.div>
            </Box>
          )}
        </Box>
      </Box>

    </Box>
  );
}

// Simple Parallax Card Component responding to mouse movement
function ParallaxCard({ src, delay, isMobile }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable hover parallax on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        width: isMobile ? '110px' : '260px',
        height: isMobile ? '150px' : '360px',
      }}
    >
      <motion.img 
        src={src} 
        alt="Tarot Card"
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: '12px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}
      />
    </motion.div>
  );
}
