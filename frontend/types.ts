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
  ref: React.RefObject<HTMLHeadingElement>;
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

export interface PostGridDataSourceProps {
  posts: Post[];
  pageCount: number;
  pageNumber: number;
  pageQueries?: {
    page: string;
    queries: string[];
  };
}

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
  latestPosts: Post[];
  latestYouTubeVideo: LatestVideo['items'][0];
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
  latestYouTubeVideo: LatestVideo['items'][0];
  postType: POSTTYPES;
}

export interface BlogNewsletterProps extends PostGridPageProps, PostPageProps {
  isPostGridPage: boolean;
  fallback: {
    [key: string]: PostGridDataSourceProps;
  };
}

export interface BlogNewsletterParams extends ParsedUrlQuery {
  slug: string[];
}

export type Company = {
  icon: typeof import('*.svg');
  alt: string;
  invertDark: boolean;
};

export type LatestVideo = {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
        standard: {
          url: string;
          width: number;
          height: number;
        };
        maxres: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      categoryId: string;
      liveBroadcastContent: string;
      localized: {
        title: string;
        description: string;
      };
      defaultAudioLanguage: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: false;
      contentRating: { [key: string]: string };
      projection: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
  pageInfo: { totalResults: number; resultsPerPage: number };
};
