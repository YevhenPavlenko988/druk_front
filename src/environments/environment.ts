import {IEnvironment} from './IEnvironment';
import packageJson from '../../package.json';

const version = packageJson.version;

export const environment: IEnvironment = {
    production: false,
    isDev: true,
    version: version,
    googleApiKey: '',
    rootUrl: '',
    apiUrl: 'https://druk2go.com/druk2go',
    debug: true,
    log: {
        info: true,
        debug: true,
        warn: true,
        error: true,
    },
};
