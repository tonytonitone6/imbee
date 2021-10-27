import {
  Reducer,
  FC,
  ReactNode,
  createContext,
  useMemo,
  useContext,
  useReducer,
  Dispatch
} from 'react';

import { CardInfoType } from '@components/QuestionList/QuestionList';

export enum ActionsType {
  SET_SELECTED_TAG = 'SET_SELECTED_TAG',
  SET_LOADING = 'SET_LOADING',
  SET_TAG_LIST = 'SET_TAG_LIST',
  SET_QUESTION_LIST = 'SET_QUESTION_LIST',
  SET_MORE_QUESTION_LIST = 'SET_MORE_QUESTION_LIST',
  GET_MORE_QUESTION = 'GET_MORE_QUESTION'
}

export type TagType = {
  name: string;
};

type StatusType<T> = {
  page: number;
  pageSize: number;
  hasMore: boolean;
  isLoading: boolean;
  error: any;
  data: T[] | [];
};

type IContextType = {
  state: {
    selectedTag: string;
    tags: StatusType<TagType>;
    questions: StatusType<any>;
  };
  dispatch: Dispatch<any>;
};

type IStateType = {
  selectedTag: string;
  tags: StatusType<TagType> | any;
  questions: StatusType<any>;
};

type IActionType = {
  type: string;
  payload: any | any[];
};

export const reducer: Reducer<any, IActionType> = (state, action) => {
  switch (action.type) {
    case ActionsType.SET_LOADING:
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          isLoading: true
        }
      };
    case ActionsType.SET_TAG_LIST:
      return {
        ...state,
        tags: {
          ...state.tags,
          isLoading: false,
          data: [...action.payload]
        }
      };
    case ActionsType.SET_QUESTION_LIST:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: false,
          hasMore: action.payload.hasMore,
          data: [...action.payload.data]
        }
      };
    case ActionsType.SET_MORE_QUESTION_LIST:
      return {
        ...state,
        questions: {
          ...state.questions,
          isLoading: false,
          hasMore: action.payload.hasMore,
          data: [...state.questions.data, ...action.payload.data]
        }
      };
    case ActionsType.GET_MORE_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          page: state.questions.page + 1
        }
      };
    case ActionsType.SET_SELECTED_TAG:
      return {
        ...state,
        selectedTag: action.payload
      };

    default:
      return state;
  }
};

export const GlobalContext = createContext<IContextType>({} as IContextType);

type ContextType = {
  children: ReactNode;
};

const initState = {
  selectedTag: '',
  tags: {
    page: 1,
    pageSize: 10,
    isLoading: false,
    hasMore: true,
    error: null,
    data: []
  },
  questions: {
    page: 1,
    pageSize: 20,
    hasMore: true,
    isLoading: false,
    error: null,
    data: []
  }
};

export const GlobalProvider: FC<ContextType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(GlobalContext);

  if (!context) throw new Error('need provide context!');

  return context;
};

const updateLoadingStatus = (
  dispatch: Dispatch<any>,
  actionsType: string,
  setName: string
) => {
  if (actionsType) {
    dispatch({ type: actionsType, payload: setName });
  }
};

const updateTagList = (dispatch: Dispatch<any>, tags: TagType[]) => {
  const hasTag = tags.length > 0;

  if (hasTag) {
    dispatch({ type: ActionsType.SET_TAG_LIST, payload: tags });
  }
};

const updateSelectTag = (dispatch: Dispatch<any>, tag: string) => {
  if (tag) {
    dispatch({ type: ActionsType.SET_SELECTED_TAG, payload: tag });
  }
};

const updateQuestionListByTag = (
  dispatch: Dispatch<any>,
  questions: CardInfoType[],
  hasMore: boolean
) => {
  const hasQuestion = questions.length > 0;

  if (hasQuestion) {
    dispatch({
      type: ActionsType.SET_QUESTION_LIST,
      payload: { data: questions, hasMore }
    });
  }
};

const updateQuestionListByPage = (
  dispatch: Dispatch<any>,
  questions: CardInfoType[],
  hasMore: boolean
) => {
  const hasQuestion = questions.length > 0;

  if (hasQuestion) {
    dispatch({
      type: ActionsType.SET_MORE_QUESTION_LIST,
      payload: { data: questions, hasMore }
    });
  }
};

const fetchMoreData = (dispatch: Dispatch<any>) =>
  dispatch({ type: ActionsType.GET_MORE_QUESTION });

export {
  useStore,
  updateLoadingStatus,
  updateTagList,
  updateSelectTag,
  updateQuestionListByTag,
  updateQuestionListByPage,
  fetchMoreData
};
