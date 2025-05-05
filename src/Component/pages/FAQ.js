import React, { useState } from 'react';
import '../stylez/FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "How to apply for membership/loan online?",
      answer: "Visit our online portal and fill out the application form for membership or loan."
    },
    {
      question: "When can I avail loan products?",
      answer: "Once you're a verified member, you can apply for loan products anytime during business hours."
    },
    {
      question: "Can I avail loans as an associate member?",
      answer: "Associate members may have limited access. Please contact our office for eligibility."
    },
    {
      question: "What is the difference between a Regular and Associate Member?",
      answer: "Regular members have voting rights and full privileges. Associate members do not vote but may still avail services."
    },
    {
      question: "What are the advantages of a cooperative vs. other business forms?",
      answer: "Cooperatives are member-owned and share profits, fostering community growth and fairness."
    },
    {
      question: "What are the benefits I can get from GSAC?",
      answer: "GSAC provides financial services, dividends, education programs, and community support."
    },
    {
      question: "How frequent do we have to deposit in the cooperative?",
      answer: "Monthly deposits are encouraged, but frequency can depend on your agreement or plan."
    }
  ];
  
  return (
    <div className="faq-container">
      <h2>Common Questions</h2>
      <p className="subtext">Question not here? You may contact us or leave a message at our Facebook page.</p>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              <span>{item.question}</span>
              <span className={`chevron ${activeIndex === index ? 'rotate' : ''}`}>&#9662;</span>
            </div>
            {activeIndex === index && <div className="faq-answer">{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;