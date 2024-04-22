const getTokenFromCookie = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name.trim() === cookieName) {
      return value;
    }
  }
  return null;
}
export default getTokenFromCookie;