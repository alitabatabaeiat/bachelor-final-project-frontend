import React  from 'react';
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import RTL from './RTL';
import Toasts from './components/Toasts/Toasts';


Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

Chart.defaults.global.defaultFontFamily = 'Vazir';

function App(props) {
  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={props.history}>
          <Routes/>
          <Toasts />
        </ConnectedRouter>
      </ThemeProvider>
    </RTL>
  );
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
