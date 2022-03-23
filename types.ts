import StaticImageData from 'next/image';

export enum ICONS {
  CODE = 'CODE',
  KEYBOARD = 'KEYBOARD',
  SOCIALS = 'SOCIALS',
  GRAPHQL = 'GRAPHQL',
  REACT = 'REACT',
  NEXTJS = 'NEXTJS',
  TYPESCRIPT = 'TYPESCRIPT',
  JAVASCRIPT = 'JAVASCRIPT',
}

export enum ICONSCOLORS {
  REACT = '#61dafb',
  GRAPHQL = '#e10098',
  NEXTJS = '#111111',
  TYPESCRIPT = '#3178c6',
  JAVASCRIPT = '#f7df1e',
}

export enum SPOTLIGHT {
  TECH = 'LATEST_TECHNOLOGIES',
  COMPANIES = 'COMPANIES',
}

export enum THEMES {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export type Service = {
  title: string;
  copy: string;
  icon: ICONS;
};

export type Testimonial = {
  copy: string;
  quotee: {
    name: string;
    jobTitle: string;
    company: string;
    image: StaticImageData;
  };
};

export type UseFormValues = {
  email: string;
  chilliIsCool: string;
};

export type PostFrontMatter = {
  title: string;
  date: string;
  tags: string[];
  category: string;
  slug: string;
  image: string;
  published: boolean;
  canonical_url: string;
  description: string;
};

export type Post = {
  data: { [key: string]: any };
  content?: string;
};
