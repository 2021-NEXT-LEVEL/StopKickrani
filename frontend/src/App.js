import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Location from './components/main_page/Location';
import DetailPage from './components/detail_page/DetailPage';
import GraphPage from './components/graph_page/GraphPage';
import Navbar from './components/navbar/Navbar';
import ReferencePage from './components/reference_page/ReferencePage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{paddingLeft: '310px'}}>
        <Switch>
          <Route exact path="/" component={Location} />
          <Route exact path="/detail/:loc/:videoId" component={DetailPage} />
          <Route exact path="/graph/:loc/:videoId" component={GraphPage} />
          <Route exact path="/reference" component={ReferencePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
