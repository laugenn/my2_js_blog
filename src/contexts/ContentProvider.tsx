import React, { createContext, useContext, useEffect, useReducer } from "react";

import { ContentModelInterface } from "../../server/models/content";
import { contentApi } from "../apis/content";
import { ContentsProviderActions } from "../enums/Enum";

interface ContextProps {
  children: React.ReactNode;
}

// アクション型
type ContentAction =
  | { type: "init"; payload: ContentModelInterface[] }
  | { type: "add"; payload: ContentModelInterface }
  | { type: "patch"; payload: ContentModelInterface }
  | { type: "delete"; payload: ContentModelInterface };

// Reducer関数
const reducer: React.Reducer<ContentModelInterface[], ContentAction> = (
  contents,
  action,
) => {
  switch (action.type) {
    case ContentsProviderActions.INIT: {
      return action.payload;
    }
    case ContentsProviderActions.ADD: {
      return [...contents, action.payload];
    }
    case ContentsProviderActions.PATCH: {
      const updatedContent = action.payload;
      return contents.map((_content: ContentModelInterface) =>
        _content._id == updatedContent._id ? updatedContent : _content,
      );
    }
    case ContentsProviderActions.DELETE: {
      const deletedContentID = action.payload;
      return contents.filter((_content: ContentModelInterface) => {
        return _content._id != deletedContentID._id;
      });
    }
    default:
      return contents;
  }
};

const contentContext = createContext<ContentModelInterface[]>([]);
const contentDispatchContext = createContext<React.Dispatch<ContentAction>>(
  () => {},
);

/**
 * コンテンツの状態を共有するためのコンテキストProvider
 * @param {object} props: ContextProps
 * @param {React.ReactNode} props.children 要素
 * @returns {React.ReactElement}
 */
const ContextProvider = ({ children }: ContextProps): React.ReactElement => {
  const [contents, dispatch] = useReducer(reducer, []);

  // 初回、全件検索を行う
  useEffect(() => {
    contentApi
      .getAll()
      .then((_contents) => {
        dispatch({
          type: ContentsProviderActions.INIT,
          payload: _contents.data,
        });
      })
      .catch((error) => {
        throw Error(error.response.data.message);
      });
  }, []);

  return (
    <>
      <contentContext.Provider value={contents}>
        <contentDispatchContext.Provider value={dispatch}>
          {children}
        </contentDispatchContext.Provider>
      </contentContext.Provider>
    </>
  );
};

const useContent = () => useContext(contentContext);
const useContentDispatch = () => useContext(contentDispatchContext);

export { ContextProvider, useContent, useContentDispatch };
