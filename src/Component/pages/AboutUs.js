import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../../App.css';
import '../stylez/AboutUs.css';
// import teamworkImage from '../../assets/teamwork.png'; 

export default function AboutUs() {
    const [activeTab, setActiveTab] = useState('about');
    const { ref: missionVisionRef, inView: missionVisionVisible } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <div className="aboutus-container">
            <div className="aboutus-header">
                <div 
                    className={`tab-item ${activeTab === 'about' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('about')}
                >
                    ABOUT US
                </div>
                <div 
                    className={`tab-item ${activeTab === 'core' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('core')}
                >
                    CORE VALUES
                </div>
                <div 
                    className={`tab-item ${activeTab === 'history' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('history')}
                >
                    HISTORY
                </div>
            </div>

            <div className="aboutus-content">
                <div className="aboutus-text">
                    {activeTab === 'about' && (
                        <div className="fade-in">
                            <p>
                                Progressive Alliance Savings Cooperative (PASCCo) is a member-owned financial organization dedicated to offering accessible, inclusive, and affordable financial services to individuals and communities. Founded with the mission of empowering the socio-economic status of our members, PASCCo provides microloans, saving products, and financial literacy initiatives.
                            </p>
                            <p>
                                As a cooperative, our strength lies in the collective power of our members, who all have a similar objective for sustainable growth, mutual support, and financial independence.
                            </p>

                            {/* Mission & Vision Section */}
                            <div ref={missionVisionRef} className={`mission-vision-section ${missionVisionVisible ? 'fade-in' : ''}`}>
                                <div className="mission-card">
                                    <div className="icon">🎯</div>
                                    <h3>MISSION</h3>
                                    <p>
                                        To provide dependable microloan and savings services through moral, open, and member-driven methods 
                                        in order to foster financial well-being and economic empowerment.
                                    </p>
                                </div>

                                <div className="vision-card">
                                    <div className="icon">👁️‍🗨️</div>
                                    <h3>VISION</h3>
                                    <p>
                                        To be leading a community–based cooperative known for promoting sustainable development, 
                                        member empowerment, and financial inclusion.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'core' && (
                        <div className="fade-in">
                            <p><strong></strong></p>
                            <div className="core-values-grid fade-in">
                            <div className="core-value-card">
                                <h3>COMPASSION</h3>
                                <p>We recognize the human side of financial service, responding with care and understanding to members’ individual needs.</p>
                            </div>
                            <div className="core-value-card">
                                <h3>EXCELLENCE</h3>
                                <p>We strive for continuous improvement, professionalism, and quality service in everything we do.</p>
                            </div>
                            <div className="core-value-card">
                                <h3>INCLUSIVENESS</h3>
                                <p>We welcome individuals from all backgrounds, ensuring equal access to services regardless of status.</p>
                            </div>
                            <div className="core-value-card">
                                <h3>COOPERATION</h3>
                                <p>We believe in collective effort. Every member is a co-owner, working toward shared success and mutual upliftment.</p>
                            </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div className="fade-in">
                            <p>
                                PASCCo was founded with the dream of providing accessible financial services to underserved communities. Over the years, it has grown into a pillar of financial empowerment, with thousands of members collectively building a stronger, more financially independent future.
                            </p>
                        </div>
                    )}
                </div>

                <div className="aboutus-image">
                    {/* <img src={teamworkImage} alt="Teamwork" /> */}
                </div>
            </div>
        </div>
    );
}
