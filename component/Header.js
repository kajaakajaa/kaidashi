import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useRef, useContext, createContext, useState, useEffect } from 'react';
export const HeaderContext = createContext();
import { Modal } from './index';
import { IndexContainerContext } from '../pages/';
import { SignInContainerContext } from '../pages/signIn';
import { SignUpContainerContext } from '../pages/signUp';

export default function Header() {
  const hamburgerSpan = useRef(null);
  const IndexHeaderValue = useContext(IndexContainerContext);
  const SignInHeaderValue = useContext(SignInContainerContext);
  const SignUpHeaderValue = useContext(SignUpContainerContext);
  const [SignHidden, setSignHidden] = useState(false);
  const fromAnyWhereHeader = ()=> {
    if(IndexHeaderValue) {
      return IndexHeaderValue; //indexのページが呼ばれたら表示
    }
    else if(SignInHeaderValue) { //ログインページが呼ばれたら表示
      return SignInHeaderValue;
    }
    else if(SignUpHeaderValue) { //新規登録ページが呼ばれたら表示
      return SignUpHeaderValue;
    }
  }

  //モーダルコンポーネントをページによって表示・非表示
  function modalShowHide() {
    if(IndexHeaderValue) {
      return <Modal />
    }
  }

  //上記Topにて呼ばれたらModalコンポーネントを返す
  const signHidden = ()=> {
    if(SignInHeaderValue || SignUpHeaderValue) {
      fromAnyWhereHeader().signArea.current.style.display = 'none';
      fromAnyWhereHeader().hamburgerBtn.current.style.display = 'none';
      setSignHidden(true);
    }
  }

  const value = {
    checkSignOut: checkSignOut,
    checkAcountDelete: checkAcountDelete
  }

  function checkSignOut() {
    IndexHeaderValue.modalFlag.current.checked = true;
    IndexHeaderValue.yesBtn.current.id = 'check_sign_out';
    IndexHeaderValue.Overlay.current.id = 'check_sign_out_overlay';
    IndexHeaderValue.Overlay.current.style.zIndex = 1;
    IndexHeaderValue.modalBody.current.innerHTML = 'ログアウトしても宜しいですか？';
    IndexHeaderValue.modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function checkAcountDelete() {
    IndexHeaderValue.modalFlag.current.checked = true;
    IndexHeaderValue.yesBtn.current.id = 'delete_acount';
    IndexHeaderValue.Overlay.current.id = 'delete_acount_overlay';
    IndexHeaderValue.Overlay.current.style.zIndex = 1;
    IndexHeaderValue.modalBody.current.innerHTML = 'このアカウントを削除致しますか？';
    IndexHeaderValue.modalRef.current.animate({
      transform: ['translateY(-50px)', 'translateY(0px)'],
      visibility: ['hidden', 'visible'],
      opacity: [0, 1]
    },{
      fill: 'forwards',
      duration: 150
    });
  }

  function hamburgerOpen() {
    if(IndexHeaderValue.hamburgerOpenflag.current.checked == false) {
      IndexHeaderValue.Overlay.current.id = 'hamburger_open_overlay';
      IndexHeaderValue.modalFlag.current.checked = true;
    }
    else {
      IndexHeaderValue.Overlay.current.id = '';
      IndexHeaderValue.modalFlag.current.checked = false;
    }
  }

  useEffect(()=> {
    signHidden();
  }, [SignHidden])

  return(
    <>
      <HeaderContext.Provider value={value}>
        <header className={headerStyles.header}>
          {modalShowHide()}
          <div className={headerStyles.headerLogoWrapper}>
            <a href="">
              <Image src="/headerLogo.svg" width={40} height={30} alt="headerロゴ" priority/>
            </a>
          </div>
          <input type="checkbox" id="hamburger_open" className={headerStyles.hamburgerOpenflag} ref={fromAnyWhereHeader().hamburgerOpenflag}/>
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