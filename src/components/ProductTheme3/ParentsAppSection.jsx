import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Map, Bell, CheckSquare } from "lucide-react";

const FeatureBox = ({ number, title, description, delay }) => {
  return (
    <motion.div
      className="bg-white rounded-4 shadow-sm p-4 d-flex align-items-start gap-3 hover-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div
        className="bg-warning bg-opacity-25 text-warning fw-bold fs-5 d-flex align-items-center justify-content-center rounded-3"
        style={{ width: "40px", height: "40px" }}
      >
        {number}
      </div>
      <div>
        <h5 className="fw-semibold text-dark mb-1">{title}</h5>
        <p className="text-muted small mb-0">{description}</p>
      </div>
    </motion.div>
  );
};

const AccordionItem = ({ title, icon, isOpen, onClick, children }) => {
  return (
    <div className="border-bottom py-3">
      <button
        className="d-flex justify-content-between align-items-center w-100 text-start fw-medium text-dark btn btn-link px-0"
        onClick={onClick}
      >
        <div className="d-flex align-items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <span className="fs-4">{isOpen ? "−" : "+"}</span>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isOpen && <div className="pt-2 text-muted small">{children}</div>}
      </motion.div>
    </div>
  );
};

const ParentsAppSection = ({
  app,
  chooseImage,
  chooseTitle,
  chooseDescription,
  steps,
  title,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  console.log(app.name, "parents");

  const [openAccordion, setOpenAccordion] = React.useState(0);
  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: "Attendance",
      icon: <CheckSquare size={18} className="text-warning" />,
      content:
        "SmartBus offers advanced tools for tracking and maintaining student attendance...",
    },
    {
      title: "Student Data Management",
      icon: <Map size={18} className="text-warning" />,
      content:
        "Store and manage comprehensive student data securely, including contact information...",
    },
    {
      title: "Better Drivers",
      icon: <Bell size={18} className="text-warning" />,
      content:
        "Our system implements driver behavior monitoring to ensure safety...",
    },
  ];

  return (
    <section ref={ref} className="p-4 my-4 rounded grayDoodles">
      <div className="mb-5 row gy-4 align-items-start">
        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <img src={app.image} alt={app.name} />
        </motion.div>

        <div className="col-lg-6 d-flex flex-column gap-3">
          <span className="text-secondary text-uppercase small">FEATURES</span>
          <h2 className="fw-bold text-warning mt-2 fs-2 mb-3">{app.name}</h2>

          <p className="text-muted mb-3">{app.shortDescription}</p>
          {app.points?.map((point, index) => (
            <FeatureBox
              key={index}
              number={String(index + 1).padStart(2, '0')} // e.g., "01", "02", "03"
              title={point.title || "Title Missing"}
              description={point.desc || "Description Missing"}
              delay={0.1 * (index + 1)} // Staggered animation delay
            />
          ))}
        </div>

      </div>

      <div className="row gy-4 align-items-center">
        <motion.div
          className="col-lg-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-secondary text-uppercase small">
            WHY CHOOSE US?
          </span>
          <h2 className="fw-bold text-warning mt-2 fs-2 mb-4">
            Why is {title} the smart choice?
          </h2>
          <div className="bg-white rounded-4 shadow-sm p-4">
            {steps.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                icon={item.icon}
                isOpen={openAccordion === index}
                onClick={() => toggleAccordion(index)}
              >
                {item.description}
              </AccordionItem>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="col-lg-6 position-relative"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.div
            className="position-absolute top-0 end-0 translate-middle bg-primary text-white px-3 py-2 rounded shadow"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <span className="fw-medium">Real-time updates</span>
          </motion.div>
          <motion.img
            src={chooseImage}
            alt="Parents App and Safety Graph"
            className="rounded-4 shadow w-100 object-fit-cover"
            style={{ height: "500px", objectFit: "cover" }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default ParentsAppSection;
