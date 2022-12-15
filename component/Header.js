import { Link as Scroll } from 'react-scroll';
import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useEffect, useRef, useContext, createContext } from 'react';
export const HeaderContext = createContext();
import { Modal } from './index';
import { IndexHeaderContext } from '../pages/';
import { SignInHeaderContext } from '../pages/signIn';
import { SignUpHeaderContext } from '../pages/signUp';

export default function Header(props) {
  const modalFlag = useRef(null);
  const Overlay = useRef(null);
  const modalRef = useRef(null);
  const modalBody = useRef(null);
  const modalFooter = useRef(null);
  const yesBtn = useRef(null);
  const hamburgerSpan = useRef(null);
  const hamburgerOpenflag = useRef(null);
  const IndexHeaderValue = useContext(IndexHeaderContext);
  const SignInHeaderValue = useContext(SignInHeaderContext);
  const SignUpHeaderValue = useContext(SignUpHeaderContext);
  const fromAnyWhereHeader = ()=> {
    if(IndexHeaderValue) {
      return IndexHeaderValue;
    }
    else if(SignInHeaderValue) {
      return SignInHeaderValue;
    }
    else if(SignUpHeaderValue) {
      return SignUpHeaderValue;
    }
  }

  const value = {
    modalFlag: modalFlag,
    Overlay: Overlay,
    modalRef: modalRef,
    modalBody: modalBody,
    modalFooter: modalFooter,
    yesBtn: yesBtn,
    hamburgerOpenflag: hamburgerOpenflag,
    checkSignOut: checkSignOut,
    checkAcountDelete: checkAcountDelete
  }

  function checkSignOut() {
    modalFlag.current.checked = true;
    yesBtn.current.id = 'check_sign_out';
    Overlay.current.id = 'check_sign_out_overlay';
    Overlay.current.style.zIndex = 1;
    modalBody.current.innerHTML = 'ログアウトしても宜しいですか？';
    modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function checkAcountDelete() {
    modalFlag.current.checked = true;
    yesBtn.current.id = 'delete_acount';
    Overlay.current.id = 'delete_acount_overlay';
    Overlay.current.style.zIndex = 1;
    modalBody.current.innerHTML = 'このアカウントを削除致しますか？';
    modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function hamburgerOpen() {
    if(hamburgerOpenflag.current.checked == false) {
      Overlay.current.id = 'hamburger_open_overlay';
      modalFlag.current.checked = true;
    }
    else {
      value.Overlay.current.id = '';
      modalFlag.current.checked = false;
    }
  }

  useEffect(()=> {
  })

  return(
    <>
      <HeaderContext.Provider value={value}>
        <header className={headerStyles.header}>
          <Modal />
          <div className={headerStyles.headerLogoWrapper}>
            <Scroll to="to" smooth={true} duration={600}>
              <Image src="/headerLogo.svg" width={40} height={30} alt="topへ戻る" title="topへ戻る" priority/>
            </Scroll>
          </div>
          <input type="checkbox" id="hamburger_open" ref={hamburgerOpenflag}/>
          <div className={headerStyles.signArea} ref={fromAnyWhereHeader().signArea}>
            <div className={headerStyles.signAreaWrapper} onClick={(e)=> {e.preventDefault(); e.stopPropagation();}}>
              <div>
                <a onClick={checkSignOut}>ログアウト</a>
              </div>
              <div>
                <a onClick={checkAcountDelete} className={headerStyles.acountDeleteBtn}>退会</a>
              </div>
            </div>
          </div>
          <label htmlFor="hamburger_open" className={headerStyles.hamburger} onClick={hamburgerOpen} ref={fromAnyWhereHeader().hamburgerBtn} alt="ログアウト/退会" title="ログアウト/退会">
            <span ref={hamburgerSpan}></span>
          </label>
        </header>
      </HeaderContext.Provider>
    </>
  )
}