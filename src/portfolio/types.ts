export type Fact = {
  id: string;
  label: string;
  value: string;
};

export type Interest = {
  id: string;
  title: string;
  body: string;
  tags: string;
};

export type Aim = {
  id: string;
  kind: string;
  title: string;
  org: string;
  reason: string;
};

export type Course = {
  id: string;
  term: string;
  subject: string;
  title: string;
  summary: string;
};

export type Club = {
  id: string;
  term: string;
  name: string;
  role: string;
  summary: string;
};

export type Lang = {
  id: string;
  name: string;
  level: string;
  note: string;
};

export type Project = {
  id: string;
  period: string;
  title: string;
  role: string;
  summary: string;
  stack: string;
  link: string;
};

export type Portfolio = {
  meta: {
    name: string;
    nameEn: string;
    role: string;
    intro: string;
    year: string;
  };
  profile: Fact[];
  interests: Interest[];
  aims: Aim[];
  courses: Course[];
  clubs: Club[];
  langs: Lang[];
  projects: Project[];
};

export type ListKey = 'profile' | 'interests' | 'aims' | 'courses' | 'clubs' | 'langs' | 'projects';
