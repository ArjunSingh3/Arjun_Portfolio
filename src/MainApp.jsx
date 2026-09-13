import React, { useState, useEffect, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import FallbackSpinner from './components/FallbackSpinner';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PageTransition from './components/PageTransition';
import endpoints from './constants/endpoints';

function MainApp() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetch(endpoints.routes, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <div className="MainApp">
      <NavBar />
      <main className="main">
        <Suspense fallback={<FallbackSpinner />}>
          <AnimatePresence mode="wait">
            <Switch location={location} key={location.pathname}>
              <Route
                exact
                path="/"
                component={() => (
                  <PageTransition>
                    <Home />
                  </PageTransition>
                )}
              />
              {data
                && data.sections.map((route) => {
                  const SectionComponent = React.lazy(() => import('./components/' + route.component));
                  return (
                    <Route
                      key={route.headerTitle}
                      path={route.path}
                      component={() => (
                        <PageTransition>
                          <SectionComponent header={route.headerTitle} />
                        </PageTransition>
                      )}
                    />
                  );
                })}
            </Switch>
          </AnimatePresence>
        </Suspense>
      </main>
    </div>
  );
}

export default MainApp;
