export const TOKEN_KEY = "token-key";
export const USER_ID = "user-id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID);
};
export const userId = id => {
  localStorage.setItem(USER_ID, id);
};
