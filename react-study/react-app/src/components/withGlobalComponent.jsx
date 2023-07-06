import React from 'react';
import Home from './Home';

const withGlobalComponent = (WrappedComponent) => {
  return () => (
    <div>
      <Home />
      <WrappedComponent />
    </div>
  );
};

export default withGlobalComponent;
