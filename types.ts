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
  REACT = 'hsl(193, 95%, 68%)',
  GRAPHQL = 'hsl(319, 100%, 44%)',
  NEXTJS = 'hsl(0, 0%, 7%)',
  TYPESCRIPT = 'hsl(211, 60%, 48%)',
  JAVASCRIPT = 'hsl(53, 93%, 54%)',
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
};

export type Post = {
  data: { [key: string]: any };
  content?: string;
};

// This type is used for passing posts to LatestPosts component and blog page because we can more strictly type the frontmatter in data. Where the Post type above can't as it's being compared to the data from the gray-matter package.
export type PostWithFrontmatter = {
  data: PostFrontMatter;
  content?: string;
};

export type PostTags = {
  [key: string]: {
    tagName: string;
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
