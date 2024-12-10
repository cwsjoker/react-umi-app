import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation('login')
  console.log('APP_SITE', APP_COUNTRY)
  
  return (
    <div>
      <h2>Yay! Welcome to umi! NCG1122</h2>
      <h3>{t('login1')}</h3>
      <h4>{APP_COUNTRY}</h4>
      <h4>{APP_SITE}</h4>
    </div>
  );
}