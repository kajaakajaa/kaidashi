import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header, Footer } from '../component/index';
import React, { useEffect, useRef, createRef, createContext, useState } from 'react';
export const IndexHeaderContext = createContext();
import { Observer } from '../lib/IntersectionObserver';
import { Link as Scroll } from 'react-scroll';

export async function getServerSideProps() {
  let query = {};
      query['user_id'] = 1;
  const result = await fetch('https://kajaaserver.com/sumunaka_php/sql_data.php?mode=set_list_data', {
    method: 'POST',
    body: JSON.stringify(query)
  });

  let data = {};
  data['dataProps'] = await result.json();
  data['user_id'] = 1; // 仮
  return{
    props: {data}
  }
}

export default function Index({data}) {
  const signArea = useRef(null);
  const updateItemNumberRefs = useRef([]);
  const itemDeleteBtnRefs = useRef([]);
  const hamburgerBtn = useRef(null);
  const observeTarget = useRef(null);
  const toTop = useRef(null);
  const registItemBtn = useRef(null);
  const purchaseStatusFlagRefs = useRef([]);
  const purchaseStatusBtnRefs = useRef([]);

  //topボタンの表示・非表示処理の為のdom
  const observerDoms = {
    observeTarget: observeTarget,
    toTop: toTop
  }
  
  //レコードの数だけuseRefのref属性をつける(以下for文)
  for(let i = 0; i < data['dataProps'].length; i++) {
    updateItemNumberRefs.current[i] = createRef(); //updateItemNumberRefs の配列の中に個々の ref が入っていて、参照する時は ' updateItemNumberRefs.current[i]' で呼び出す。
  }

  for(let i = 0; i < data['dataProps'].length; i++) {
    itemDeleteBtnRefs.current[i] = createRef();
  }

  for(let i = 0; i < data['dataProps'].length; i++) {
    purchaseStatusFlagRefs.current[i] = createRef();
  }

  for(let i = 0; i < data['dataProps'].length; i++) {
    purchaseStatusBtnRefs.current[i] = createRef();
  }

  const value = {
    signArea: signArea,
    hamburgerClose: hamburgerClose,
    hamburgerBtn: hamburgerBtn
  }

  //ログアウト・退会エリアの表示
  function signAreaShow() {
    const signAreaStyle = signArea.current;
    Object.assign(signAreaStyle.style, {
      display: 'flex'
    });
    
    Object.assign(hamburgerBtn.current.style, {
      display: 'flex'
    });
  }

  //新規商品登録ボタンのレスポンシブで役割切り替え
  function switchRegistBtn() {
    const registItemSwitch = registItemBtn.current;
    registItemSwitch.addEventListener('click', ()=> {
      if(window.innerWidth <= 767) {
        console.log('ipad以下');
      }
      else {
        console.log('pc');
      }
    });
  }

  //serverSidePropsに記述する（tbodyにレンダリングするデータ）※関数ではなく、変数であることに注意。
  const itemList = data['dataProps'].map((item, index)=> {
    if(data['dataProps'].length >= 1) {
      let statusFlag = item['purchase_status'] == 0 ? false : true;
      let purchase_status = statusFlag == false ? <span ref={purchaseStatusBtnRefs.current[index]} style={{backgroundColor: '#00187C'}}>済</span> : <span ref={purchaseStatusBtnRefs.current[index]} style={{backgroundColor: '#9F0000'}}>未</span>;
      return(
        <li key={index} className={indexStyles.itemIndex}>
          <div><span>{item['item_name']}</span></div>
          <div>{item['price']} 円</div>
          <div className={indexStyles.Spinner}>
            <div className={indexStyles.spinnerWrapper}>
              <span className={indexStyles.spinnerDown} onClick={(e)=> {spinnerUpDown(e, 'Decrease')}}></span>
              <input type="number" min="0" name="update_item_number" step="1" id={'update_item_number'+ index} ref={updateItemNumberRefs.current[index]} />
              <span className={indexStyles.spinnerUp} onClick={(e)=> {spinnerUpDown(e, 'Increase')}}></span>
              <span>&nbsp;個</span>
            </div>
          </div>
          <div>
            <input type="checkbox" name="status_flag" id={"status_flag" + index} ref={purchaseStatusFlagRefs.current[index]} defaultChecked={statusFlag} />
            <label htmlFor={"status_flag" + index}>{purchase_status}</label>
          </div>
          <div ref={itemDeleteBtnRefs.current[index]} id={'item_delete' + index}><span>削除</span></div>
        </li>
      )
    }
  });

  //増減ボタン
  function spinnerUpDown(e, status) {
    if(status == 'Decrease') {
      const target = e.target;
      const number = target.nextElementSibling;
      number.stepDown();
    }
    else if(status == 'Increase') { //ーボタン
      const target = e.target;
      const number = target.previousElementSibling;
      number.stepUp();
    }
  }

  function hamburgerClose(e) {
    const signAreaWrapper = e.target.children[0];
    signAreaWrapper.animate({
      right: [0, '-40vw']
    },{
      fill: 'forwards',
      duration: 150
    });

    e.target.animate({
      background: ['rgb(0 0 0 / 20%)', 'rgb(0, 0, 0, 0)'],
      visibility: ['visible', 'hidden']
    },{
      fill: 'forwards',
      duration: 200
    });
  }

  function reverseFlag() {
    data['dataProps'].forEach((e, i)=> {
      let Btn = purchaseStatusBtnRefs.current[i].current;
      Btn.addEventListener('click', (e)=> {
        if(e.target.innerHTML == '未') {
          e.target.style.backgroundColor = 'rgb(0, 24, 124)';
          e.target.innerHTML = '済';
        }
        else {
          e.target.style.backgroundColor = 'rgb(159, 0, 0)';
          e.target.innerHTML = '未';
        }
      })
    });
  }

  function setList() {
    //ログアウト・退会の表示
    signAreaShow();
    Observer(observerDoms);
    switchRegistBtn();
    reverseFlag();

    data['dataProps'].forEach((item, index)=> { //データ数(レコード数)を取得
      updateItemNumberRefs.current[index].current.value = item['number'];
    });
  }

  if(data['user_id'] == 1) {
    useEffect(()=> {
      setList();
      
      return()=> {}
    }, []);

    return(
      <>
        <Head>
          <title>Kaidashi</title>
          <meta name="robots" content="noindex, nofollow" />
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={indexStyles.container} id="top">
          <IndexHeaderContext.Provider value={value}>
            <Header />
          </IndexHeaderContext.Provider>
          <main className={indexStyles.main}>
            <div className={indexStyles.observeTarget} ref={observeTarget}></div> 
            <div className={indexStyles.mainWrapper}>
              <form className={indexStyles.registItem} onSubmit={(e)=> {e.preventDefault()}}>
                <div>
                  <div>
                    <label htmlFor="item_name">品名</label>
                    <input type="text" name="item_name" id="item_name" />
                  </div>
                  <div>
                    <label htmlFor="price">価格</label>
                    <input type="number" min="0" name="price" id="price" />
                  </div>
                  <div>
                    <label htmlFor="regist_item_number">個数</label>
                    <input type="number" min="0" name="regist_item_number" id="regist_item_number" />
                  </div>
                </div>
                <div><input type="submit" value="新規商品登録" className={indexStyles.registItemBtn} ref={registItemBtn} /></div>
              </form>
              <form onSubmit={(e)=> {e.preventDefault();}} id="item_update" className={indexStyles.itemIndexWrapper}>
                <ul>
                  {itemList} {/*動的なレイアウトは上記で定義*/}
                </ul>
              </form>
              <input type="submit" form="item_update" value="更新" className={indexStyles.updateBtn} />
              <div className={indexStyles.toTopWrapper} ref={toTop} alt="topへ戻る" title="topへ戻る">
                <Scroll to="top" smooth={true} duration={600}></Scroll>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    )
  }
  else {
    return(
      <>
      <Head>
        <title>Not SignIn</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>出直してこい！！</h1>
      </>
    )
  }
}
