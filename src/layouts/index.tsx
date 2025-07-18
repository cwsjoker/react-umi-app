import { useOutlet } from 'umi';
import styles from './index.less';
import { createTheme, MantineProvider } from '@mantine/core';
import useSetup from '@/layouts/useSetup'
import { StoreProvider } from '@/store'
import AppModal from '@/components/business/AppModal'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

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
      <AppModal />
    </>
  )
}

export default function Layout() {
  
  return (
    <div className=' flex flex-col min-h-[100vh]'>
      <StoreProvider>
        <MantineProvider theme={theme}>
          <DndProvider backend={HTML5Backend}>
            <Root />
          </DndProvider>
        </MantineProvider>
      </StoreProvider>
    </div>
  );
}
