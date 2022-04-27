import {
    setAccessToken, setRefreshToken,
    rmAccessToken, rmRefreshToken
} from '../storage';

export const setTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
}

export const clearTokens = () => {
    rmAccessToken();
    rmRefreshToken();
}

export const refreshTokens = (accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
}