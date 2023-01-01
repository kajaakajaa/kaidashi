import Head from 'next/head';
import { Header, Footer } from '../component/index';
import signUpStyles from '../styles/signUp.module.css';
import Link from 'next/link';
import React, { useRef, createContext } from 'react';
export const SignUpContainerContext = createContext();

export default function SignUp() {
  const signArea = useRef(null);
  const hamburgerBtn = useRef(null);
  const hamburgerOpenFlag = useRef(null);

  const value = {
    signArea: signArea,
    hamburgerBtn: hamburgerBtn,
    hamburgerOpenFlag: hamburgerOpenFlag
  }

  return(
    <>
      <Head>
        <title>Kaidashi ~SignUp</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignUpContainerContext.Provider value={value}>
        <div className={signUpStyles.container} id="top">
          <Header />
          <main>
            <div className={signUpStyles.signUpWrapper}>
              <form className={signUpStyles.inputForm} onSubmit={(e)=> {e.preventDefault()}}>
                <div>
                  <label htmlFor="mail">メール:</label>
                  <input type="text" name="text" id="mail" />
                </div>
                <div>
                  <label htmlFor="password">パスワード:</label>
                  <input type="password" name="password" id="password" />
                </div>
                <div>
                  <label htmlFor="password_check">パスワード（確認用）:</label>
                  <input type="password" name="password_check" id="password_check" />
                </div>
                <div><input type="submit" value="登録" /></div>
              </form>
              <div><Link href="./signIn">ログイン</Link></div>
            </div>
          </main>
          <Footer />
        </div>
      </SignUpContainerContext.Provider>
    </>
  )
}