import 'umi/typings';
import type { ClientEnv } from 'config/envConfig';
import Lottie, { AnimationConfigWithData, AnimationItem, RendererType } from 'lottie-web';

declare global {
    const APP_SITE: ClientEnv['APP_SITE'];
    const APP_COUNTRY: ClientEnv['APP_COUNTRY'];
    const Foo: string;


    type ILottie = Lottie
    type IAnimationConfigWithData<T> = AnimationConfigWithData<T>
    type IAnimationItem = AnimationItem
    type IRendererType = RendererType
}
