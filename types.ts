import { ApolloError } from '@apollo/client';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import StaticImageData from 'next/image';
import { ParsedUrlQuery } from 'querystring';

export enum THEMES {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export enum POSTTYPES {
  BLOG = 'blog',
  NEWSLETTER = 'newsletter',
}

export type Icons = {
  [key: string]: { name: string; color?: string; invertDark?: boolean };
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
  UUID: string;
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

export interface PostGridPageProps {
  pageNumber: number;
  pageCount: number;
  testimonials: Testimonial[];
  posts: Post[];
  tagsCats: PostTagsCats;
  filterItem: string;
  postType: POSTTYPES;
  pageHeroData: {
    title: string;
    body: string;
  };
  metaDescription: string;
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
