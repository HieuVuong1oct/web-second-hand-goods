import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'src/layouts/user/home/header';

import Footer from './footer';

export default function HomeMainView() {
  return (
    <div>
      <Header />
      <div
        style={{
          paddingTop: '140px',
          backgroundColor: '#f0f0f0',
          backgroundImage: 'url(/favicon/bg3.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
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
