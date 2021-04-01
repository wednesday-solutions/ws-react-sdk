/*
 *
 * LanguageProvider reducer
 *
 */
import { createActions } from 'reduxsauce';
import produce from 'immer';

export const { Types: languageProviderTypes, Creators: languageProviderActions } = createActions({
  changeLocale: ['locale']
});

export const initialState = {
  locale: 'en'
};

/* eslint-disable default-case, no-param-reassign */
export const languageProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case languageProviderTypes.CHANGE_LOCALE:
        draft.locale = action.locale;
        break;
    }
  });

export default languageProviderReducer;
