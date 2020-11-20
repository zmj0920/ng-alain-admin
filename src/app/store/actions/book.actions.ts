import { createAction, props } from '@ngrx/store';
import { BookType } from '../models';
export const addBook = createAction('[添加书籍]', props<{ book: BookType }>());
export const delBook = createAction('[del book]', props<{ book: BookType }>());
