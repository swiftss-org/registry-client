import Cookies, { CookieChangeListener } from 'universal-cookie';

const cookieOptions = {
  path: '/',
};

const cookies = new Cookies();

cookies.set = (name, value, overrides = {}) => {
  cookies.constructor.prototype.set.call(cookies, name, value, {
    ...cookieOptions,
    ...overrides,
  });
};

cookies.remove = (name, overrides = {}) => {
  cookies.constructor.prototype.remove.call(cookies, name, {
    ...cookieOptions,
    ...overrides,
  });
};

export const addCookieListener = (callback: CookieChangeListener): void =>
  cookies.addChangeListener((cookie) => {
    callback(cookie);
  });

export const removeCookieListener = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cookies.removeChangeListener(() => {});
};

export default cookies;
