import { servicesData, projectsData } from '../content';
import { LatestVideo, Post, POSTTYPES, Project, Service } from '../types';
import getLatestYouTubeVideo from './get-latest-youtube-video';
import { getAllPosts } from './posts';

interface IProps {
  services?: boolean;
  projects?: boolean;
  latestBlogs?: boolean;
  latestNewsletters?: boolean;
  latestYouTubeVideo?: boolean;
}

interface ReturnType {
  services: false | Service[];
  projects: false | Project[];
  latestBlogs: false | Post[];
  latestNewsletters: false | Post[];
  latestYouTubeVideo: false | LatestVideo['items'][0];
}

export default async function pageDataSource({
  services = false,
  projects = false,
  latestBlogs = false,
  latestNewsletters = false,
  latestYouTubeVideo = false,
}: IProps): Promise<ReturnType> {
  const blogPosts =
    latestBlogs && (await getAllPosts({ limit: 2, postType: POSTTYPES.BLOG }));

  const newsletterPosts =
    latestNewsletters &&
    (await getAllPosts({
      limit: 1,
      postType: POSTTYPES.NEWSLETTER,
    }));

  const youTubeVideo = latestYouTubeVideo && (await getLatestYouTubeVideo());

  return {
    services: services && servicesData,
    projects: projects && projectsData,
    latestBlogs: latestBlogs && blogPosts,
    latestNewsletters: latestNewsletters && newsletterPosts,
    latestYouTubeVideo: latestYouTubeVideo && youTubeVideo,
  };
}
