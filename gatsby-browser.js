import React from 'react';
import Layout from './src/components/Layout';
import { NavThemeProvider } from './src/context/NavThemeContext';
import checkForAnalyticsCookie from './src/utils/checkForAnalyticsCookie';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function wrapRootElement({ element }) {
  return <NavThemeProvider>{element}</NavThemeProvider>;
}

function gaOptout() {
  const gaProperty = process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID;
  const disableStr = `ga-disable-${gaProperty}`;
  document.cookie.indexOf(`${disableStr}=true`) > -1 && (window[disableStr] = !0);
  (document.cookie = `${disableStr}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`), (window[disableStr] = !0);
}

export function onClientEntry() {
  const analyticsAllowed = checkForAnalyticsCookie();

  if (analyticsAllowed === 'false' || analyticsAllowed === 'promptUser') {
    gaOptout();
  }
}
