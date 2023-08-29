export const detectBrowser = (): string => {
  const browserInfo = navigator.userAgent;

  switch (true) {
    case browserInfo.includes('Opera') || browserInfo.includes('Opr'):
      return 'Opera';
    case browserInfo.includes('Edg'):
      return 'Edge';
    case browserInfo.includes('Chrome'):
      return 'Chrome';
    case browserInfo.includes('Safari'):
      return 'Safari';
    case browserInfo.includes('Firefox'):
      return 'Firefox';
    default:
      return 'unknown';
  }
};

export const detectOS = (): string => {
  switch (true) {
    case window.navigator.userAgent.indexOf('Windows') != -1:
      return 'Windows';
    case window.navigator.userAgent.indexOf('Mac OS') != -1:
      return 'Mac OS';
    case window.navigator.userAgent.indexOf('Linux') != -1:
      return 'Linux';
    default:
      return "The user's operating system could not be determined";
  }
};
