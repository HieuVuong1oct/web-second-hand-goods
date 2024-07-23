import React from 'react';

import Header from 'src/sections/home/header'; 
import Content from 'src/sections/home/content'; 

import Navbar from './navbar/navbar';

export default function HomeView() {
  return (
    <div>
      <Header />
      <Navbar />
      <Content />
      
    </div>
  );
}
