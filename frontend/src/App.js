import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Location from './components/main_page/Location';
import DetailPage from './components/detail_page/DetailPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
// import StatisticsPage from './components/statistics_page/StatisticsPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingLeft: '250px', minHeight: 'calc(300vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Location} />
          <Route exact path="/detail/:videoId" component={DetailPage} />
          {/* <Route exact path="/statistics" component={StatisticsPage} /> */}
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
