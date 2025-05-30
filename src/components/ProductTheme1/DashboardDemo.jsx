import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Clock, Navigation, Car } from 'lucide-react';
import './styles/DashboardDemo.css';

const DashboardDemo = ({ dashboardImage,applications }) => {
  const alerts = [
    {
      icon: <Clock size={28} />,
      title: "Parking Violation Alerts",
      description: "Get instant notifications when your vehicle is parked in unauthorized locations."
    },
    {
      icon: <Navigation size={28} />,
      title: "Route Deviation",
      description: "Know immediately if your vehicle deviates from the predefined route or schedule."
    },
    {
      icon: <Car size={28} />,
      title: "Theft Alerts",
      description: "Receive immediate alerts if your bike moves when it shouldn't, preventing theft."
    }
  ];

  return (
    <section className="dashboard-demo section-padding">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col lg={10} className="text-center">
            <div 
              className="dashboard-image-container" 
              data-aos="fade-up"
            >
              <img 
                src={dashboardImage} 
                alt="Vehicle Tracking Dashboard" 
                className="dashboard-image img-fluid" 
              />
              <div className="overlay-element element-1">
                <div className="blob-shape"></div>
              </div>
              <div className="overlay-element element-2">
                <div className="blob-shape"></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {applications.slice(3,7).map((alert, index) => (
            <Col md={4} sm={12} key={index}>
              <div 
                className="alert-card" 
                data-aos="fade-up" 
                data-aos-delay={100 * index}
              >
                <div className="feature-icon-3">
                  {/* {alert.icon} */}
                  <img src={alert.image} alt={alert.name} className='icons-size-dec'/>
                </div>
                <h4 className="alert-title">{alert.name}</h4>
                <p className="alert-description">{alert.desc}</p>
              </div>
            </Col>
          ))}
        </Row>
        <Row className="mt-5">
          <Col lg={8} md={10} className="mx-auto">
            <div className="cta-box" data-aos="fade-up">
              <h3>TRY IT TODAY</h3>
              <p>Way4Track offers tracking and monitoring services for your personal vehicle</p>
              <button className="btn btn-accent">Try it today</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DashboardDemo;