export const isSafari = () => {
  const agent = navigator.userAgent;
  return agent.indexOf("Safari") !== -1 && agent.indexOf("Chrome") === -1;
};
