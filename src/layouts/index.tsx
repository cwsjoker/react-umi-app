import { useOutlet } from 'umi';
import styles from './index.less';
import { createTheme, MantineProvider } from '@mantine/core';
import useSetup from '@/layouts/useSetup'

const theme = createTheme({
  /** Your theme override here */
  // scale: 1 / (37.5 / 16),
});


const BaseLayout = () => {
  const currentOutlet = useOutlet();
  return (
    <>
      {currentOutlet}
    </>
  )
}

const Root = () => {
  useSetup();
  return (
    <>
      <BaseLayout />
    </>
  )
}

export default function Layout() {
  
  return (
    <div className=' flex flex-col min-h-[100vh]'>
      <MantineProvider theme={theme}>
        <Root />
      </MantineProvider>
    </div>
  );
}
