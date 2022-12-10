import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header } from '../component/index';
import React, { useEffect, useRef, createRef, createContext } from 'react';
export const IndexHeaderContext = createContext();

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
    
    // const hamburgerBtn = hamburgerBtn.current;
    Object.assign(hamburgerBtn.current.style, {
      display: 'flex'
    });
  }
  
   //※疑似データ
  function Items() {
    let items = [];
        items = [
          {'品名': '納豆', '価格': 100, '個数': 5, 'status': 1},
          {'品名': '牛乳', '価格': 150, '個数': 1, 'status': 0},
          {'品名': 'ブロッコリースプラウト', '価格': 110, '個数': 1, 'status': 1}
        ];
    return items;
  }
  
  //serverSidePropsに記述する（tbodyにレンダリングするデータ）※関数ではなく、変数であることに注意。
  const itemList = Items().map((item,index)=>{
    if(Items().length >= 1) {
      let statusFlag = item['statusFlag'] == 1 ? '済' : '未';
      return(
        <tr key={index}>
          <td>{item['品名']}</td>
          <td>{item['価格']} 円</td>
          <td>
            <div className={indexStyles.spinnerWrapper}>
              <span className={indexStyles.spinnerDown} onClick={(e)=> {spinnerUpDown(e, 'Decrease')}}></span>
              <input type="number" min="0" name="update_item_number" step="1" id={'update_item_number'+ index} key={index} ref={updateItemNumberRefs.current[index]} />
              <span className={indexStyles.spinnerUp} onClick={(e)=> {spinnerUpDown(e, 'Increase')}} id={index}></span>
            </div>
            <label htmlFor="update_item_number">&nbsp;個</label>
          </td>
          <td>
            <input type="checkbox" name="status_flag" id="status_flag" />
            <label htmlFor="status_flag">{statusFlag}</label>
          </td>
          <td key={index} ref={itemDeleteBtnRefs.current[index]} id={'item_delete' + index}>削除</td>
        </tr>
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
      <IndexHeaderContext.Provider value={value}>
        <Header />
      </IndexHeaderContext.Provider>
      <main className={indexStyles.main}>
        <div className={indexStyles.container} id="top">
          <form className={indexStyles.registItem} onSubmit={(e)=> {e.preventDefault}}>
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
            <div><input type="submit" value="新規商品登録" /></div>
          </form>
          <form onSubmit={(e)=> {e.preventDefault}} id="item_update">
            <table>
              <tbody ref={tbody}>
                {itemList} {/*動的なレイアウトは上記で定義*/}
              </tbody>
            </table>
          </form>
          <input type="submit" form="item_update" value="更新" />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
