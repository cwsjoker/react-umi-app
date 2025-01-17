import { useTranslation } from 'react-i18next'
import { NButton } from '@/components/ui'
import { navigate } from '@/router/navigate'
import { NModal } from '@/components/ui/Modal'
import { useState } from 'react'

export default function HomePage() {
  const { t } = useTranslation('login')
  console.log('APP_SITE', APP_COUNTRY)


  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <div>
      <h3>{t('login1')}</h3>
      <h4>country: {APP_COUNTRY}</h4>
      <h4>site: {APP_SITE}</h4>

      <div className=' grid grid-cols-4 gap-10'>
        <NButton onClick={() => {
          navigate('/tsRule')
        }}>ts</NButton>
        <NButton onClick={() => {
          navigate('tsServe')
        }}>server</NButton>
        <NButton onClick={() => {
          navigate('cssPage')
        }}>css</NButton>
        <NButton onClick={() => {
          navigate('comPage')
        }}>compage</NButton>
      </div>

      <div className=' bg-red-100 w-[375px] h-[158px] text-12'></div>

      <NModal opened={open} onClose={() => {}}></NModal>



    </div>
  );
}
