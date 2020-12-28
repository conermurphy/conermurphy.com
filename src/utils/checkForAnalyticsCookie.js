export default function checkForAnalyticsCookie() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie;
    const analyticsCookie = cookies.split('; ').find((cookie) => cookie.startsWith('conermurphy.com_analytics'));

    if (analyticsCookie === undefined) {
      document.cookie = 'conermurphy.com_analytics=promptUser; expires=Fri, 31 Dec 9999 23:59:59 GMT;';
      return 'promptUser';
    }
    return analyticsCookie.split('=')[1];
  }
  return false;
}
