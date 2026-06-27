import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const exampleQuestions = {
  true_feelings: [
    "내가 먼저 연락해도 될까요?",
    "헤어진 사람에게 다른 사람이 생겼을까요?",
    "그는 다른 사람과 행복한가요?"
  ],
  obsession: [
    "그 사람은 나를 어떻게 생각하나요?",
    "우리의 관계는 어떻게 될까요?",
    "나에게 숨기고 있는 비밀이 있나요?"
  ],
  reunion: [
    "우리가 다시 만날 수 있을까요?",
    "언제쯤 재회할 수 있을까요?",
    "재회를 위해 내가 해야 할 일은?"
  ]
};

export default function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || 'true_feelings';
  
  const [question, setQuestion] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    navigate('/pick', { state: { category, question } });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const catIconMap = {
    true_feelings: '/img_category_icon_01.png',
    obsession: '/img_category_icon_02.png',
    reunion: '/img_category_icon_03.png'
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', pt: 10 }}>
      {/* Navigation */}
      <Box sx={{ position: 'absolute', top: 30, left: 30, display: 'flex', gap: 2 }}>
        <motion.img 
          src="/btn-home.png" 
          alt="Home" 
          onClick={() => navigate('/')} 
          whileHover={{ scale: 1.1 }} 
          style={{ width: '40px', cursor: 'pointer' }} 
        />
        <motion.img 
          src="/btn-back.png" 
          alt="Back" 
          onClick={() => navigate(-1)} 
          whileHover={{ scale: 1.1 }} 
          style={{ width: '40px', cursor: 'pointer' }} 
        />
      </Box>

      {/* Category Icon */}
      <img src={catIconMap[category]} alt={category} style={{ width: '100px', marginBottom: '20px' }} />

      {/* Title */}
      <img src="/img_question_text_title.png" alt="Type ur question" style={{ width: '300px', marginBottom: '40px' }} />

      {/* Input Area (Duct Tape) */}
      <Box sx={{ position: 'relative', width: '90%', maxWidth: '700px', height: '120px', mb: 6 }}>
        <img src="/img_ductape.png" alt="Duct Tape" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="질문을 입력하세요."
          value={question}
          onChange={(e) => setQuestion(e.target.value.slice(0, 100))}
          onKeyDown={handleKeyDown}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            transform: 'translateY(-50%)',
            width: '65%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '1.5rem',
            fontFamily: 'inherit',
            color: '#000'
          }}
        />
        <motion.img 
          src="/btn-go.png" 
          alt="Go" 
          onClick={handleSubmit}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '8%',
            transform: 'translateY(-50%)',
            width: '60px',
            cursor: 'pointer'
          }}
        />
      </Box>

      {/* Example Questions */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {exampleQuestions[category].map((ex, i) => (
          <React.Fragment key={i}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', '&:hover': { bgcolor: '#ff2a55', color: '#fff' }, px: 2, py: 1, borderRadius: 1, transition: '0.2s' }}
              onClick={() => {
                setQuestion(ex);
                handleSubmit();
              }}
            >
              <img src="/img_bullet.png" alt="bullet" style={{ width: '15px' }} />
              <Typography sx={{ fontFamily: 'inherit', fontSize: '1.2rem' }}>{ex}</Typography>
            </Box>
            {i < 2 && <img src="/img_division.png" alt="division" style={{ width: '40px' }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
