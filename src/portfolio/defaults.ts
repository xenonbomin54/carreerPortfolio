import type { Portfolio } from './types';

export const uid = () => Math.random().toString(36).slice(2, 10);

export const defaultPortfolio: Portfolio = {
  meta: {
    name: '김보민',
    nameEn: 'Kim Bomin',
    role: '웹 풀스택',
    intro:
      '화면에 보이는 것부터 서버 너머의 로직까지, 전체 흐름을 이해하고 만들어내는 것을 좋아합니다.',
    year: '2026',
  },
  profile: [
    { id: uid(), label: '생년월일', value: '2010. 07. 27.' },
    { id: uid(), label: '재학', value: '선린인터넷고등학교 소프트웨어과 1학년' },
    { id: uid(), label: '거주지', value: '서울 동대문구' },
    { id: uid(), label: '이메일', value: 'xenonbomin54@gmail.com' },
    { id: uid(), label: 'GitHub', value: 'github.com/xenonbomin54' },
    {
      id: uid(),
      label: '한 줄',
      value: '막히면 우회로를 찾습니다. 서버가 자꾸 잠들길래 깨우는 서버를 하나 더 띄웠습니다.',
    },
  ],
  interests: [
    {
      id: uid(),
      title: '여러 명이 같이 쓰는 서비스',
      body: '만들어 놓고 보니 TimeHub도 SQUARE도 DEBATE!도 전부 여러 명이 붙어야 돌아가는 것이었습니다. 우연 반 의도 반이었는데, 혼자 쓰는 도구보다 사람이 모이는 쪽을 만들 때 더 재밌었습니다.',
      tags: '웹 서비스, 멀티유저',
    },
    {
      id: uid(),
      title: 'LLM 붙여 보기',
      body: '디스코드 봇 NowChat에 NVIDIA NIM API를 연결하면서 처음 다뤄 봤습니다. 사용자마다 대화를 따로 기억하게 만드는 부분이 특히 재밌었고, 앞으로도 계속 써 볼 생각입니다.',
      tags: 'LLM, API 연동',
    },
    {
      id: uid(),
      title: '모르면 찾아서 굴리기',
      body: 'memoUSB를 배포할 때는 Render를 몰라서 무료 도메인을 검색해 붙였습니다. 나중에 NowChat을 Render에 올리면서는 무료 플랜이 잠든다는 걸 알게 돼, 깨워 두는 서버를 하나 더 띄웠습니다. 방법을 몰라도 일단 굴러가게는 만들어 놓는 편입니다.',
      tags: '배포, 문제 해결',
    },
  ],
  aims: [
    {
      id: uid(),
      kind: '직업',
      title: '앱 개발자',
      org: '모바일',
      reason:
        '웹으로 만든 걸 손에 들고 쓰게 만들고 싶습니다. 지금은 React Native로 옮겨 보는 중입니다.',
    },
    {
      id: uid(),
      kind: '직업',
      title: '서비스 개발자',
      org: '웹 서비스',
      reason:
        '혼자 쓰는 도구보다 여러 명이 같이 쓰는 걸 만들 때 더 재밌었습니다. 링크 하나로 일정을 모으는 TimeHub, 글이 쌓이는 SQUARE처럼 사람이 붙는 쪽을 만들고 싶습니다.',
    },
    {
      id: uid(),
      kind: '학과',
      title: '컴퓨터공학과',
      org: '1지망',
      reason:
        '만들다 막히는 지점이 대부분 기초에서 왔습니다. 자료구조와 운영체제를 정식으로 배우고 싶습니다.',
    },
    {
      id: uid(),
      kind: '학과',
      title: '소프트웨어학과',
      org: '2지망',
      reason:
        '고등학교에서 하던 걸 이어서 더 깊이 하고 싶습니다. 만들어 본 경험이 쌓여 있는 쪽이라 붙는 속도도 빠를 것 같습니다.',
    },
  ],
  courses: [
    {
      id: uid(),
      term: '2026',
      subject: '수강',
      title: '전공 과목',
      summary:
        '1학기 — 프로그래밍, 컴퓨터구조, 정보통신. 2학기 — 웹프로그래밍, 자료구조, 컴퓨터시스템일반.',
    },
    {
      id: uid(),
      term: '2026 1학기',
      subject: '프로그래밍',
      title: '미래 기술 상상해 발표하기',
      summary: '앞으로 나올 법한 기술을 정해 논리적으로 이야기를 만들고 발표했습니다.',
    },
    {
      id: uid(),
      term: '2026 1학기',
      subject: '프로그래밍',
      title: '문제 추상화와 컴퓨팅 사고력',
      summary: '주어진 문제를 추상화해 컴퓨팅 사고력으로 풀어내는 과정을 다뤘습니다.',
    },
  ],
  clubs: [
    {
      id: uid(),
      term: '2026 – 현재',
      name: '웹앱개발동아리 TAPIE',
      role: '프론트엔드',
      summary:
        '프론트엔드 파트에 여러 명이 함께 있고, 디자인은 파트가 따로 나뉘어 있습니다. 백엔드는 별도 파트를 두지 않습니다.',
    },
    {
      id: uid(),
      term: '2026',
      name: '소프트웨어 나눔축제',
      role: '수업자',
      // 무엇을 누구에게 가르쳤는지 아직 못 들었다.
      summary: '',
    },
  ],
  langs: [
    {
      id: uid(),
      name: 'TypeScript',
      level: '주로 사용',
      note: 'GitTier, TimeHub, DEBATE! 를 React와 함께 타입스크립트로 작업했습니다.',
    },
    {
      id: uid(),
      name: 'JavaScript',
      level: '주로 사용',
      note: '프레임워크 없이 순수 자바스크립트로 만든 프로젝트가 여럿 있습니다. memoUSB, portfolioXenon, SQUARE.',
    },
    {
      id: uid(),
      name: 'HTML / CSS',
      level: '주로 사용',
      note: 'CSS 애니메이션과 반응형 레이아웃을 직접 작성합니다.',
    },
    {
      id: uid(),
      name: 'Python',
      level: '다룰 수 있음',
      note: '디스코드 봇 NowChat을 만들며 외부 API 연동과 스레드를 다뤄 봤습니다.',
    },
    {
      id: uid(),
      name: 'React Native',
      level: '학습 중',
      note: '웹에서 모바일로 넓혀 보는 중입니다.',
    },
  ],
  projects: [
    {
      id: uid(),
      period: '2026. 07 – 2026. 08',
      title: 'GitTier',
      role: '개인 프로젝트',
      summary:
        '깃허브 사용자명만 넣으면 공개 활동을 분석해 브론즈부터 챌린저까지 8단계 티어로 보여 주는 웹앱입니다. 백엔드 없이 브라우저에서 GitHub 공개 API를 직접 부르고, 점수를 항목별로 쪼개 왜 그 티어가 나왔는지 화면에서 바로 설명되게 했습니다.',
      stack: 'TypeScript, React, GitHub REST API',
      link: 'https://github.com/xenonbomin54/GitTier',
    },
    {
      id: uid(),
      period: '2026. 07',
      title: 'TimeHub',
      role: '개인 프로젝트',
      summary:
        '로그인 없이 링크 하나로 모임 시간을 맞추는 일정 조율 서비스입니다. 방을 만들어 링크를 공유하면 참여자가 안 되는 시간만 체크하고, 전체를 종합해 가장 적합한 시간을 추천합니다.',
      stack: 'React 19, TypeScript, Firebase, Vite',
      link: 'https://github.com/xenonbomin54/TimeHUB',
    },
    {
      id: uid(),
      period: '2026. 07',
      title: 'NowChat',
      role: '개인 프로젝트',
      summary:
        '멘션하면 대답하는 디스코드 챗봇입니다. NVIDIA NIM API로 답을 만들고, 사용자별로 대화 내용을 따로 기억하게 했습니다. 무료 호스팅이 요청이 없으면 잠들어 버려서, 헬스체크용 웹서버를 백그라운드 스레드로 같이 띄워 봇이 계속 깨어 있도록 했습니다.',
      stack: 'Python, discord.py, NVIDIA NIM API, Render',
      link: 'https://github.com/xenonbomin54/NowChat',
    },
    {
      id: uid(),
      period: '2026. 05 – 2026. 06',
      title: 'DEBATE!',
      role: '개인 프로젝트',
      summary:
        '토론하고 싶은 사람들을 위한 공간입니다. 주제를 정해 여는 토론장 「광장」, 의견을 모으는 설문 「항아리」, 개인 대화를 주고받는 「비둘기」 세 가지로 구성했습니다.',
      stack: 'React, TypeScript',
      link: 'https://github.com/xenonbomin54/DEBATE',
    },
    {
      id: uid(),
      period: '2025. 12 – 2026. 06',
      title: 'SQUARE',
      role: '개인 프로젝트',
      summary:
        'Supabase로 인증과 데이터베이스를 붙인 미니멀 커뮤니티입니다. 회원가입과 로그인부터 글 작성, 실시간 피드까지 프레임워크 없이 순수 자바스크립트로 만들었습니다.',
      stack: 'JavaScript, Supabase (Auth, DB)',
      link: 'https://github.com/xenonbomin54/SQUARE',
    },
    {
      id: uid(),
      period: '2026. 02 – 2026. 03',
      title: 'portfolioXenon',
      role: '개인 프로젝트',
      summary:
        'Hammer.js로 스와이프 제스처를 붙인 포트폴리오 사이트입니다. 핵심 로직은 외부 프레임워크 없이 순수 자바스크립트로 작성해 가볍게 유지했습니다.',
      stack: 'JavaScript, Hammer.js',
      link: 'https://github.com/xenonbomin54/portfolioXenon',
    },
    {
      id: uid(),
      period: '2026. 01 – 2026. 03',
      title: 'memoUSB',
      role: '개인 프로젝트',
      summary:
        '프레임워크 없이 자바스크립트와 CSS 애니메이션만으로 만든 웹 메모장입니다. localStorage를 써서 새로고침하거나 창을 닫아도 메모가 남습니다.',
      stack: 'JavaScript, CSS Animation, localStorage',
      link: 'http://memousb.kro.kr',
    },
    {
      id: uid(),
      period: '2025. 02 – 2025. 03',
      title: 'Peoria',
      role: '개인 프로젝트',
      summary:
        '커뮤니티 서비스를 구상하며 랜딩 페이지와 게시판 API를 함께 만든 작업입니다. Express로 글 목록·조회·작성·수정·삭제 라우트를 직접 짜면서 REST API 구조를 처음 잡아 봤습니다. 데이터베이스는 붙이지 않고 메모리에 저장하는 단계까지 만들었습니다.',
      stack: 'JavaScript, Node.js, Express',
      link: 'https://github.com/xenonbomin54/xenonbomin54.github.io',
    },
  ],
};
