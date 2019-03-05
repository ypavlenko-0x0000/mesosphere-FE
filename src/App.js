import React, { Component } from 'react';
import ContentContainer from './containers/ContentContainer';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  render() {
    return <ContentContainer />
  }
}

export default App;

library.add(
  faPlus,
  faMinus
);