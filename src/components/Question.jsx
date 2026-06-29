import React, { useState, useRef, useEffect } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width: 1439px)');
  const [question, setQuestion] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // 페이지 진입 시 자동으로 인풋박스 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Determine category graphic
  const categoryId = location.state?.category || 'true_feelings';
  const categoryImageMap = {
    true_feelings: '/img_question_turefeelings.png',
    obsession: '/img_question_obsession.png',
    reunion: '/img_question_reunion.png'
  };
  const categoryImage = categoryImageMap[categoryId] || '/img_question_turefeelings.png';

  const handleSubmit = () => {
    if (question.trim()) {
      navigate('/pick', { state: { category: categoryId, question } });
    }
  };

  const handleSuggestionClick = (text) => {
    setQuestion(text);
  };

  const categorySuggestionsMap = {
    true_feelings: [
      "그 사람은 아직도 나를 생각할까?",
      "그 사람이 후회하고 있을까?",
      "그 사람은 나를 사랑하긴 했을까?"
    ],
    obsession: [
      "내가 먼저 연락해도 될까요?",
      "헤어진 그 사람에게 다른 사람이 생겼을까요?",
      "그는 다른 사람과 행복한가요?"
    ],
    reunion: [
      "우리는 다시 만날 수 있을까?",
      "헤어진 그 사람에게 다른 사람이 생겼을까요?",
      "그는 다른 사람과 행복한가요?"
    ]
  };
  const suggestions = categorySuggestionsMap[categoryId] || categorySuggestionsMap.true_feelings;

  const flickerAnimation = {
    opacity: [1, 0.8, 1, 0.9, 1, 0.5, 1],
    x: [0, -2, 2, -1, 1, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 2
    }
  };

  return (
    <Box 
      sx={{ 
        bgcolor: '#ffffff', 
        position: 'relative', 
        overflow: 'hidden',
        minWidth: isMobile ? 'max(100%, 375px)' : 'max(100%, 1440px)',
        minHeight: isMobile ? 'max(100vh, 720px)' : 'max(100vh, 820px)'
      }}
    >
      {/* Navigation Buttons */}
      <Box sx={{ position: 'absolute', top: isMobile ? 20 : 30, left: isMobile ? 20 : 30, display: 'flex', gap: 2, zIndex: 50 }}>
        <motion.img 
          src="/btn-home.png" 
          alt="Home" 
          onClick={() => {
            window.scrollTo(0, 0); // 홈 클릭시 랜딩(최상단)으로 가도록 보장
            navigate('/');
          }} 
          whileHover={{ scale: 1.1 }} 
          style={{ width: isMobile ? '30px' : '40px', cursor: 'pointer' }} 
        />
        <motion.img 
          src="/btn-back.png" 
          alt="Back" 
          onClick={() => navigate('/', { state: { scrollToCategory: true } })} // 명시적으로 홈으로 가되 카테고리로 스크롤
          whileHover={{ scale: 1.1 }} 
          style={{ width: isMobile ? '30px' : '40px', cursor: 'pointer' }} 
        />
      </Box>

      {/* Ductape Background */}
      {isMobile ? (
        <img 
          src="/img_ductape.png" 
          alt="" 
          style={{ 
            position: 'absolute', 
            left: '-95px', 
            right: '-96px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            width: 'calc(100% + 191px)',
            aspectRatio: '1143/317',
            objectFit: 'cover',
            pointerEvents: 'none'
          }} 
        />
      ) : (
        <img 
          src="/img_ductape.png" 
          alt="" 
          style={{ 
            position: 'absolute', 
            width: '1143px', height: '317px', 
            left: '50%', top: '50%', 
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }} 
        />
      )}

      {/* Title Text Graphic */}
      <img 
        src="/img_question_text_title.png" 
        alt="당신의 고민을 이야기해주세요" 
        style={{ 
          position: 'absolute', 
          width: isMobile ? '240px' : '790px',
          height: isMobile ? '98px' : '324px',
          left: '50%', 
          top: isMobile ? 'calc(50% - 126px)' : 'calc(50% - 193px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 2
        }} 
      />

      {/* Category Image Graphic */}
      <Box
        style={{ 
          position: 'absolute', 
          width: isMobile ? '160px' : '260px',
          height: isMobile ? '123px' : '200px',
          left: '50%', 
          top: isMobile ? 'calc(50% - 202.5px)' : 'calc(50% - 304px)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <motion.img 
          src={categoryImage} 
          alt="Category" 
          animate={flickerAnimation}
          style={{ 
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }} 
        />
      </Box>

      {/* Input Field Container */}
      <Box sx={{
        position: 'absolute',
        width: isMobile ? '375px' : '1142px',
        height: isMobile ? '104px' : 'auto',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        px: isMobile ? '24px' : '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '40px',
        zIndex: 10
      }}>
        {/* Left Side: Blinking Cursor + Input */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: '11px', height: '100%' }} onClick={() => inputRef.current?.focus()}>
          {/* 입력 시작 전까지만 깜빡이는 커서 바 표시 */}
          {question.length === 0 && (
            <Box sx={{ 
              width: '3px', 
              height: isMobile ? '58px' : '120px', 
              bgcolor: '#000', 
              flexShrink: 0,
              animation: 'blink 1s step-end infinite',
              '@keyframes blink': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0 }
              }
            }} />
          )}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <textarea
              ref={inputRef}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              placeholder="질문을 입력하세요"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontFamily: '"Inter", "Noto Sans KR", sans-serif',
                fontSize: isMobile ? '20px' : '36px',
                lineHeight: 1.4,
                color: '#000',
                padding: 0,
                margin: 0,
                height: isMobile ? '58px' : '100px',
                overflow: 'auto'
              }}
            />
          </Box>
        </Box>
        {/* Submit Button (Disabled explicitly before input) */}
        <Box 
          onClick={handleSubmit}
          sx={{ 
            width: isMobile ? '32px' : '147px', 
            height: isMobile ? '34px' : '156px', 
            flexShrink: 0, 
            cursor: question.trim() ? 'pointer' : 'default',
            pointerEvents: question.trim() ? 'auto' : 'none',
            opacity: question.trim() ? 1 : 0.5,
            transition: 'opacity 0.2s ease-in-out'
          }}
        >
          <img src="/btn-go.png" alt="Submit" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </Box>
      </Box>

      {/* Suggested Questions Marquee / List */}
      <Box sx={{
        position: 'absolute',
        left: isMobile ? '0px' : 'calc(50% + 4px)',
        right: isMobile ? '-3px' : 'auto',
        top: isMobile ? 'calc(50% + 170px)' : 'calc(50% + 246px)',
        transform: isMobile ? 'translateY(-50%)' : 'translate(-50%, -50%)',
        width: isMobile ? 'auto' : '388px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '7px',
        zIndex: 5
      }}>
        {suggestions.map((text, i) => (
          <Box 
            key={i} 
            onClick={() => handleSuggestionClick(text)}
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: isMobile ? '10px' : '16px',
              cursor: 'pointer',
              width: '100%',
              '&:hover p': { 
                textDecoration: 'underline',
                textDecorationColor: '#ff2a55',
                textDecorationThickness: '2px',
                textUnderlineOffset: '4px'
              }
            }}
          >
            <img src="/img_bullet.png" alt="*" style={{ width: isMobile ? '24px' : '36px', height: isMobile ? '24px' : '36px', flexShrink: 0 }} />
            <p style={{
              fontFamily: '"Inter", "Noto Sans KR", sans-serif',
              fontSize: isMobile ? '16px' : '24px',
              color: '#000',
              margin: 0,
              whiteSpace: 'nowrap',
              textAlign: 'center',
              transition: 'opacity 0.2s'
            }}>
              {text}
            </p>
            <img src="/img_division.png" alt="+" style={{ width: isMobile ? '24px' : '53px', height: isMobile ? '19px' : '42px', flexShrink: 0 }} />
          </Box>
        ))}
      </Box>

    </Box>
  );
}

export default Question;
