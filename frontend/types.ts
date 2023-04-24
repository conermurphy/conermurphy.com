// import { ApolloError } from '@apollo/client';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { ParsedUrlQuery } from 'querystring';

export enum THEMES {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum POSTTYPES {
  BLOG = 'blog',
  NEWSLETTER = 'newsletter',
  TECHNICAL_WRITING = 'technical-writing',
  VIDEO = 'video',
}

export type Icon = {
  name: string;
  color?: string;
  invertDark?: boolean;
};

export type Icons = {
  [key: string]: Icon;
};

export type Service = {
  title: string;
  copy: string;
  icon: string;
};

export type Project = {
  title: string;
  description: string;
  image: string;
  isFeatured: boolean;
  url: string;
  githubUrl?: string;
  technologies: string[];
};

export type Testimonial = {
  copy: string;
  quotee: {
    name: string;
    jobTitle: string;
    company: string;
    image: string;
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
  UUID: string;
  id: number;
  title: string;
  date: string;
  topics: string[];
  slug: string;
  image: string;
  published: boolean;
  canonical_url: string;
  description: string;
  timeToRead: number;
  imageLink: string;
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

export type Topics = {
  [key: string]: {
    name: string;
    link: string;
    icon?: Icon;
  };
};

export interface PostGridPageProps {
  pageNumber: number;
  pageCount: number;
  testimonials: Testimonial[];
  posts: Post[];
  topics: string[];
  filterItem: string;
  postType: POSTTYPES;
  pageHeroData: {
    title: string;
    body: string;
  };
  metaDescription: string;
  pageQueries?: { page: string; queries: string[] };
}

export interface PostPageProps {
  post: {
    content: MDXRemoteSerializeResult;
    data: PostFrontMatter;
    headings: PostHeading[];
    filePath: string;
  };
  latestPosts: Post[];
  postType: POSTTYPES;
}

export interface BlogNewsletterProps extends PostGridPageProps, PostPageProps {
  isPostGridPage: boolean;
}

export interface BlogNewsletterParams extends ParsedUrlQuery {
  slug: string[];
}

export type EngagementCountData = {
  viewCount: number;
  UUID: string;
};

export type EngagementCount = {
  data: EngagementCountData;
  loading: boolean;
  error: ApolloError | undefined;
};

export interface EngagementCounterProps {
  UUID: string;
  postType: POSTTYPES;
  slug: string;
}

export type Company = {
  icon: typeof import('*.svg');
  alt: string;
  invertDark: boolean;
};
