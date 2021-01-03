export function promptUserReconfirm() {
  const cookies = document.cookie;
  const analyticsCookie = cookies.split('; ').filter((cookie) => cookie.startsWith('conermurphy.com'));

  analyticsCookie.forEach((cookie) => {
    const cookieToExpire = `${cookie}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = cookieToExpire;
  });
  location.reload();
}

export default function checkForAnalyticsCookie() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie;
    const analyticsCookie = cookies.split('; ').find((cookie) => cookie.startsWith('conermurphy.com_analytics'));

    if (analyticsCookie === undefined) {
      document.cookie = 'conermurphy.com_analytics=promptUser; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/;';
      return 'promptUser';
    }
    return analyticsCookie.split('=')[1];
  }
  return false;
}
