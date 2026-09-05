export const SECTIONS = [
  { id: 'home', nav: '소개', title: '소개' },
  { id: 'profile', nav: '인적사항', title: '기본 인적사항' },
  { id: 'career', nav: '진로활동', title: '진로 활동' },
  { id: 'competence', nav: '역량', title: '역량' },
  { id: 'work', nav: '프로젝트', title: '프로젝트' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
