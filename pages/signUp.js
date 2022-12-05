import Head from 'next/head';
import { Header } from '../component/index';
import signStyles from '../styles/sign.module.css';
import Link from 'next/link';

export default function SignUp() {
  return(
    <>
      <Head>
        <title>Kaidashi ~SignUp</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className={signStyles.container} id="top">
          <div className={signStyles.signUpWrapper}>
            <form className={signStyles.inputForm} onSubmit={(e)=> {e.preventDefault()}}>
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
        </div>
      </main>
    </>
  )
}