import Head from 'next/head';
import { Header } from '../component/index';
import signStyles from '../styles/sign.module.css';
import Link from 'next/link';

export default function SignIn() {
  return(
    <>
      <Head>
        <title>Kaidashi ~SignIn</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className={signStyles.container} id="top">
          <div className={signStyles.signInWrapper}>
            <form className={signStyles.inputForm} onSubmit={(e)=> {e.preventDefault()}}>
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
              <div className={signStyles.keepSignIn}>
                <input type="checkbox" name="keepSignIn" id="keepSignIn" />
                <label htmlFor="keepSignIn">:ログインを維持する</label>
              </div>
              <div><Link href="./signUp">新規登録</Link></div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}