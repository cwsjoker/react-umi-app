
import img_test from '@/assets/images/home/image2.png'
import { NButton } from '@/components/ui';
import { exportComponentAsPNG, fixHtml2canvasTextLineHeight } from '@/utils/canvas' 
import { useRef } from 'react';
import { useLockFn } from 'ahooks';
const IndexPage = () => {
    const refs = useRef(null)
    const donwImg = useLockFn(async () => {
        const removeStyle = fixHtml2canvasTextLineHeight();
        exportComponentAsPNG(refs.current, 'downImg', () => {
            console.log('下载成功');
        }).catch(() => void 0).finally(() => {
            removeStyle();
        });
    })

    return (
        <div>
            <div ref={refs} className=' bg-red-600 w-[100px]'>
                <img src={img_test} alt="" />
                <div className=' h-30 text-white text-center leading-30 bg-slate-600'>IMG</div>
            </div>
            <NButton onClick={donwImg}>donwImg</NButton>
        </div>
    )
}

export default IndexPage;