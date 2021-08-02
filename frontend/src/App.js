import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Main from './components/main_page/Main';
import DetailPage from './components/detail_page/DetailPage';
import NavBar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
// import StatisticsPage from './components/statistics_page/StatisticsPage';

const theme = unstable_createMuiStrictModeTheme();

function App() {

  return (
    <ThemeProvider theme = {theme}>
    <BrowserRouter>
      <NavBar />
      <div style={{ paddingTop: '30px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/detail/:videoId" component={DetailPage} />
          {/* <Route exact path="/statistics" component={StatisticsPage} /> */}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
