import Head from 'next/head';
import signInStyles from '../styles/signIn.module.css';
import { Header, Footer } from '../component/index';
import Link from 'next/link';
import React, { useRef, createContext } from 'react';
export const SignInContainerContext = createContext();

export default function SignIn() {
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
        <title>Kaidashi ~SignIn</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignInContainerContext.Provider value={value}>
        <div className={signInStyles.container} id="top">
          <Header />
          <main>
            <div className={signInStyles.signInWrapper}>
              <form className={signInStyles.inputForm} onSubmit={(e)=> {e.preventDefault()}}>
                <div>
                  <label htmlFor="mail">メール:</label>
                  <input type="text" name="text" id="mail" />
                </div>
                <div>
                  <label htmlFor="password">パスワード:</label>
                  <input type="password" name="password" id="password" />
                </div>
                <div><input type="submit" value="ログイン" /></div>
              </form>
              <div>
                <div className={signInStyles.keepSignIn}>
                  <input type="checkbox" name="keepSignIn" id="keepSignIn" />
                  <label htmlFor="keepSignIn">:ログインを維持する</label>
                </div>
                <div><Link href="./signUp">新規登録</Link></div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </SignInContainerContext.Provider>
    </>
  )
}