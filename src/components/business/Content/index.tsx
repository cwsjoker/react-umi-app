

import { useSize } from 'ahooks';
import classNames from 'classnames';
import { useRef } from 'react';
// import styles from './index.css';

type ConetntCompProps = {
    wrapClassName?: string;
    conClassName?: string;
    childConClassName?: string;
    angle: number;
    children: React.ReactNode;
}
export const ConetntComp: React.FC<ConetntCompProps> = ({...props}) => {

    const { angle = 0, wrapClassName, conClassName, childConClassName } = props

    const ref = useRef(null);
    const size = useSize(ref);
    const _translate = ((size?.width || 0) /2) * Math.tan((angle * Math.PI) / 180);
    
    return (
        <>
        <div>{size?.width}</div>
        <div>{_translate}</div>
                <div ref={ref} className={classNames(`w-full h-auto bg-transparent overflow-hidden rounded-12`, wrapClassName)}>
                    <div className={classNames(`size-full  rounded-[inherit] text-[#fff]`, conClassName)}
                        style={{
                            transform: `skewY(${angle}deg) translateY(${_translate}px)`,
                        }}
                    >
                        <div className={classNames(`size-full rounded-b-12 overflow-hidden`, childConClassName)}
                            style={{
                                transform: `skewY(${-angle}deg) translateY(${-_translate}px)`,
                                paddingTop: `${_translate * 2}px`,
                            }}
                        >
                            {props.children}
                        </div>
                    </div>
                </div>

        </>
    )
}

export default ConetntComp


// 方案：父级正常 子级倾斜skew-y 下移translate-y 
// 1.解决根据skew-y角度算出translate-y的角度   解决
// 2.父级div的宽度 解决 
// 3.skew里面的内容不倾斜 解决
// 4. 边框    
// rounded-[inherit]
// Math.tan((5 * Math.PI) / 180) 计算 tan角度值

// 1.transfrom
// 2.伪元素
// 3.sky