import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'src/sections/home/header';

import Footer from './footer';

export default function HomeMainView() {
  return (
    <div>
      <Header />

      <div
        style={{
          paddingTop: '140px',
          backgroundColor: '#f0f0f0',
          backgroundImage: 'url(/favicon/bg1.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          paddingBottom: '100px',
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
