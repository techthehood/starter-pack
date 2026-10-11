import React from 'react';
import SampleStore from "./sampleStore";

const SampleContext = React.createContext();

const SampleProvider = (props) => {
  return (
    <SampleContext.Provider value={props.store ? props.store : SampleStore} SampleStore={props.store ? props.store : SampleStore} >
      {props.children}
    </SampleContext.Provider>
  );
}

export {
  SampleProvider,
  SampleContext
}