export interface IAppConfig {
    API_URL: string;
}
export const AppConfig: IAppConfig = {
    // API_URL: "http://34.211.102.109:5434/api/v1" //production
    API_URL: 'http://localhost:5434/api/v1'   // development
};
