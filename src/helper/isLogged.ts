export const getAccessToken = () => {
  if (window !== undefined) {
    return localStorage.getItem('@GC/access_token');
  }
};
