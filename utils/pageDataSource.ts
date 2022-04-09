import { servicesData, testimonialsData } from '../content';
import { Post, POSTTYPES, Service, Testimonial } from '../types';
import { getAllPosts } from './posts';

interface IProps {
  services?: boolean;
  latestPosts?: boolean;
  testimonials?: boolean;
}

interface ReturnType {
  services: false | Service[];
  testimonials: false | Testimonial[];
  latestPosts: false | Post[];
}

export default async function pageDataSource({
  services = false,
  testimonials = false,
  latestPosts = false,
}: IProps): Promise<ReturnType> {
  const posts = await getAllPosts({ limit: 3, postType: POSTTYPES.BLOG });

  return {
    services: services && servicesData,
    testimonials: testimonials && testimonialsData,
    latestPosts: latestPosts && posts,
  };
}
