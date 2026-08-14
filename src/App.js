import React from 'react';

import { About, Footer, Header, Resume, Skills, Work, Gallery } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => (
  <div className="app">
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Resume />
    <Gallery />
    <Footer />
  </div>
);

export default App;

