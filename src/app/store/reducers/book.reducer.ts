import { addBook, delBook } from './../actions/book.actions';
import { BookType } from '../models';
import { createReducer, on, Action } from '@ngrx/store';

// 定义初始化值的类型
export interface BookState {
  bookList: Array<BookType>
}

export const initStateBook: BookState = {
  bookList: []
}

const reducer = createReducer(
  initStateBook,
  on(addBook, (state, { book }) => {
    return { bookList: [...state.bookList, book] };
  }),
  on(delBook, (state, { book }) => {
    return { bookList: state.bookList.filter(item => item !== book) };
  })
)

export function bookReducer(state: BookState, action: Action) {
  return reducer(state, action);
}
