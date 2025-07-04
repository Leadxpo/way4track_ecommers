import React, { useEffect, useState } from "react";
import ApiService from "../Services/ApiServices";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Session Components
import SessionOne from "./sessions/SessionOne";
import SessionTwo from "./sessions/SessionTwo";
import SessionThree from "./sessions/SessionThree";
import SessionFour from "./sessions/SessionFour";
import SessionFive from "./sessions/SessionFive";
import SessionSix from "./sessions/SessionSix";
import SessionSeven from "./sessions/SessionSeven";
import SessionEight from "./sessions/SessionEight";
import SessionNine from "./sessions/SessionNine";
import SessionTen from "./sessions/SessionTen";
import DefaultSession from "./sessions/DefaultSession";

// New Components
import BannerCarousel from "./sections/BannerCarousel";
import ProductIconSection from "./sections/ProductIconSection";
import DevicesSection from "./sections/DevicesSection";

import "./Promotion.css";

const PromotionAPI = () => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, "");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promotionPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const promotionResponse = await ApiService.post(
          "/promotion/getAllPromotions",
          promotionPayload
        );
        const promotionData = promotionResponse?.data || [];

        const seen = new Set();
        const uniquePromotions = promotionData.filter((item) => {
          if (!item.id || seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        });

        setPromotions(uniquePromotions);

        const productPayload = {
          companyCode: "WAY4TRACK",
          unitCode: "WAY4",
        };

        const productResponse = await ApiService.post(
          "website-product/getWebsiteProductDetails",
          productPayload
        );
        const productData = productResponse?.data || [];

        const formattedProducts = productData.map((product) => ({
          ...product,
          homeBanner:
            typeof product.homeBanner === "string"
              ? product.homeBanner.split(",").map((url) => url.trim())
              : [],
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPromotions([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleButtonActions = {
    call: (callNumber) =>
      (window.location.href = `tel:${callNumber || "1234567890"}`),
    knowMore: (themeLink) => navigate(themeLink || "/more-info"),
    enquiry: (promo) => console.log("Enquiry for:", promo),
  };

  const renderPromotionByTheme = (promo) => {
    const normTheme = normalize(promo.theme);
    switch (normTheme) {
      case "session1":
        return <SessionOne promo={promo} />;
      case "session2":
        return <SessionTwo promo={promo} />;
      case "session3":
        return <SessionThree promo={promo} />;
      case "session4":
        return <SessionFour promo={promo} />;
      case "session5":
        return (
          <SessionFive
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session6":
        return (
          <SessionSix
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session7":
        return (
          <SessionSeven
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session8":
        return (
          <SessionEight
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session9":
        return (
          <SessionNine
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      case "session10":
        return (
          <SessionTen
            promo={promo}
            handlers={handleButtonActions}
            navigate={navigate}
          />
        );
      default:
        return <DefaultSession promo={promo} />;
    }
  };

  const customOrder = [
    "session1",
    "session2",
    "session3",
    "session5",
    "session6",
    "session7",
    "session8",
    "session9",
    "session10",
    "session4",
  ];

  const reorderedPromotions = [...promotions].sort((a, b) => {
    const aIndex = customOrder.indexOf(normalize(a.theme));
    const bIndex = customOrder.indexOf(normalize(b.theme));
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading data...</span>
        </div>
        <p className="mt-2">Loading content...</p>
      </div>
    );
  }

  const allBanners = products.flatMap((product) => product.homeBanner || []);
  const firstProduct = products.length > 0 ? products[0] : null;

  return (
    <div
      className="container-fluid promotion-container"
      // style={{ paddingLeft: "0px", paddingRight: "0px" }}
    >
      {/* Banner Section */}
      <div className="row" data-aos="fade-down">
        <div className="col-12">
          <BannerCarousel banners={allBanners} productsData={products} />
        </div>
      </div>

      {/* Dynamic Promotions with AOS */}
      {reorderedPromotions.map((promo, index) => {
        const normTheme = normalize(promo.theme);

        return (
          <React.Fragment key={promo.id || index}>
            <div className="promotion-row">
              {renderPromotionByTheme(promo)}
            </div>

            {/* Product Icons after session1 */}
          {normTheme === "session1" && products.length > 0 && (
  <div className="devices-section-wrapper" data-aos="fade-right">
    <div className="devices-section py-4">
      <p className="stop-solutions text-center">
        A One Stop Solution for your Personal and Commercial GPS services
      </p>
      <div className="row mb-4 px-3 px-sm-4 px-md-5">
        {products.map((product, idx) => (
          <div
            className="col-md-4 mb-3"
            key={product.id || idx}
            data-aos="zoom-in"
          >
            <div className="card product-card h-100 shadow-sm rounded-4">
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center">
                <ProductIconSection product={product} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}


            {/* Devices after session5 */}
            {normTheme === "session5" && firstProduct && (
              <div className="row" data-aos="fade-left">
                <div className="col-12">
                  <DevicesSection devices={firstProduct.device || []} />
                </div>
              </div>
            )}
          </React.Fragment>
        );
      })}

      {!reorderedPromotions.some((p) => normalize(p.theme) === "session5") &&
        firstProduct && (
          <div className="row mb-4" data-aos="fade-left">
            <div className="col-12">
              <DevicesSection devices={firstProduct.device || []} />
            </div>
          </div>
        )}

      {/* WhatsApp Floating Button */}
      <div>
        <div
          className="whatsapp-button"
          onClick={() => setIsOpen(!isOpen)}
          data-aos="fade-up"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            style={{ width: "30px", height: "30px" }}
          />
        </div>

        {isOpen && (
          <div className="chat-popup" data-aos="fade-in">
            <div className="chat-header">
              <img src="./images/logo.png" alt="Chat Icon" />
              <span>Chat with us</span>
            </div>
            <div className="chat-body">
              <p>
                Hi 👋
                <br />
                How can we help you?
              </p>
            </div>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="chat-footer"
            >
              Start Chat
            </a>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="bottom-bar" data-aos="fade-up">
        <div className="marquee">
          For Free Demo Contact Us -{" "}
          <strong style={{ color: "#FFD700" }}>703 221 3434</strong> | Way4Track
          - Track Anything, Anytime, Anywhere
        </div>
      </div>
    </div>
  );
};

export default PromotionAPI;
