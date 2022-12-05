import { Link as Scroll } from 'react-scroll';
import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useRef } from 'react';

export default function Header(props) {
  const hamburgerFlag = useRef(null);

  function overLayClose() {}
  function checkSignOut() {}
  function checkAcountDelete() {}

  return(
    <>
      <input type="checkbox" id="hamburger_flag" className={headerStyles.hamburgerFlag} ref={hamburgerFlag} />
      <div className={headerStyles.overlay} onClick={overLayClose}></div>
      <header>
        <div className={headerStyles.headerLogoWrapper}>
          <Scroll to="to" smooth={true} duration={600}>
            <Image src="/headerLogo.png" width={40} height={30} alt="topへ戻る" title="topへ戻る" priority/>
          </Scroll>
        </div>
        <div className={headerStyles.signAreaWrapper} ref={props.signArea}>
          <button onClick={checkSignOut} className={headerStyles.signOutBtn}>ログアウト</button>
          <button onClick={checkAcountDelete} className={headerStyles.acountDeleteBtn}>退会</button>
        </div>
      </header>
    </>
  )
}