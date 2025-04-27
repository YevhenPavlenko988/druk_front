import {IEnvironment} from './IEnvironment';

const version = require('../../package.json').version;

export const environment: IEnvironment = {
    production: true,
    isDev: false,
    version: version,
    googleApiKey: '',
    rootUrl: '',
    apiUrl: 'https://druk2go.com/druk2go',
    log: {
        info: false,
        debug: false,
        warn: false,
        error: true,
    },
};
