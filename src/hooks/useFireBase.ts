import { useState } from "react";
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  User,
} from 'firebase/auth';
import { useAsyncEffect } from "ahooks";

type FireBaseProps = {
  thirdType: string;
  onCallBack: (e: any) => void;
};

export const useFireBase = () => {

  const [firebaseConfig, setFirebaseConfig] = useState<any>(null);

  const config = {
    facebook: 1,
    google: 1,
    line: 1,
    telegram: 1,
    twitter: 1,
  }

  useAsyncEffect(async () => {
    try {
      setFirebaseConfig({
        apiKey: "xxxxxxx",
        authDomain: "xxxxx.firebaseapp.com",
        projectId: "xxxxx",
        storageBucket: "xxxxxx.firebasestorage.app",
        messagingSenderId: "672985416275",
        appId: "xxxxxxx",
        measurementId: "G-xxxxxxx"
      });
    } catch (error) {}
  }, []);

  // 弹窗登录
  const handleLogin = async (props: FireBaseProps) => {
    if (!firebaseConfig) return;
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      let provider;
      if (props.thirdType === 'google') {
        provider = new GoogleAuthProvider();
      } else if (props.thirdType === 'facebook' || props.thirdType === 'whatsapp') {
        provider = new FacebookAuthProvider();
      } else if (props.thirdType === 'twitter') {
        provider = new TwitterAuthProvider();
      } else if (props.thirdType === 'line') {
        provider = new OAuthProvider('oidc.line');
        provider.addScope('openid');
      }
      const result = await signInWithPopup(auth, provider!!);
      const user = result.user as User & { accessToken: string };
      const access_token = user.accessToken;
      props.onCallBack && props.onCallBack({ thirdType: props.thirdType, access_token });
    } catch (error) {
      console.log('error--', error);
    }
  };

  // 重定向登录
  const handleRedirectLogin = async (props: Pick<FireBaseProps, 'thirdType'>) => {
    if (!firebaseConfig) return;
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);

      let provider;
      if (props.thirdType === 'google') {
        provider = new GoogleAuthProvider();
      } else if (props.thirdType === 'facebook' || props.thirdType === 'whatsapp') {
        provider = new FacebookAuthProvider();
      } else if (props.thirdType === 'twitter') {
        provider = new TwitterAuthProvider();
      } else if (props.thirdType === 'line') {
        provider = new OAuthProvider('oidc.line');
        provider.addScope('openid');
      }
      await signInWithRedirect(auth, provider!!);
    } catch (error) {
      console.log('error--', error);
    }
  };


  const handleRedirectResult = async (props: Omit<FireBaseProps, 'thirdType'>) => {
    if (!firebaseConfig) return;
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      const result = await getRedirectResult(auth);
      if (result) {
        const user = result.user as User & { accessToken: string };
        const access_token = user.accessToken;
        props.onCallBack && props.onCallBack({ thirdType: result.providerId, access_token });
      }
    } catch (error) {
      console.log('error--', error);
    }
  };

  return {
    config,
    handleLogin,
    handleRedirectLogin,
    handleRedirectResult,
    firebaseConfig,
  };
};
