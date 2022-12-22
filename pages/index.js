import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header, Footer } from '../component/index';
import React, { useEffect, useRef, createRef, createContext } from 'react';
export const IndexHeaderContext = createContext();
import { Observer } from '../lib/IntersectionObserver';
import { Link as Scroll } from 'react-scroll';

// export async function getServerSideProps() {
  // let query = {};
  //     query['user_id'] = 1;
  //     query['menu_id'] = 2;
  // let data = {};
  // let data = null;
  // data['dataprops'] = await setListData(query);
  // return{
  //   props: {data}
  // }
// }

export default function Index({data}) {
  const signArea = useRef(null);
  const tbody = useRef(null);
  const updateItemNumberRefs = useRef([]);
  const hamburgerBtn = useRef(null);
  const observeTarget = useRef(null);
  const toTop = useRef(null);
  const registItemBtn = useRef(null);

  //topボタンの表示・非表示処理の為のdom
  const observerDoms = {
    observeTarget: observeTarget,
    toTop: toTop
  }
  
  //レコードの数だuseRefのref属性をつける
  for(let i = 0; i < Items().length; i++) {
    updateItemNumberRefs.current[i] = createRef(); //updateItemNumberRefs の配列の中に個々の ref が入っていて、参照する時は ' updateItemNumberRefs.current[i]' で呼び出す。
  }

  const itemDeleteBtnRefs = useRef([]);
  for(let i = 0; i < Items().length; i++) {
    itemDeleteBtnRefs.current[i] = createRef();
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
  
   //※疑似データ
  function Items() {
    let items = [];
        items = [
          {'品名': '納豆', '価格': 10000, '個数': 5, 'status': 1},
          {'品名': '牛乳', '価格': 150, '個数': 1, 'status': 0},
          {'品名': 'ブロッコリースプラウトブロッコリースプラウト', '価格': 110, '個数': 1, 'status': 1}
        ];
    return items;
  }
  
  //serverSidePropsに記述する（tbodyにレンダリングするデータ）※関数ではなく、変数であることに注意。
  const itemList = Items().map((item,index)=>{
    if(Items().length >= 1) {
      let statusFlag = item['status'] == 1 ? <span style={{backgroundColor: '#00187C'}}>済</span> : <span style={{backgroundColor: '#9F0000'}}>未</span>;
      return(
        <div key={index} className={indexStyles.itemIndex}>
          <div>{item['品名']}</div>
          <div>{item['価格']} 円</div>
          <div className={indexStyles.spinnerWrapper}>
            <span className={indexStyles.spinnerDown} onClick={(e)=> {spinnerUpDown(e, 'Decrease')}}></span>
            <input type="number" min="0" name="update_item_number" step="1" id={'update_item_number'+ index} key={index} ref={updateItemNumberRefs.current[index]} />
            <span className={indexStyles.spinnerUp} onClick={(e)=> {spinnerUpDown(e, 'Increase')}} id={index}></span>
            <span>&nbsp;個</span>
          </div>
          <div>
            <input type="checkbox" name="status_flag" id="status_flag" />
            <label htmlFor="status_flag" className={indexStyles.statusFlag}>{statusFlag}</label>
          </div>
          <div ref={itemDeleteBtnRefs.current[index]} id={'item_delete' + index}><span>削除</span></div>
        </div>
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

  function setListItem() {
    //ログアウト・退会の表示
    signAreaShow();
    Observer(observerDoms);
    switchRegistBtn();

    Items().forEach((item, index)=> { //Items() → データ数(レコード数)を取得
      updateItemNumberRefs.current[index].current.value = item['個数'];
    });
  }

  useEffect(()=> {
    setListItem();
    
    return()=> {}
  });

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
            <form onSubmit={(e)=> {e.preventDefault}} id="item_update" className={indexStyles.itemIndexWrapper}>
              {/* <table> */}
                {/* <tbody ref={tbody}> */}
                  {itemList} {/*動的なレイアウトは上記で定義*/}
                {/* </tbody> */}
              {/* </table> */}
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
