export interface ITokenResponse {
    accessToken: string;
    access_expired_at: number;
    refreshToken: string;
    refresh_expired_at: number;
}