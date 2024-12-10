import { useOutlet } from 'umi';
import styles from './index.less';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Your theme override here */
});

export default function Layout() {
  const currentOutlet = useOutlet();
  return (
    <div className={styles.navs}>
      <MantineProvider theme={theme}>
        {currentOutlet}
      </MantineProvider>
    </div>
  );
}
