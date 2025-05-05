import React from 'react';
import '../App.css';
import './stylez/Hero.css';
import { Button } from './Button';

function Hero() {
  return (
    <div className='hero-container'>
      <div className='hero-left'>
        <img
          src="./images/Good team-amico.svg"
          alt="PASCCO Intro"
          className='hero-image'
        />
      </div>
      <div className='hero-right'>
        <img
          src="./images/logo.png"
          alt="PASCCO Logo"
          className="hero-logo"
        />
        <h1 className='hero-title'>
          <span style={{ color: '#0c3778' }}>P</span>
          <span style={{ color: '#0c3778' }}>A</span>
          <span style={{ color: '#d47616' }}>S</span>
          <span style={{ color: '#d47616' }}>C</span>
          <span style={{ color: '#0bbfc9' }}>C</span>
          <span style={{ color: '#0bbfc9' }}>O</span>
        </h1>
        <h2 className='hero-subtitle'>
          <span style={{ color: '#0c3778' }}>Progressive Alliance </span>
          <span style={{ color: '#d47616' }}>Savings Credit </span>
          <span style={{ color: '#0bbfc9' }}>Cooperative</span>
        </h2>
        <p className='hero-text'>
          PASCCO (Progressive Alliance Savings Credit Cooperative) may be new, but we’re built on a strong vision:
          to uplift our members through honest, reliable, and people-centered financial services. As we begin our journey,
          we’re inviting you to grow with us — to save smarter, borrow with confidence, and be part of a cooperative that
          puts your needs first. Trust in a fresh start. Trust in PASCCO.
        </p>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
          Grow with PASCCO
        </Button>
      </div>
    </div>
  );
}

export default Hero;
