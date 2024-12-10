const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

export const parseArgv = ({
    argv = process.argv,
    isProd = true,
}) => {
    const CountryKeys = ['lodi', 'ncg'];
    const SiteKeys = ['lodi291' , 'lodi777' , 'lodi646']
    const result = yargs(hideBin(argv))
        .option('country', {
            describe: '指定国家',
            description: CountryKeys.join(' | '),
            demandOption: false,
            type: 'string',
            choices: CountryKeys,
            default: 'lodi',
        })
        .option('site', {
            describe: '指定站点',
            description: SiteKeys.join(' | '),
            demandOption: false,
            type: 'string',
            choices: SiteKeys,
            default: 'lodi291',
        })
        .parse();

    return result
}