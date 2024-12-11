import { useTranslation } from 'react-i18next'
import { NButton } from '@/components/ui'
import styles from './index.module.less'
import { Icon } from 'umi'

export default function HomePage() {
  const { t } = useTranslation('login')
  console.log('APP_SITE', APP_COUNTRY)
  
  return (
    <div>
      <h2>Yay! Welcome to umi!111</h2>
      <h3>{t('login1')}</h3>
      <h4>{APP_COUNTRY}</h4>
      <h4>{APP_SITE}</h4>

      <div className='w-full h-[30px] pl-10'>1111122</div>
      <NButton className="w-[200px]" onClick={() => {
        console.log(11122)
      }}>click</NButton>

      <Icon icon="local:add" className=' text-red-100' />

      {/* tw 渐变 */}
      <div className={`m-[10px] w-[120px] h-20 rounded-[10px] bg-red-100 gb before:bg-cbd before:rounded-[10px] ${styles.bg1}`}></div>

      {/* css处理渐变 */}
      <div className={`m-[10px] w-[120px] h-20 rounded-[50%] ${styles.bg2}`}></div>

      {/* css处理单边框渐变 */}
      <div className={` w-[300px] h-[40px] ${styles.bg3}`}>111</div>

      {/* 金额渐变阴影 */}
      <div className={` text-[40px] font-black ${styles.money}`} title='88888'>88888</div>

    </div>
  );
}
