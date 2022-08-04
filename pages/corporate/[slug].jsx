import { useRouter } from 'next/router';
import React, { useState, useLayoutEffect } from 'react';
import Link from 'next/link';
import Helmet from "react-helmet";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../../style/index.module.scss';

//HTML
const Post = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div className="container">
      <Helmet>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <Header />
      <main className={styles.main}>
        {props.data.map((data) => {

          return (
            <div className="container">{console.log(data)}
              {
                data ? (<>
                  <h2>{"カテ1-1：" + data.title.rendered}</h2>
                  <p>WordPressAPIでスラッグ検索して該当のデータを絞った状態で表示</p>
                  <div className="grid">
                    {data.content.rendered}
                  </div></>) : (<>データ読込中</>)
              }
              <Link href={"/corporate/" + slug + "/test"}>
                <button>詳細へ</button>
              </Link>

            </div>
          );
        })}
      </main >

      <Footer />

    </div >)
}

//API呼び出し
Post.getInitialProps = async (context) => {

  //URL(postID)を取得
  const { asPath } = context;
  const postId = asPath.split("/")[2];

  const res = await fetch(
    'https://www.next-doorrr.com/knowledge-box/wp-json/wp/v2/posts?slug=' + postId
  );
  const data = await res.json();



  return {
    data: data,
  };
};
export default Post;