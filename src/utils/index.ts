// const TOKEN_KEY = 'token';
const TOKEN_KEY = 'token';

const isLogin = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};

const getCache = (key: string) => {
  return localStorage.getItem(key);
};

const setCache = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const clearCache = (key: string) => {
  localStorage.removeItem(key);
};

export { isLogin, getCache, setCache, clearCache };
