import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';

export type Lottie = ILottie;
export type AnimationConfigWithData<T extends RendererType = 'svg'> = Omit<IAnimationConfigWithData<T>, 'container'>;
export type AnimationItem = IAnimationItem;
export type RendererType = IRendererType;

export type NLottieProps<T extends RendererType = 'svg'> = {
  options: Omit<IAnimationConfigWithData<T>, 'container'> & {
    onComplete?: (event: any, lottie: any) => void;
    onLoopComplete?: (event: any, lottie: any) => void;
    onEnterFrame?: (event: any, lottie: any) => void;
    onSegmentStart?: (event: any, lottie: any) => void;
    onDOMLoaded?: (event: any, lottie: any) => void;
    path?: string;
  };
  className?: string;
  style?: React.CSSProperties;
};
const NLottie = <T extends RendererType = 'svg'>({
  options: { onComplete, onLoopComplete, onEnterFrame, onSegmentStart, onDOMLoaded, animationData, ...options },
  ...props
}: NLottieProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inited, setInited] = useState(false);
  const LottieRef = useRef<Lottie>();
  const lottieInstanceRef = useRef<AnimationItem>();
  const complete = useMemoizedFn((event) => onComplete?.(event, lottieInstanceRef.current));
  const loopComplete = useMemoizedFn((event) => onLoopComplete?.(event, lottieInstanceRef.current));
  const enterFrame = useMemoizedFn((event) => onEnterFrame?.(event, lottieInstanceRef.current));
  const segmentStart = useMemoizedFn(() => onSegmentStart?.(event, lottieInstanceRef.current));
  const DOMLoaded = useMemoizedFn((event) => onDOMLoaded?.(event, lottieInstanceRef.current));

  useLayoutEffect(() => {
    const events = {
      complete,
      loopComplete,
      enterFrame,
      segmentStart,
      DOMLoaded,
    } as const;
    const eventNames = Object.keys(events) as (keyof typeof events)[];

    if (inited && LottieRef.current) {
      const rest: { path?: string; animationData?: any } = { animationData };
      // json资源打包改了这里处理下资源加载
      if (animationData && typeof animationData === 'string' && /\.json$/i.test(animationData)) {
        delete rest.animationData;
        rest.path = animationData;
      }

      const params = {
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
        ...rest,
        ...options,
        container: ref.current!,
      };
      // console.log(params)
      lottieInstanceRef.current = LottieRef.current.loadAnimation(params);
      eventNames.forEach((name) => {
        lottieInstanceRef.current?.addEventListener(name, events[name]);
      });
    }

    return () => {
      if (lottieInstanceRef.current) {
        eventNames.forEach((name) => {
          lottieInstanceRef.current?.removeEventListener(name, events[name]);
        });
        lottieInstanceRef.current?.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationData, options.autoplay, inited]);

  useEffect(() => {
    import('lottie-web').then(({ default: Lottie }) => {
      LottieRef.current = Lottie;
      setInited(true);
    });
  }, []);

  if (!inited) return null;

  return <div {...props} className={classNames('size-full', props.className)} ref={ref} />;
};
export default React.memo(NLottie);
