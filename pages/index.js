// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Head from 'next/head';
import indexStyles from '../styles/index.module.css';
import { Header } from '../component/index';
import React, { useEffect, useRef } from 'react';

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

  function signAreaShow() {
    const signAreaWrapper = signArea.current;
    Object.assign(signAreaWrapper.style, {
      display: 'block'
    });
  }
  
  let items = [];
      items = [
        {'品名': '納豆', '価格': 100, '個数': 2, 'status': 1},
        {'品名': '牛乳', '価格': 150, '個数': 1, 'status': 0},
        {'品名': 'ブロスプ', '価格': 110, '個数': 1, 'status': 1} //※← 疑似DBqueryデータ
      ];
  const itemList = items.map((item,index)=>{
    console.log(item);
    if(items.length >= 1) {
      let status = item['status'] == 1 ? '済' : '未';
      return(
        <tr key={index}>
          <td>{item['品名']}</td>
          <td>{item['価格']} 円</td>
          <td>{item['個数']} 個</td>
          <td>{status}</td>
        </tr>
      )
    }
  });
    

  useEffect(()=> {
    signAreaShow();
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
      <Header signArea={signArea}/>
      <main>
        <div className={indexStyles.container} id="top">
          <form className={indexStyles.registItem} onSubmit={(e)=> {e.preventDefault}}>
            <div>
              <label htmlFor="item_name">品名</label>
              <input type="text" name="item_name" id="item_name" />
            </div>
            <div>
              <label htmlFor="price">価格</label>
              <input type="number" name="price" id="price" />
            </div>
            <div>
              <label htmlFor="number">個数</label>
              <input type="number" name="number" id="number" />
            </div>
            <div><input type="submit" value="新規商品登録" /></div>
          </form>
          <table>
            <tbody ref={tbody}>
              {itemList}
            </tbody>
          </table>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
}
