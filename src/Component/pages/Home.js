import React from 'react';
import '../../App.css';
import Hero from '../Hero';
// import Card from '../Card';
import Footer from '../Footer';
import FAQ from './FAQ';
import MemberDash from './MemberDash';
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
      <MemberDash/>
      {/* <Card /> */}
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;
