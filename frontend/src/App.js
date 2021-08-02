import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Location from './components/main_page/Location';
import DetailPage from './components/detail_page/DetailPage';
import GraphPage from './components/graph_page/GraphPage';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Statistics from './components/statistics/Statistics';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{paddingLeft: '310px', paddingTop: '70px'}}>
        <Switch>
          <Route exact path="/" component={Location} />
          <Route exact path="/detail/:videoId" component={DetailPage} />
          <Route exact path="/graph/:videoId" component={GraphPage} />
          <Route exact path="/statistics/:resultId" component={Statistics} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
