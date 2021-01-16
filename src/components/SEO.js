import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { pathJoin } from '../utils/path-join';
import Logo from '../assets/logo/CM-Logo.svg';

import { useSiteMetadata } from '../utils/useSiteMetadata';

const SEO = ({ post }) => {
  const { title, description, image, slug, article, date } = post;
  const { pathname } = useLocation();
  const { title: defaultTitle, description: defaultDescription, author, siteUrl, twitterUsername, image: defaultImage } = useSiteMetadata();

  // const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  const canonical = pathJoin(siteUrl, slug);

  return (
    <Helmet title={seo.title} titleTemplate={`%s - ${defaultTitle}`}>
      <html lang="en" />
      <title>{seo.title}</title>

      {/* Meta Tags */}
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} key="ogtitle" />}
      {seo.description && <meta property="og:description" content={seo.description} key="ogdesc" />}
      <meta property="og:image" content={seo.image || Logo} />
      <meta property="og:site_name" content={seo.title} key="ogsitename" />
      {date ? <meta property="article:published_time" content={new Date(date).toISOString()} /> : null}

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:site" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:url" content={seo.url} />
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.bool,
    slug: PropTypes.string,
    date: PropTypes.string,
  }),
};

SEO.defaultProps = {
  post: PropTypes.shape({
    title: null,
    description: null,
    image: null,
    article: false,
  }),
};
