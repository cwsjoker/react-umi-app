import NLottie from '@/components/Uikit/Lottie';
import coinOpenAnimitionData from "@/assets/lottie/coinOpen.json";
import { useRef } from 'react';

const IndexPage = () => {

  const lottieRef = useRef<any>(null);
  
  return (
    <>
      <div className="">
        <NLottie
          className=" w-[375px] h-[500px] absolute -top-[150px] -left-45 z-[-1] pointer-events-none"
          options={{
            animationData: coinOpenAnimitionData,
            // loop: false,
            autoplay: false,
            onDOMLoaded: (event, lottie) => {
              console.log(2222)
              lottieRef.current = lottie;
              // lottieRef.current.loop = true;
              lottieRef.current?.play?.();
              lottieRef.current.playSegments([20, 80], true);
            },
            onComplete: () => {
              console.log('lottie finish')
            }
          }}
        />
      </div>
    </>
  );
};

export default IndexPage;
