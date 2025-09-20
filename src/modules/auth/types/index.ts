export interface ITokenResponse {
    access_token: string;
    access_expired_at: number;
    refresh_token: string;
    refresh_expired_at: number;
}