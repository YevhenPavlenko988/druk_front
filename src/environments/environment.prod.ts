import {IEnvironment} from './IEnvironment';

const version = require('../../package.json').version;

export const environment: IEnvironment = {
    production: true,
    isDev: false,
    version: version,
    googleApiKey: '',
    rootUrl: '',
    log: {
        info: false,
        debug: false,
        warn: false,
        error: true,
    },
};
