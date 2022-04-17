import StaticImageData from 'next/image';

export enum SPOTLIGHT {
  TECH = 'LATEST_TECHNOLOGIES',
  COMPANIES = 'COMPANIES',
}

export enum THEMES {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum POSTTYPES {
  BLOG = 'blog',
  NEWSLETTER = 'newsletter',
}

export type Icons = {
  [key: string]: { name: string; color?: string };
};

export type Service = {
  title: string;
  copy: string;
  icon: string;
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
  firstName?: string;
  lastName?: string;
  message?: string;
};

export type PostFrontMatter = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  slug: string;
  image: string;
  published: boolean;
  canonical_url: string;
  description: string;
  timeToRead: number;
};

export type PostHeading = {
  text: string;
  level: number;
  link: string;
};

export type Post = {
  data: PostFrontMatter;
  content?: string;
  headings?: PostHeading[];
  filePath?: string;
};

export type PostTags = {
  [key: string]: {
    name: string;
    link: string;
    colors: {
      active: {
        bg: string;
        text: string;
      };
      nonActive: {
        bg: string;
        text: string;
        border: string;
      };
    };
  };
};

export type PostCategories = {
  [key: string]: {
    name: string;
    link: string;
  };
};

export type PostTagsCats = {
  tags: string[];
  categories: string[];
};
