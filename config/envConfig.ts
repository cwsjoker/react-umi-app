const { parseArgv } = require('./argv');

const { country, site } = parseArgv ({
})

export const clientEnv = (() => {
    const result = {
        APP_SITE: site,
        APP_COUNTRY: country, 
    }
    return result;
})()

export type ClientEnv = typeof clientEnv


export const countryExtension = clientEnv.APP_COUNTRY !== 'lodi' ? `.$${clientEnv.APP_COUNTRY}` : '';

