import { servicesData, testimonialsData, projectsData } from '../content';
import { Post, POSTTYPES, Project, Service, Testimonial } from '../types';
import { getAllPosts } from './posts';

interface IProps {
  services?: boolean;
  projects?: boolean;
  latestBlogs?: boolean;
  latestNewsletters?: boolean;
  testimonials?: boolean;
}

interface ReturnType {
  services: false | Service[];
  projects: false | Project[];
  testimonials: false | Testimonial[];
  latestBlogs: false | Post[];
  latestNewsletters: false | Post[];
}

export default async function pageDataSource({
  services = false,
  projects = false,
  testimonials = false,
  latestBlogs = false,
  latestNewsletters = false,
}: IProps): Promise<ReturnType> {
  const blogPosts = await getAllPosts({ limit: 3, postType: POSTTYPES.BLOG });
  const newsletterPosts = await getAllPosts({
    limit: 3,
    postType: POSTTYPES.NEWSLETTER,
  });

  return {
    services: services && servicesData,
    projects: projects && projectsData,
    testimonials: testimonials && testimonialsData,
    latestBlogs: latestBlogs && blogPosts,
    latestNewsletters: latestNewsletters && newsletterPosts,
  };
}