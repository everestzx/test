import React from 'react';
import '../../App.css';
import Hero from '../Hero';
import Card from '../Card';
import Footer from '../Footer';
import FAQ from './FAQ';

function Home({ isLoggedIn }) {
  if (!isLoggedIn) {
    return (
      <>
        <Hero />
        <FAQ />
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Card />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;
