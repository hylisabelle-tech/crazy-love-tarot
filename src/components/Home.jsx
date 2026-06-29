import React, { useState, useEffect, useRef } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  // 피그마 코드를 보면 1440px 미만은 전부 모바일 뷰(node-0_6)로 처리하고 있습니다.
  const isMobile = useMediaQuery('(max-width: 1439px)');
  const [isHovered, setIsHovered] = useState(false);
  const cardControls = useAnimation();
  const [hasEntered, setHasEntered] = useState(false);
  const categoryRef = useRef(null);

  useEffect(() => {
    // 뒤로 가기 등으로 카테고리 스크롤 요청을 받았을 때 바로 스크롤
    if (location.state?.scrollToCategory && categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: 'auto' });
      // 중복 스크롤 방지를 위해 state 초기화
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const enterSequence = async () => {
      // 1초 후 카드 등장
      await cardControls.start({
        y: [-500, 0],
        opacity: [0, 1],
        transition: { delay: 1, duration: 0.8, ease: "easeOut" }
      });
      setHasEntered(true);
    };
    enterSequence();
  }, [cardControls]);

  useEffect(() => {
    if (!hasEntered) return;

    if (isHovered) {
      cardControls.stop();
      cardControls.start({
        rotateY: 180, // 앞면이 보이도록 멈춤
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
      });
    } else {
      // 2초 간격으로 앞뒤 180도 회전 재개
      cardControls.start({
        rotateY: [0, 180],
        y: [0, 0, -10, 10, 0], 
        transition: { 
          rotateY: { duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 2 },
          y: { duration: 3, ease: "easeInOut", repeat: Infinity }
        }
      });
    }
  }, [isHovered, hasEntered, cardControls]);

  const scrollToCategory = () => {
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const flickerAnimation = {
    opacity: [1, 0.8, 1, 0.9, 1, 0.5, 1],
    x: [0, -2, 2, -1, 1, 0],
    transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
  };

  return (
    <Box className="scroll-container">
      {/* Landing Section */}
      <Box 
        className="scroll-section" 
        sx={{ 
          bgcolor: '#ffffff', 
          overflow: 'hidden', 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          // Figma의 정확한 최소 사이즈 제약을 동일하게 적용
          minWidth: isMobile ? 'max(100%, 375px)' : 'max(100%, 1440px)',
          minHeight: isMobile ? 'max(100vh, 720px)' : 'max(100vh, 820px)'
        }}
      >
        
        {/* Background HA HA HA (Figma Exact Logic) */}
        {isMobile ? (
          <Box
            sx={{
              position: 'absolute',
              left: '-182px',
              right: '-183px',
              top: '-272px',
              aspectRatio: '680/785',
              zIndex: 0,
            }}
          >
            <motion.img 
              src="/img_lading_text_haha.png" 
              alt="HAHAHA"
              animate={flickerAnimation}
              style={{
                position: 'absolute',
                width: '480px',
                height: '785px',
                right: '0px',
                top: '0px',
                objectFit: 'contain',
                opacity: 0.8
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              position: 'absolute',
              width: '740px',
              height: '785px',
              left: '50%',
              top: 'calc(50% - 345.5px)',
              transform: 'translateX(-50%) translateY(-50%)',
              zIndex: 0,
            }}
          >
            <motion.img 
              src="/img_lading_text_haha.png" 
              alt="HAHAHA"
              animate={flickerAnimation}
              style={{
                position: 'absolute',
                width: '480px',
                height: '785px',
                right: '0px',
                top: '0px',
                objectFit: 'contain',
                opacity: 0.8
              }}
            />
          </Box>
        )}

        {/* Title */}
        <motion.img 
          src="/img_lading_text_title.png"
          alt="Mad-X Love Tarot"
          style={{ 
            position: 'absolute', 
            zIndex: 1, 
            width: isMobile ? '400px' : '1600px', 
            maxWidth: 'none',
            top: isMobile ? '0px' : '50%',
            left: '50%',
            transform: isMobile ? 'translateX(-50%)' : 'translate(-50%, -50%)'
          }}
        />

        {/* Tarot Card Wrapper for positioning */}
        <Box 
          sx={{
            position: 'absolute',
            zIndex: 2,
            top: isMobile ? '50%' : 'calc(50% + 29px)',
            left: isMobile ? '50%' : 'calc(50% + 190px)',
            transform: 'translate(-50%, -50%) rotate(18deg)',
            marginTop: isMobile ? '40px' : '0px'
          }}
        >
          {/* Tarot Card */}
          <motion.div
            animate={cardControls}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={scrollToCategory}
            style={{
              width: isMobile ? '280px' : '420px',
              height: isMobile ? '394px' : '591px',
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
                backgroundPosition: 'center',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
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
                backgroundPosition: 'center',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                transform: 'rotateY(180deg)'
              }}
            />
          </motion.div>
        </Box>

        {/* Scroll Down */}
        <motion.img 
          src="/btn_scrolldown.png"
          alt="Scroll Down"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          onClick={scrollToCategory}
          style={{ 
            position: 'absolute', 
            bottom: isMobile ? '30px' : '40px', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2, 
            height: isMobile ? '100px' : '150px',
            objectFit: 'contain',
            cursor: 'pointer'
          }}
        />
      </Box>

      {/* Category Section */}
      <Box 
        ref={categoryRef} 
        className="scroll-section" 
        sx={{ 
          bgcolor: '#ffffff', 
          position: 'relative', 
          overflow: 'hidden',
          minWidth: isMobile ? 'max(100%, 375px)' : 'max(100%, 1440px)',
          minHeight: isMobile ? 'max(100vh, 720px)' : 'max(100vh, 820px)'
        }}
      >
        {[
          { 
            id: 'true_feelings', 
            baseSrc: '/img_category_icon_01.png', 
            hoverSrc: '/img_category_icon_01_hover.png',
            desktop: {
              base: { width: '374px', height: '456px', left: 'calc(50% - 453px)', top: 'calc(50% + 25px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '328px', height: '365px', left: 'calc(50% - 370px)', top: 'calc(50% - 168.5px)', transform: 'translate(-50%, -50%)' }
            },
            mobile: {
              base: { width: '160px', height: '195px', left: '50%', top: 'calc(50% - 215.5px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '140px', height: '157px', left: 'calc(50% + 93.5px)', top: 'calc(50% - 234.5px)', transform: 'translate(-50%, -50%)' }
            }
          },
          { 
            id: 'obsession', 
            baseSrc: '/img_category_icon_02.png', 
            hoverSrc: '/img_category_icon_02_hover.png',
            desktop: {
              base: { width: '330px', height: '420px', left: 'calc(50% + 23px)', top: 'calc(50% - 99px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '320px', height: '360px', left: 'calc(50% + 57px)', top: 'calc(50% + 205px)', transform: 'translate(-50%, -50%)' }
            },
            mobile: {
              base: { width: '120px', height: '153px', left: '50%', top: 'calc(50% + 12.5px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '144px', height: '162px', left: 'calc(50% + 91.5px)', top: 'calc(50% - 37px)', transform: 'translate(-50%, -50%)' }
            }
          },
          { 
            id: 'reunion', 
            baseSrc: '/img_category_icon_03.png', 
            hoverSrc: '/img_category_icon_03_hover.png',
            desktop: {
              base: { width: '384px', height: '343px', left: 'calc(50% + 520px)', top: 'calc(50% + 44.5px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '357px', height: '360px', left: 'calc(50% + 533.5px)', top: 'calc(50% - 230px)', transform: 'translate(-50%, -50%)' }
            },
            mobile: {
              base: { width: '160px', height: '143px', left: '50%', top: 'calc(50% + 241.5px)', transform: 'translate(-50%, -50%)' },
              hover: { width: '167px', height: '168px', left: 'calc(50% + 80px)', top: 'calc(50% + 137px)', transform: 'translate(-50%, -50%)' }
            }
          }
        ].map((cat, i) => (
          <CategoryItem 
            key={cat.id} 
            category={cat} 
            isMobile={isMobile}
            onClick={() => navigate('/question', { state: { category: cat.id } })} 
            flickerAnimation={flickerAnimation}
            index={i}
          />
        ))}
      </Box>
    </Box>
  );
}

function CategoryItem({ category, isMobile, onClick, flickerAnimation, index }) {
  const [hover, setHover] = useState(false);
  const pos = isMobile ? category.mobile : category.desktop;

  return (
    <>
      <div
        style={{ 
          position: 'absolute', 
          zIndex: 10,
          ...pos.base
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          style={{ width: '100%', height: '100%' }}
        >
          <motion.div
            onClick={onClick}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
            whileTap={{ scale: 0.95 }}
            style={{ width: '100%', height: '100%', cursor: 'pointer' }}
          >
            <img src={category.baseSrc} alt={category.id} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </motion.div>
        </motion.div>
      </div>
      
      {/* PC에서 모바일 사이즈로 창을 줄인 상태를 대비해, 호버 시 텍스트 그래픽 무조건 표시 */}
      {hover && (
        <div style={{ position: 'absolute', zIndex: 5, pointerEvents: 'none', ...pos.hover }}>
          <motion.img 
            src={category.hoverSrc} 
            alt={`${category.id} text`}
            animate={flickerAnimation}
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </>
  );
}
