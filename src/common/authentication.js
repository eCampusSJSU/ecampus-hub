import history from './history';

export const setSession = (profile, token, expires_in) => {
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('token', JSON.stringify(token));
    let expiresAt = JSON.stringify((expires_in * 1000) + new Date().getTime());
    localStorage.setItem('expires_at', expiresAt);
};

export const logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    history.replace('/');
};

export const getProfile = () => {
    return JSON.parse(localStorage.getItem('profile'));
};

export const getToken = () => {
    return JSON.parse(localStorage.getItem('token'));
};

export const isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
};