import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';

import { useSiteMetadata } from '../utils/useSiteMetadata';

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation();
  const { title: defaultTitle, description: defaultDescription, author, siteUrl, twitterUsername, image: defaultImage } = useSiteMetadata();

  // const { defaultTitle, titleTemplate, defaultDescription, siteUrl, defaultImage, twitterUsername } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title} titleTemplate={`%s - ${defaultTitle}`}>
      <html lang="en" />
      <title>{seo.title}</title>

      {/* Fav Icons */}
      <link rel="icon" type="image/svg+xml" href="/CM-Logo-2019.svg" />
      <link rel="alternate icon" href="/CM-Favicon.ico" />

      {/* Meta Tags */}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />

      {/* Open Graph */}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} key="ogtitle" />}
      {seo.description && <meta property="og:description" content={seo.description} key="ogdesc" />}
      <meta property="og:image" content={seo.image || '/CM-Logo-2019.svg'} />
      <meta property="og:site_name" content={seo.title} key="ogsitename" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && <meta name="twitter:creator" content={twitterUsername} />}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
};
