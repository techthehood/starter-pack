import Rocket from './components/Rocket/Rocket';
import React from 'react';
import ReactDOM from 'react-dom';

// require('./style.scss');

const root = document.querySelector('.root');

const render = (Component) => {
  ReactDOM.render(
      <Component />,
    root
  );
};

render(Rocket);

// if (module.hot) {
//   module.hot.accept('./App', () => { render(App); });
// }
