import { Icon } from 'umi'
import styles from './index.module.less'


const IndexPage = () => {
    return (
        <>
            <Icon icon="local:add" className=' text-red-100' />

            {/* tw 渐变 */}
            <div className={`m-[10px] w-[120px] h-20 rounded-[10px] bg-red-100 gb before:bg-cbd before:rounded-[10px] ${styles.bg1}`}></div>

            {/* css处理渐变 */}
            <div className={`m-[10px] w-[120px] h-20 rounded-[50%] ${styles.bg2}`}></div>

            {/* css处理单边框渐变 */}
            <div className={` w-[300px] h-[40px] ${styles.bg3}`}>111</div>

            {/* 金额渐变阴影 */}
            <div className={` text-[40px] font-black ${styles.money}`} title='88888'>88888</div>
        </>
    )
}

export default IndexPage