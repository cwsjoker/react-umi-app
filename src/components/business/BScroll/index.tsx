import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import classes from './BScroll.module.less';
import classNames from 'classnames';
import Pulldown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';

import { useMemoizedFn } from 'ahooks';
BScroll.use(Pulldown);
BScroll.use(Pullup);
BScroll.use(MouseWheel);
interface BScrollProps {
  className?: string;
  children: React.ReactNode;
  pullUpCallback: any;
  pullDownCallback: any;
  pullUpOpen: boolean;
  pullDownOpen: boolean;
  isShowEndText?: boolean;
}
export interface IRef {
  refreshMethod: () => void;
}

const NBScrollRef = forwardRef<IRef, BScrollProps>(
  (
    {
      className,
      children,
      pullUpCallback,
      pullDownCallback,
      pullUpOpen,
      pullDownOpen,
      isShowEndText = true,
      ...restProps
    },
    ref,
  ) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const myBs = useRef<BScroll | null>(null);
    const [isPdLoading, setIsPdLoading] = useState<boolean>(false);
    const [isPlLoading, setIsPlLoading] = useState<boolean>(false);
    useImperativeHandle(ref, () => {
      return {
        refreshMethod: () => {
          let bs = myBs.current;
          if (bs) {
            setTimeout(() => {
              bs.refresh();
            }, 500);
          }
        },
        scrollMethod: () => {
          let bs = myBs.current;
          if (bs) {
            setTimeout(() => {
              bs.scrollTo(0, 0);
            }, 500);
          }
        },
      };
    });

    useEffect(() => {
      myBs.current = new BScroll(wrapperRef.current!, {
        click: true,
        scrollY: true,
        pullUpLoad: {
          threshold: 50,
        },
        pullDownRefresh: {
          threshold: 50,
          stop: 40,
        },
        mouseWheel: true,
        // bounceTime: 800, // 上拉弹跳时间
      });
      _initBS();
      return () => {
        myBs.current?.destroy();
      };
    }, []);
    const _initBS = useMemoizedFn(() => {
      handleBsOnchange();
    });
    const handleBsOnchange = useMemoizedFn(() => {
      if (!myBs.current) return;
      if (pullUpOpen) {
        myBs.current.off('pullingUp');
        myBs.current.once('pullingUp', pullingUpHandler);
        myBs.current.finishPullUp();
      }
      if (pullDownOpen) {
        myBs.current.off('pullingDown');
        myBs.current.once('pullingDown', pullingDwonHandler);
      }
    });
    const pullUpFinish = () => {
      // 重置pullUp状态
      let bs = myBs.current;
      if (bs) {
        bs.finishPullUp();
        bs.refresh();
      }
      handleBsOnchange();
    };
    // 上拉加载触发事件
    const pullingUpHandler = useMemoizedFn(async () => {
      if (isPlLoading || !pullUpOpen) {
        pullUpFinish();
        return;
      }
      setIsPlLoading(true);
      await pullUpCallback();
      setIsPlLoading(false);
      pullUpFinish();
    });
    const pullDownFinish = () => {
      // 重置pullUp状态
      let bs = myBs.current;
      if (bs) {
        bs.finishPullDown();  // 结束下拉刷新行为，主动调用，告诉 BetterScroll 准备好下一次的 pullingDown 钩子
        bs.refresh(); // 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      }
      handleBsOnchange();
    };
    // 下拉刷新触发事件
    const pullingDwonHandler = useMemoizedFn(async () => {
      if (!pullDownOpen) return;
      setIsPdLoading(true);
      await pullDownCallback();
      setIsPdLoading(false);
      pullDownFinish();
    });

    useEffect(() => {
      handleBsOnchange();
      () => {};
    }, [pullUpOpen]);

    {
      return (
        <div ref={wrapperRef} className={classNames(classes['scroll-wrap'], className)} {...restProps}>
          <div className="relative w-full">
            <div
              className={`absolute w-full h40 leading-40 text-12 box-border text-center ${classes['pulldown-wrapper']}`}
            >
              <span>{!isPdLoading ? '下拉刷新' : '加载中' + '...'}</span>
            </div>
            {children}
            {isPlLoading ? (
              <div className={`w-full h40 leading-40 text-12 box-border text-center`}>
                <span>{'加载中' + '...'}</span>
              </div>
            ) : (
              ''
            )}
            {!pullUpOpen && isShowEndText ? (
              <div className={`${classes['title-split']}`}>
                <span></span>
                <div>到底啦~</div>
                <span></span>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    }
  },
);

const NBScroll = React.memo(NBScrollRef);

export default NBScroll;
