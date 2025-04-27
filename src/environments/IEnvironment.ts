export interface IEnvironment {
    production: boolean,
    rootUrl: string,
    apiUrl: string,
    version: string,
    isDev?: boolean,
    debug?: boolean,
    mock?: boolean,
    googleApiKey: string,
    log: {
        info: boolean,
        debug: boolean,
        warn: boolean,
        error: boolean
    };
}
