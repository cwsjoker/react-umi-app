import { useFireBase } from "@/hooks/useFireBase";
import { useEffect, useMemo } from "react";

import google_img from "@/assets/images/login/google.png";
import telegram_img from "@/assets/images/login/telegram.png";
import line_img from "@/assets/images/login/line.png";
import twitter_img from "@/assets/images/login/twitter.png";
import facebook_img from "@/assets/images/login/facebook.png";
import { useLocation, useSearchParams } from "react-router-dom";

const ThirdLogin = () => {

  const { hash } = useLocation();
  const [searchParams] = useSearchParams();

  // 检查是否三方回调链接 tg line
  const thirdType = searchParams.get('thirdType') || '';
  const urlParams = new URLSearchParams(hash.substring(1));
  const tgAuthResult = urlParams.get('tgAuthResult') || '';
  const lineCode = searchParams.get('code') || '';

  const {
    config,
    handleLogin,
    handleRedirectLogin,
    handleRedirectResult,
    firebaseConfig,
  } = useFireBase();

  const thirdLoginList = useMemo(() => {
    if (!config) return [];
    return Object.entries(config)
      .filter(([, value]) => value === 1)
      .map(([key]) => key);
  }, [config]);


  // firebase三方登录
  const fireBaseThird = (thirdType: string) => {
    // 建议facebook使用firebase采用重定向登录，在h5真机上采用弹窗登录报不明错误
    if (thirdType === "facebook") {
      handleRedirectLogin({
        thirdType
      })
    } else {
      handleLogin({
        thirdType,
        onCallBack: (e) => {
          // 窗口的登录成功回调 token 用户信息
          // do login
        },
      });
    }
  }


  // 直接对接三方登录 重定向
  const redirectThird = (thirdType: string) => {
    // 本示例tg和line直接采用三方登录

    if (thirdType === 'telegram') {
      // const callback_url = window.location.protocol + '//' + window.location.host + '/login?thirdType=' + thirdType
      // window.location.href = https://xxx?callback_url=callback_url
    }

    if (thirdType === 'line') {
      // 因为浏览器的同源策略问题，可能打开无痕窗口，或是返回打开新窗口导致session丢失的情况的，所以需要把session的信息带过去
      // const _hash = '#invite_code=123&channel_id=123&user_id=123';
      // const callback_url = window.location.protocol + '//' + window.location.host + '/login?thirdType=' + thirdType + _hash;
      // window.location.href = https://xxx?callback_url=callback_url
    }
  }


  // 处理非firebase重定向三方登录
  useEffect(() => {
    if (thirdType === 'telegram' && tgAuthResult) {
      console.log('tgAuthResult', tgAuthResult);
      // do login
    }

    if (thirdType === 'line' && lineCode) {
      console.log('lineCode', lineCode);
      // 因为浏览器的同源策略问题，可能打开无痕窗口，或是返回打开新窗口导致session丢失的情况的，所以需要把代过去的session重新赋值
      // 这里需要处理回调带回来的session
      const _hash = window.location.hash;
      console.log('_hash1', _hash)
      if (_hash) {
        const obj = Object.fromEntries(new URLSearchParams(_hash.slice(1)).entries());
        console.log('obj', obj)
        // set session
        // do login
      }
    }
  }, [thirdType, tgAuthResult, lineCode])


  // 处理firebase重定向登录
  useEffect(() => {
    if (firebaseConfig) {
      handleRedirectResult({
        onCallBack: (e) => {
          // e.: facebook.com gthirdTypeoogle.com
          // 处理重定向登录成功的返回 token 用户信息
          console.log('e', e)
          // do login
        },
      });
    }
  }, [firebaseConfig]);

  return (
    <>
      {!!thirdLoginList.length && (
        <div className=" mt-16 flex justify-center">
          {thirdLoginList.map((item, index) => {
            return (
              <div className=" flex" key={index}>
                <div className=" w-45 h-45 mx-7">
                  <img
                    src={
                      item === "google"
                        ? google_img
                        : item === "telegram"
                          ? telegram_img
                          : item === "line"
                            ? line_img
                            : item === "twitter"
                              ? twitter_img
                              : facebook_img
                    }
                    alt=""
                    className="w-full"
                    onClick={() => {
                      ['telegram', 'line'].includes(item) ? redirectThird(item) : fireBaseThird(item)
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ThirdLogin;
