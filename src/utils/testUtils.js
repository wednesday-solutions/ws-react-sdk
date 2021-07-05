import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { DEFAULT_LOCALE, translationMessages } from '@src/i18n';
import IntlGlobalProvider from '@components/IntlGlobalProvider';

export const renderWithIntl = children => {
  return render(
    <IntlProvider locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
      <IntlGlobalProvider>{children}</IntlGlobalProvider>
    </IntlProvider>
  );
};

export const getComponentStyles = (Component, props = {}) => {
  renderWithIntl(Component(props));
  const { styledComponentId } = Component(props).type;
  const componentRoots = document.getElementsByClassName(styledComponentId);
  // eslint-disable-next-line no-underscore-dangle
  return window.getComputedStyle(componentRoots[0])._values;
};

export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
export const apiResponseGenerator = (ok, data) => ({
  ok,
  data
});

export default {
  timeout,
  renderWithIntl,
  getComponentStyles,
  apiResponseGenerator
};
