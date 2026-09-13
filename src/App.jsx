import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import AppContext from './AppContext';
import MainApp from './MainApp';
import GlobalStyles from './theme/GlobalStyles';
import SunsetBackground from './components/SunsetBackground';
import useSunsetMode from './hooks/useSunsetMode';
import { lightTheme, darkTheme } from './theme/themes';

function App() {
  const sunset = useSunsetMode();

  return (
    <AppContext.Provider value={{ sunset }}>
      <ThemeProvider theme={sunset.isDusk ? darkTheme : lightTheme}>
        <GlobalStyles />
        <SunsetBackground />
        <div className="App">
          <BrowserRouter>
            <MainApp />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
