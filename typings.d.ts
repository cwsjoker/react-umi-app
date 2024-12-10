import 'umi/typings';
import type { ClientEnv } from 'config/envConfig';

declare global {
    const APP_SITE: ClientEnv['APP_SITE'];
    const APP_COUNTRY: ClientEnv['APP_COUNTRY'];
    const Foo: string;
}
