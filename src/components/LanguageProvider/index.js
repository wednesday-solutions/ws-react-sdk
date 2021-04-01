/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import IntlGlobalProvider from '@components/IntlGlobalProvider';
import { translationMessages } from '@src/i18n';

export function LanguageProvider(props) {
  const messages = { ...translationMessages[props.locale], ...props.messages[props.locale] };
  return (
    <IntlProvider locale={props.locale} key={props.locale} messages={messages}>
      <IntlGlobalProvider>{React.Children.only(props.children)}</IntlGlobalProvider>
    </IntlProvider>
  );
}
LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};
export default LanguageProvider;
