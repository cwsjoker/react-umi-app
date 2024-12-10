import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';

i18next
.use(initReactI18next)
.use(resourcesToBackend((lng: string, ns: string) => {
    if (ns === 'translation') return;
    return import(`./local/${lng}/${ns}.js`)
}))
.init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
        escapeValue: false,
    },
})