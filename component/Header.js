import { Link as Scroll } from 'react-scroll';
import Link from 'next/link';
import Image from 'next/image';
import headerStyles from '../styles/header.module.css';
import React, { useEffect, useRef, createContext } from 'react';
export const ParentContext = createContext();
import { Modal } from './index';

export default function Header(props) {
  const modalFlag = useRef(null);
  const Overlay = useRef(null);
  const modalRef = useRef(null);
  const modalBody = useRef(null);
  const modalFooter = useRef(null);
  const yesBtn = useRef(null);
  const noBtn = useRef(null);

  const value = {
    modalFlag: modalFlag,
    Overlay: Overlay,
    modalRef: modalRef,
    modalBody: modalBody,
    modalFooter: modalFooter,
    yesBtn: yesBtn
  }

  function checkSignOut() {
    yesBtn.current.id = 'check_sign_out';
    modalFlag.current.checked = true;
    Overlay.current.style.zIndex = 2;
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
    yesBtn.current.id = 'delete_acount';
    modalFlag.current.checked = true;
    Overlay.current.style.zIndex = 2;
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

  useEffect(()=> {
  })

  return(
    <>
      <ParentContext.Provider value={value}>
        <Modal />
      </ParentContext.Provider>
      <header className={headerStyles.header}>
        <div className={headerStyles.headerLogoWrapper}>
          <Scroll to="to" smooth={true} duration={600}>
            <Image src="/headerLogo.svg" width={40} height={30} alt="topへ戻る" title="topへ戻る" priority/>
          </Scroll>
        </div>
        <div className={headerStyles.signArea} ref={props.signArea}>
          <div className={headerStyles.signAreaWrapper}>
            <p onClick={checkSignOut} className={headerStyles.signOutBtn}>ログアウト</p>
            <p onClick={checkAcountDelete} className={headerStyles.acountDeleteBtn}>退会</p>
          </div>
        </div>
      </header>
    </>
  )
}