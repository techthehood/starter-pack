import React from 'react';
import ReactDOM from 'react-dom';
import Rocket from './App';

// require('./style.scss');

const root = document.querySelector('.root');

const render = (Component) => {
  ReactDOM.render(
    <div>
      <Component />
      <h2>Im rendering now!!</h2>
    </div>,
    root
  );
};

render(Rocket);

// if (module.hot) {
//   module.hot.accept('./App', () => { render(App); });
// }
