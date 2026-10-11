import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

// import Countdown from './components/Countdown';
import Hero from './components/Hero';
// import About from './components/About';
// import Testimony from './components/Testimony/Testimony';
// import Register from './components/Register/Register';
// import Contact from './components/Contact/Contact';
// import Footer from './components/Footer/Footer';

import { SampleProvider } from './sampleContext';
const sampleStore = require('./sampleStore').default;

const { landing_data } = require('./data');
require('./App.scss');

const App = () => {

  const store = sampleStore;

  const registration = (params) => {
    ReactDOM.render(
      <SampleProvider>
        <Register />
      </SampleProvider>,
      document.querySelector('.modal_cont')
    );
  }

  useEffect(() => {
    // effect
    let register_btn = document.querySelectorAll('.register-now-btn');

    // Array.from()

    register_btn.forEach((entry) => {
      entry.addEventListener('click', registration);
    })


    return () => {
      // cleanup
    }
  }, [])

  const addText = function () {
    this.setState({ name: "And some more scratchy" })
  }

  return (
    <>
      <SampleProvider>
        <Hero {...{ data: landing_data.hero }} />
        {/* <Countdown {...{ data: landing_data.countdown }} /> */}
        {/* <About {...{ data: landing_data.about }} /> */}
        {/* <Testimony {...{data: landing_data.testimony}} /> */}
        {/* <Contact {...{ data: landing_data.contact }} /> */}
        {/* <Footer {...{ data: landing_data.footer }}/> */}
        <div><h2>scratchy app test</h2></div>
      </SampleProvider>
    </>
  )
}

export default App;
