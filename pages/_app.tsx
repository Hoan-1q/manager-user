import App, { AppProps } from 'next/app';
import React from 'react';
import { observer, Provider } from 'mobx-react';
import en from '@shopify/polaris/locales/en.json';
// Store
import { commonStore } from 'stores/common';
import { store } from 'stores';
import { AppProvider } from '@shopify/polaris';

import '@shopify/polaris/dist/styles.css';

class MyApp extends App<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store} commonStore={commonStore}>
        <AppProvider i18n={en}>
          <Component {...pageProps} />
        </AppProvider>
      </Provider>

    );
  }
}

export default observer(MyApp);
