import React from 'react';

import Header from 'src/sections/home/header';

import Footer from './footer';
import Navbar from './navbar/navbar';
import Content from './content/content'

export default function HomeMainView() {

  return (
    <div>
      <Header />
      <Navbar />
    <div style={{ paddingTop: '152px' }}>
      <Content/>
      </div>
      <Footer />
    </div>
  );
}
