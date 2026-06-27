export const tarotDeck = [
  {
    id: 'the_fool',
    name: '광대 (The Fool)',
    image: '/tarotcard.jpeg',
    interpretations: {
      reunion: '통제할 수 없는 감정의 소용돌이. 이 관계는 이성적인 판단보다는 충동에 이끌리고 있습니다. 파멸이든 구원이든, 몸을 던져야만 결말을 알 수 있습니다.',
      new_face: '위험하고 매혹적인 누군가가 당신의 삶에 뛰어듭니다. 안전벨트는 없습니다. 그저 이 아찔한 추락을 즐기세요.',
      breakup: '지독했던 집착에서 마침내 해방되었습니다. 상처입은 마음은 광기로 변할지, 자유로 변할지 오직 당신의 선택에 달렸습니다.',
    },
  },
  {
    id: 'the_lovers',
    name: '연인 (The Lovers)',
    image: '/tarotcard.jpeg', // Temporary due to quota
    interpretations: {
      reunion: '서로를 파괴하면서도 결코 놓지 못하는 지독한 갈증. 거부할 수 없는 이끌림이 다시 두 사람을 얽매려 합니다.',
      new_face: '운명적이고도 파괴적인 사랑이 다가옵니다. 서로의 상처를 핥아주는, 위험할 정도로 깊은 교감이 시작될 것입니다.',
      breakup: '우리는 서로에게 독이었습니다. 가슴 아픈 절단이지만, 살기 위해서는 썩어가는 팔을 잘라내야만 합니다.',
    },
  },
  {
    id: 'the_star',
    name: '별 (The Star)',
    image: '/tarotcard.jpeg', // Temporary due to quota
    interpretations: {
      reunion: '어둠 속에서 깜빡이는 위태로운 희망. 연락이 닿을 실낱같은 가능성이 보이지만, 그것이 빛일지 불꽃일지는 아직 모릅니다.',
      new_face: '당신의 어두운 세계를 밝혀줄 단 하나의 구원자. 하지만 그 빛을 독점하려는 당신의 집착을 조심하세요.',
      breakup: '고통의 끝에서 얻은 잔혹한 평온. 당신의 눈물로 씻어낸 상처 위로, 차갑고도 아름다운 새 살이 돋아나고 있습니다.',
    },
  },
];

export const categories = [
  { id: 'reunion', label: '재회', icon: '🔄' },
  { id: 'new_face', label: '뉴페이스', icon: '✨' },
  { id: 'breakup', label: '이별', icon: '💔' },
];
