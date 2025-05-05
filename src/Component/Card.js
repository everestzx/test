import React from 'react';
import './stylez/Card.css'; 
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>NADNADNAD!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/image-9.jpg'
              text='Explore the hidden waterfall deep inside the Amazon Jungle'
              label='NADANADANADA'
              path='/services'
            />
            <CardItem
              src='images/image-9.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              label='NADANADANADA'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/image-9.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              label='NADANADANADA'
              path='/services'
            />
            <CardItem
              src='images/image-9.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              label='NADANADANADA'
              path='/products'
            />
            <CardItem
              src='images/image-9.jpg'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              label='NADANADANADA'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
