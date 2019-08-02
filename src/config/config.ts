export interface IAppConfig {
    API_URL: string;
}
export const AppConfig: IAppConfig = {
    API_URL: "http://142.93.246.187/api/v1" //production
    // API_URL: 'http://192.168.1.2:5434/api/v1'   // development
};
