import Grid from "@mui/material/Grid2";
import React, { useEffect, useRef, useState } from "react";

import { ContentModelInterface } from "../../server/models/content";
import ProductCard from "../components/products/ProductCard";
import { useContent } from "../contexts/ContentProvider";
import { useSessionLoginCheck } from "../hooks/useFormHandlers";

/**
 * サイドバーの「一覧」を押下した際に表示する画面
 * @returns {JSX.Element}
 */
const ProductList: React.FC = () => {
  // ログイン認可チェック
  useSessionLoginCheck();
  // タイトル検索用
  const [inputSearchWord, setInputSearchWord] = useState<string>("");
  // レンダーが初回かどうか
  const isMounted = useRef<boolean>(false);
  // stateの共有（コンテンツリスト）
  const useContentState: ContentModelInterface[] = useContent();
  // 検索絞り込み結果のコンテンツリスト
  const [filteredContentLists, setFilteredContentList] = useState<
    ContentModelInterface[]
  >([]);
  // 処理中かどうか
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 表示するコンテンツリスト
  const renderProductCard = () => {
    if (isLoading) {
      return <p>読み込み中</p>;
    }

    if (!useContentState || useContentState.length == 0) {
      return <p>登録されていません</p>;
    }
    // 初回レンダー
    if (!isMounted.current) {
      return useContentState.map((data) => {
        return (
          <ProductCard
            key={data._id}
            content={data}
          />
        );
      });
    }

    // 2回目以降のレンダー
    // 絞り込み後の表示リストがない場合
    if (filteredContentLists.length == 0) {
      // 検索ワードがない場合、初期取得したリストを表示
      if (inputSearchWord.length == 0) {
        return useContentState.map((data) => {
          return (
            <ProductCard
              key={data._id}
              content={data}
            />
          );
        });
      } else {
        // 検索ワードでヒットしなかった場合、メッセージ表示
        return <p>検索結果は0件です</p>;
      }
    }

    // 絞り込み結果のリストを表示
    return filteredContentLists.map((data) => {
      return (
        <ProductCard
          key={data._id}
          content={data}
        />
      );
    });
  };

  // 初回レンダリング時のみ発火
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
  }, []);

  // 検索ワードが入力されたとき発火
  useEffect(() => {
    const filteredData = useContentState.filter((row) => {
      return row.title.startsWith(inputSearchWord);
    });
    // 検索ワードでヒットしたコンテンツを格納
    setFilteredContentList(filteredData);
  }, [inputSearchWord]);

  // 画面切り替え
  useEffect(() => {
    setIsLoading((prev) => !prev);
    setTimeout(() => {
      setIsLoading((prev) => !prev);
    }, 1000);
  }, [useContentState]);

  return (
    <>
      <div className="search">
        <h3>検索</h3>
        <input
          type="text"
          size={50}
          value={inputSearchWord}
          placeholder="タイトル検索が可能です（前方一致）"
          onChange={(e) => setInputSearchWord(e.target.value)}
        ></input>
      </div>

      <div className="result">
        <h3>登録されているコンテンツ一覧</h3>
        <Grid
          container
          spacing={6}
          rowSpacing={1}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {renderProductCard()}
        </Grid>
      </div>
    </>
  );
};

export default ProductList;
