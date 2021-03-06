import { css } from 'astroturf';
import React, { Suspense, StrictMode } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ErrorCatcher } from './partial/error-catcher';
import { SaveToStorage } from './partial/save-to-storage';
import { ScrollToTop } from './partial/scroll-to-top';
import { TopBar } from './topbar';
import { lazy } from './partial/lazy';

const LazyProductsList = lazy(() => import('components/products/products-list'), 'ProductsList');
const LazyCart = lazy(() => import('./cart/cart'), 'Cart');
const LazyNoMatch = lazy(() => import('./no-match'), 'NoMatch');

export const Page = () => (
  <StrictMode>
    <Router>
      <div className={styles.layout}>
        <TopBar />

        <main className={styles.main}>
          <ErrorCatcher>
            <Suspense fallback="Загрузка...">
              <Switch>
                <Route path="/" exact>
                  <LazyProductsList />
                </Route>

                <Route path="/cart/">
                  <LazyCart />
                </Route>

                <Route>
                  <LazyNoMatch />
                </Route>
              </Switch>
            </Suspense>
          </ErrorCatcher>
        </main>

        <SaveToStorage />
        <ScrollToTop />
      </div>
    </Router>
  </StrictMode>
);

const styles = css`
  html {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Montserrat', sans-serif;
    font-display: swap;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  :root {
    --gap: 30px;
  }

  .layout {
    min-width: 320px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .main {
    padding: calc(var(--gap) / 2);
  }
`;
