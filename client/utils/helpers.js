export const isChef = () => localStorage.user && JSON.parse(localStorage.user).role === 'chef';
export const isMember = () => localStorage.user && JSON.parse(localStorage.user).role === 'member';