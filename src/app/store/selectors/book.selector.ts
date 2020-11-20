import { BookState } from './../reducers/book.reducer';
import { createSelector } from '@ngrx/store';
const selectBookStates = (state: BookState) => state;

export const getBookList = createSelector(selectBookStates, (state: BookState) => state.bookList);
