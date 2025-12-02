// src/pages/Home/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  useEffect(() => {
    setIsLoaded(true);
    
    // Scroll to section based on hash
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    // Track scroll direction
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(id));
          } else if (scrollDirection === "up") {
            // Remove from visible sections when scrolling up and not intersecting
            setVisibleSections((prev) => {
              const next = new Set(prev);
              next.delete(id);
              return next;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px 0px -100px 0px'
      }
    );
    
    // Observe all sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollTop, scrollDirection]);

  // Set ref for each section
  const setSectionRef = (id, element) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  };

  // Navigation functions
  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleGridMapClick = () => {
    navigate("/grid-map");
  };

  const handleModuleClick = (link) => {
    navigate(link);
  };

  const modules = [
    { id: 1, name: "Dashboard", link: "/dashboard", icon: "fa-solid fa-chart-line", description: "Main control panel with live metrics" },
    { id: 2, name: "Monitoring", link: "/monitoring", icon: "fa-solid fa-tv", description: "Real-time system monitoring" },
    { id: 3, name: "Digital Twin", link: "/digital-twin", icon: "fa-solid fa-cube", description: "3D interactive substation model" },
    { id: 4, name: "Asset Health", link: "/asset-health", icon: "fa-solid fa-heart-pulse", description: "Equipment health tracking" },
    { id: 5, name: "AI Analytics", link: "/ai-analytics", icon: "fa-solid fa-robot", description: "Predictive insights" },
    { id: 6, name: "Fault Simulator", link: "/fault-simulator", icon: "fa-solid fa-bolt", description: "Scenario simulation" },
    { id: 7, name: "Reports", link: "/reports", icon: "fa-solid fa-chart-column", description: "Analytics & reports" },
    { id: 8, name: "Grid Map", link: "/grid-map", icon: "fa-solid fa-map", description: "National power grid visualization" },
  ];

  return (
    <>
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      {/* Inline CSS for Government Style with Scroll Animations */}
      <style>{`
        /* Government Official Colors - Improved Palette */
        :root {
          --govt-navy: #0A2342;
          --govt-blue: #1D4E89;
          --govt-light-blue: #2A7FBA;
          --govt-teal: #00B4D8;
          --govt-cyan: #48CAE4;
          --govt-gold: #FFB81C;
          --govt-yellow: #FFD700;
          --govt-white: #FFFFFF;
          --govt-light-gray: #F8F9FA;
          --govt-gray: #6C757D;
          --govt-dark-gray: #343A40;
          --govt-green: #28A745;
          --govt-red: #DC3545;
          --govt-orange: #FD7E14;
        }
        
        /* Base Styles */
        body {
          font-family: 'Segoe UI', 'Roboto', 'Arial', sans-serif;
          background-color: var(--govt-light-gray);
          color: var(--govt-dark-gray);
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        /* Header Styles - More Compact */
        .govt-header {
          background: linear-gradient(135deg, var(--govt-navy) 0%, var(--govt-blue) 100%);
          border-bottom: 3px solid var(--govt-gold);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .govt-header.hidden {
          transform: translateY(-100%);
        }
        
        .govt-footer {
          background: linear-gradient(135deg, var(--govt-navy) 0%, var(--govt-blue) 100%);
          border-top: 3px solid var(--govt-gold);
        }
        
        /* Button Styles */
        .govt-btn-primary {
          background: linear-gradient(135deg, var(--govt-blue) 0%, var(--govt-teal) 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(29, 78, 137, 0.3);
        }
        
        .govt-btn-primary:hover {
          background: linear-gradient(135deg, var(--govt-teal) 0%, var(--govt-cyan) 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(29, 78, 137, 0.4);
        }
        
        .govt-btn-secondary {
          background: transparent;
          border: 2px solid var(--govt-teal);
          color: var(--govt-teal);
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .govt-btn-secondary:hover {
          background: var(--govt-teal);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
        }
        
        /* Card Styles */
        .govt-card {
          background: white;
          border: 1px solid #E0E0E0;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .govt-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transform: translateY(-6px);
        }
        
        /* Section Styles with Scroll Animations */
        .govt-section {
          padding: 5rem 0;
          opacity: 0;
          transform: translateY(80px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                     transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .govt-section.scroll-down-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .govt-section.scroll-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .govt-section.scroll-down-hidden {
          opacity: 0;
          transform: translateY(80px);
        }
        
        .govt-section.scroll-up-hidden {
          opacity: 0;
          transform: translateY(-80px);
        }
        
        .govt-section-title {
          color: var(--govt-navy);
          font-weight: 800;
          position: relative;
          margin-bottom: 3rem;
          text-align: center;
          font-size: 2.5rem;
          letter-spacing: -0.5px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
        }
        
        .govt-section-title.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .govt-section-title:after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 5px;
          background: linear-gradient(90deg, var(--govt-gold), var(--govt-yellow));
          border-radius: 3px;
        }
        
        /* Nav Link Styles - More Compact */
        .govt-nav-link {
          color: rgba(255, 255, 255, 0.95) !important;
          font-weight: 500;
          padding: 0.5rem 1rem;
          position: relative;
          transition: all 0.3s ease;
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          font-size: 0.95rem;
          border-radius: 6px;
        }
        
        .govt-nav-link:hover {
          color: var(--govt-yellow) !important;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .govt-nav-link.active {
          color: var(--govt-yellow) !important;
          background: rgba(255, 255, 255, 0.15);
        }
        
        /* Badge Styles */
        .govt-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          background: linear-gradient(135deg, var(--govt-teal), var(--govt-cyan));
          color: white;
          font-size: 0.875rem;
          font-weight: 700;
          border-radius: 50px;
          letter-spacing: 1px;
          box-shadow: 0 4px 10px rgba(0, 180, 216, 0.3);
          opacity: 0;
          transform: scale(0.8);
          animation: badgePopIn 0.6s ease forwards;
          animation-delay: 0.5s;
        }
        
        @keyframes badgePopIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .govt-badge-warning {
          background: linear-gradient(135deg, var(--govt-gold), var(--govt-orange));
        }
        
        .govt-badge-danger {
          background: linear-gradient(135deg, var(--govt-red), #FF6B6B);
        }
        
        /* Animation Classes */
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-up {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                     transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-up.scroll-down-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-slide-up.scroll-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-slide-up.scroll-down-hidden {
          opacity: 0;
          transform: translateY(60px);
        }
        
        .animate-slide-up.scroll-up-hidden {
          opacity: 0;
          transform: translateY(-60px);
        }
        
        .animate-slide-left {
          opacity: 0;
          transform: translateX(-80px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                     transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-left.scroll-down-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-left.scroll-up-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-left.scroll-down-hidden {
          opacity: 0;
          transform: translateX(-80px);
        }
        
        .animate-slide-left.scroll-up-hidden {
          opacity: 0;
          transform: translateX(80px);
        }
        
        .animate-slide-right {
          opacity: 0;
          transform: translateX(80px);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                     transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-slide-right.scroll-down-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-right.scroll-up-visible {
          opacity: 1;
          transform: translateX(0);
        }
        
        .animate-slide-right.scroll-down-hidden {
          opacity: 0;
          transform: translateX(80px);
        }
        
        .animate-slide-right.scroll-up-hidden {
          opacity: 0;
          transform: translateX(-80px);
        }
        
        .animate-scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                     transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-scale-in.scroll-down-visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .animate-scale-in.scroll-up-visible {
          opacity: 1;
          transform: scale(1);
        }
        
        .animate-scale-in.scroll-down-hidden {
          opacity: 0;
          transform: scale(0.8);
        }
        
        .animate-scale-in.scroll-up-hidden {
          opacity: 0;
          transform: scale(1.2);
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        /* Video Hero Styles - Full Width */
        .video-hero-container {
          position: relative;
          width: 100%;
          height: 85vh;
          min-height: 600px;
          overflow: hidden;
          margin-top: 0;
        }
        
        .video-hero-container video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Content Below Video - Modern Design */
        .content-below-video {
          padding: 6rem 0;
          background: linear-gradient(135deg, #0A2342 0%, #1D4E89 100%);
          position: relative;
          overflow: hidden;
        }
        
        .content-below-video:before {
          content: '';
          position: absolute;
          top: -50px;
          left: 0;
          width: 100%;
          height: 100px;
          background: linear-gradient(to bottom, transparent, rgba(10, 35, 66, 0.9));
        }
        
        .content-below-video .container {
          position: relative;
          z-index: 2;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem;
          margin-top: 5rem;
          padding-top: 4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }
        
        .stat-item {
          text-align: center;
          color: white;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(40px);
        }
        
        .stat-item.scroll-down-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stat-item.scroll-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stat-item:nth-child(1) { transition-delay: 0.1s; }
        .stat-item:nth-child(2) { transition-delay: 0.2s; }
        .stat-item:nth-child(3) { transition-delay: 0.3s; }
        .stat-item:nth-child(4) { transition-delay: 0.4s; }
        
        .stat-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          border-color: var(--govt-teal);
        }
        
        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, var(--govt-yellow), var(--govt-gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .stat-icon {
          font-size: 2rem;
          color: var(--govt-cyan);
          margin-top: 1rem;
        }
        
        /* Modern Card Design */
        .modern-card {
          background: white;
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
          opacity: 0;
          transform: translateY(60px);
        }
        
        .modern-card.scroll-down-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .modern-card.scroll-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .modern-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Gradient Text */
        .gradient-text {
          background: linear-gradient(135deg, var(--govt-teal), var(--govt-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Feature Cards */
        .feature-card {
          background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
          border-radius: 16px;
          padding: 2rem;
          height: 100%;
          border: 1px solid #E8E8E8;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateY(40px);
        }
        
        .feature-card.scroll-down-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .feature-card.scroll-up-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .feature-card:hover {
          border-color: var(--govt-teal);
          box-shadow: 0 10px 25px rgba(0, 180, 216, 0.1);
          transform: translateY(-5px);
        }
        
        /* Module Cards Stagger Animation */
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
        .feature-card:nth-child(7) { transition-delay: 0.7s; }
        .feature-card:nth-child(8) { transition-delay: 0.8s; }
        
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #F1F1F1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, var(--govt-teal), var(--govt-cyan));
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, var(--govt-cyan), var(--govt-teal));
        }
        
        /* Selection Styling */
        ::selection {
          background: var(--govt-teal);
          color: white;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .govt-section {
            padding: 3rem 0;
          }
          
          .govt-section-title {
            font-size: 2rem;
          }
          
          .video-hero-container {
            height: 60vh;
            min-height: 400px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
            margin-top: 3rem;
            padding-top: 3rem;
          }
          
          .stat-value {
            font-size: 2.5rem;
          }
          
          .govt-nav-link {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
          
          .content-below-video {
            padding: 4rem 0;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .video-hero-container {
            height: 50vh;
            min-height: 350px;
          }
          
          .govt-section-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
      
      <div className="min-h-screen">
        
        {/* HEADER - Ultra Compact */}
        <header className={`govt-header ${scrollDirection === "down" && lastScrollTop > 100 ? "hidden" : ""}`}>
          {/* Top Banner - Minimal */}
          <div className="bg-navy-900 py-1">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center">
                <div className="text-xs text-cyan-300">
                  <i className="fas fa-bolt mr-1 text-yellow-400"></i>
                  MINISTRY OF POWER, GOVT. OF INDIA
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-xs text-cyan-300 hover:text-yellow-400 transition-colors">
                    <i className="fas fa-phone mr-1"></i> Contact
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Navigation - Super Compact */}
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Logo and Ministry Name - Very Compact */}
              <div className="flex items-center space-x-2 mb-2 md:mb-0">
                <div className="w-10 h-10 bg-white rounded-full p-1">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center">
                    <i className="fas fa-bolt text-lg text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="text-[9px] tracking-wider text-yellow-300 font-bold uppercase">
                    GOVT. OF INDIA
                  </div>
                  <div className="text-sm font-bold text-white">
                    Ministry of Power
                  </div>
                </div>
              </div>
              
              {/* Navigation Menu - Compact */}
              <div className="flex space-x-1">
                {[
                  { id: "home", label: "Home", icon: "fa-home" },
                  { id: "about", label: "About", icon: "fa-info-circle" },
                  { id: "modules", label: "Modules", icon: "fa-th-large" },
                  { id: "grid-map", label: "Grid Map", icon: "fa-map" },
                  { id: "digital-twin", label: "Digital Twin", icon: "fa-cube" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      if (item.id === 'grid-map') {
                        handleGridMapClick();
                      } else {
                        const element = document.getElementById(item.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                    className={`govt-nav-link flex items-center space-x-1 ${activeSection === item.id ? 'active' : ''}`}
                  >
                    <i className={`fas ${item.icon} text-xs`}></i>
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
              
              {/* Action Buttons - Compact */}
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button 
                  onClick={handleLoginClick}
                  className="px-3 py-1.5 text-xs border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-white transition-colors"
                >
                  Login
                </button>
                
                <button 
                  onClick={handleDashboardClick}
                  className="px-3 py-1.5 text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* VIDEO HERO SECTION - Full Width Video Only */}
        <section className="video-hero-container">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/My_Movie_new_0.mp4" type="video/mp4" />
            {/* Fallback if video doesn't load */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-800 flex items-center justify-center">
              <div className="text-white text-center p-8">
                <div className="text-6xl mb-4 animate-float">
                  <i className="fas fa-bolt"></i>
                </div>
                <h1 className="text-4xl font-bold mb-4">Substation Digital Twin</h1>
                <p className="text-xl">Real-time power infrastructure monitoring</p>
              </div>
            </div>
          </video>
        </section>

        {/* CONTENT BELOW VIDEO - Modern Design with Animations */}
        <section 
          id="home" 
          ref={(el) => setSectionRef('home', el)}
          className={`content-below-video ${visibleSections.has('home') ? 'govt-section scroll-down-visible' : 'govt-section scroll-down-hidden'}`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center text-white">
              
              {/* Live Badge */}
              <div className="mb-8">
                <span className="govt-badge inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE DIGITAL TWIN
                </span>
              </div>
              
              {/* Main Title */}
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up ${visibleSections.has('home') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                400/220 kV Substation
                <span className="block gradient-text mt-3">Digital Twin Platform</span>
              </h1>
              
              {/* Description */}
              <p className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90 animate-slide-up ${visibleSections.has('home') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                Real-time visualization, predictive maintenance, and comprehensive monitoring 
                of India's critical power infrastructure. Modernizing grid management through 
                advanced digital technologies.
              </p>
              
              {/* Action Buttons */}
              <div className={`flex flex-wrap justify-center gap-6 mb-16 animate-slide-up ${visibleSections.has('home') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                <button 
                  onClick={() => navigate("/digital-twin")} 
                  className="govt-btn-primary px-10 py-4 text-lg font-semibold rounded-xl"
                >
                  <i className="fas fa-play-circle mr-3"></i>
                  Explore Digital Twin
                </button>
                
                <button 
                  onClick={handleGridMapClick} 
                  className="govt-btn-secondary px-10 py-4 text-lg font-semibold rounded-xl"
                >
                  <i className="fas fa-map-marked-alt mr-3"></i>
                  View Grid Map
                </button>
              </div>
              
              {/* Stats Grid */}
              <div className="stats-grid">
                {[
                  { value: "1,240+", label: "Substations", icon: "fa-industry", delay: 0.1 },
                  { value: "45.8K+", label: "Assets", icon: "fa-satellite-dish", delay: 0.2 },
                  { value: "99.97%", label: "Uptime", icon: "fa-check-circle", delay: 0.3 },
                  { value: "<50ms", label: "Response", icon: "fa-bolt", delay: 0.4 }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className={`stat-item ${visibleSections.has('home') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}
                    style={{transitionDelay: `${stat.delay}s`}}
                  >
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-icon">
                      <i className={`fas ${stat.icon}`}></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section 
          id="features" 
          ref={(el) => setSectionRef('features', el)}
          className={`${visibleSections.has('features') ? 'govt-section scroll-down-visible' : 'govt-section scroll-down-hidden'} bg-gradient-to-b from-white to-gray-50`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className={`govt-section-title ${visibleSections.has('features') ? 'visible' : ''}`}>
              Advanced Grid Management
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className={`animate-slide-left ${visibleSections.has('features') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                <div className={`modern-card ${visibleSections.has('features') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl flex items-center justify-center mr-4">
                      <i className="fas fa-brain text-2xl gradient-text"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">Smart Power Infrastructure</h3>
                      <p className="text-gray-600">AI-driven grid optimization</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    Our Digital Twin platform provides comprehensive monitoring and control capabilities 
                    for India's 400/220 kV power transmission network. With real-time data analytics, 
                    predictive maintenance, and interactive 3D visualization, we're revolutionizing 
                    how power infrastructure is managed.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { title: "Real-time Monitoring", icon: "fa-eye", color: "from-cyan-500 to-teal-500" },
                      { title: "Predictive Analytics", icon: "fa-chart-line", color: "from-blue-500 to-indigo-500" },
                      { title: "3D Visualization", icon: "fa-cube", color: "from-purple-500 to-pink-500" },
                      { title: "Asset Management", icon: "fa-cogs", color: "from-orange-500 to-red-500" }
                    ].map((feature, idx) => (
                      <div 
                        key={idx} 
                        className={`bg-white p-4 rounded-xl border border-gray-200 hover:border-cyan-300 transition-colors animate-scale-in ${visibleSections.has('features') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}
                        style={{transitionDelay: `${0.2 + idx * 0.1}s`}}
                      >
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                          <i className={`fas ${feature.icon} text-white`}></i>
                        </div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Content - Interactive Panel */}
              <div className={`animate-slide-right ${visibleSections.has('features') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                <div className={`govt-card overflow-hidden ${visibleSections.has('features') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
                  <div className="bg-gradient-to-r from-navy-800 to-blue-800 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">Live Control Panel</h3>
                        <p className="text-cyan-200">Access real-time grid parameters</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-sm">Connected</span>
                        </div>
                        <div className="text-sm px-3 py-1 bg-cyan-800/30 rounded-full">
                          <i className="fas fa-wifi mr-1"></i>
                          Online
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Interface */}
                  <div className="p-6 bg-gradient-to-br from-gray-900 to-navy-900">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: "Voltage", value: "400 kV", status: "optimal", icon: "fa-bolt", color: "text-green-400" },
                        { label: "Current", value: "2.5 kA", status: "normal", icon: "fa-wave-square", color: "text-cyan-400" },
                        { label: "Frequency", value: "50.02 Hz", status: "stable", icon: "fa-tachometer-alt", color: "text-blue-400" },
                        { label: "Power Flow", value: "950 MW", status: "high", icon: "fa-chart-line", color: "text-yellow-400" },
                        { label: "Temperature", value: "42°C", status: "warning", icon: "fa-thermometer-half", color: "text-orange-400" },
                        { label: "Load", value: "82%", status: "optimal", icon: "fa-weight", color: "text-green-400" }
                      ].map((param, idx) => (
                        <div 
                          key={idx} 
                          className="bg-gray-800/50 rounded-xl p-4 text-center hover:bg-gray-800 transition-colors border border-gray-700/50 animate-scale-in"
                          style={{animationDelay: `${0.3 + idx * 0.1}s`, transitionDelay: `${0.3 + idx * 0.1}s`}}
                        >
                          <div className={`${param.color} mb-2`}>
                            <i className={`fas ${param.icon} text-xl`}></i>
                          </div>
                          <div className="text-xs text-gray-400 mb-1">{param.label}</div>
                          <div className="text-lg font-bold text-white mb-1">{param.value}</div>
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                            param.status === 'optimal' ? 'bg-green-900/30 text-green-300 border border-green-700/30' :
                            param.status === 'warning' ? 'bg-orange-900/30 text-orange-300 border border-orange-700/30' :
                            'bg-cyan-900/30 text-cyan-300 border border-cyan-700/30'
                          }`}>
                            {param.status}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => navigate("/dashboard")}
                      className="w-full py-4 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-xl hover:from-cyan-700 hover:to-teal-700 transition-all hover:scale-[1.02]"
                    >
                      <i className="fas fa-external-link-alt mr-2"></i>
                      Open Full Control Panel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULES SECTION */}
        <section 
          id="modules" 
          ref={(el) => setSectionRef('modules', el)}
          className={`${visibleSections.has('modules') ? 'govt-section scroll-down-visible' : 'govt-section scroll-down-hidden'} bg-gray-50`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className={`govt-section-title ${visibleSections.has('modules') ? 'visible' : ''}`}>
              System Modules
            </h2>
            <p className={`text-gray-600 text-center max-w-3xl mx-auto mb-12 text-lg animate-slide-up ${visibleSections.has('modules') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
              Comprehensive suite of tools for power system management and monitoring
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {modules.map((module, idx) => (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.link)}
                  className={`feature-card group ${visibleSections.has('modules') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}
                  style={{transitionDelay: `${0.1 + idx * 0.1}s`}}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-cyan-200 transition-colors">
                      <i className={`${module.icon} text-2xl gradient-text`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{module.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                    <div className="flex items-center text-cyan-600 font-medium text-sm mt-2 group-hover:text-cyan-700">
                      <span>Access Module</span>
                      <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform"></i>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className={`text-center mt-16 animate-slide-up ${visibleSections.has('modules') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
              <button 
                onClick={handleDashboardClick}
                className="govt-btn-primary px-10 py-4 text-lg font-semibold"
              >
                <i className="fas fa-rocket mr-3"></i>
                Launch All Modules
              </button>
            </div>
          </div>
        </section>

        {/* GRID MAP SECTION */}
        <section 
          id="grid-map-section" 
          ref={(el) => setSectionRef('grid-map-section', el)}
          className={`${visibleSections.has('grid-map-section') ? 'govt-section scroll-down-visible' : 'govt-section scroll-down-hidden'} bg-white`}
        >
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className={`govt-section-title ${visibleSections.has('grid-map-section') ? 'visible' : ''}`}>
              National Power Grid Map
            </h2>
            
            <div className={`modern-card overflow-hidden ${visibleSections.has('grid-map-section') ? 'scroll-down-visible' : 'scroll-down-hidden'}`}>
              <div className="bg-gradient-to-r from-navy-800 to-blue-800 p-8 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Interactive National Grid Visualization</h3>
                    <p className="text-cyan-200">Real-time monitoring of 400/220 kV transmission network across India</p>
                  </div>
                  <button 
                    onClick={handleGridMapClick}
                    className="mt-6 md:mt-0 px-8 py-3 bg-white text-navy-800 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    Open Full Screen Map
                  </button>
                </div>
              </div>
              
              {/* Map Preview */}
              <div className="p-8">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 text-center">
                  <div className="text-7xl text-cyan-500 mb-6 animate-float">
                    <i className="fas fa-map"></i>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Interactive Grid Network</h4>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
                    Click the button above to access the full interactive map showing all 400/220 kV 
                    substations, transmission lines, and real-time grid status across India.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                    {[
                      { value: "1,240+", label: "Substations" },
                      { value: "185,420 km", label: "Transmission Lines" },
                      { value: "5", label: "Regions" },
                      { value: "24/7", label: "Live Monitoring" }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="text-center p-6 bg-white rounded-xl shadow-sm animate-scale-in"
                        style={{transitionDelay: `${0.2 + idx * 0.1}s`}}
                      >
                        <div className="text-3xl font-bold text-navy-800">{item.value}</div>
                        <div className="text-sm text-gray-600 mt-2">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer 
          id="contact" 
          ref={(el) => setSectionRef('contact', el)}
          className="govt-footer text-white"
        >
          <div className="container mx-auto px-4 sm:px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Ministry Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">GOVERNMENT OF INDIA</h3>
                <p className="text-lg font-bold mb-3">Ministry of Power</p>
                <p className="text-cyan-200 mb-6 text-sm leading-relaxed">
                  Shram Shakti Bhawan, Rafi Marg,<br />
                  New Delhi - 110001
                </p>
                <div className="space-y-3 text-sm">
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-3 text-cyan-400"></i>
                    +91-11-2371-XXXX
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope mr-3 text-cyan-400"></i>
                    support@mopower.gov.in
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-clock mr-3 text-cyan-400"></i>
                    9:00 AM - 5:30 PM (Mon-Fri)
                  </p>
                </div>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">QUICK LINKS</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Home", link: "#home" },
                    { label: "About Us", link: "#about" },
                    { label: "Modules", link: "#modules" },
                    { label: "Grid Map", link: "/grid-map" },
                    { label: "Digital Twin", link: "/digital-twin" },
                    { label: "Login", link: "/login" },
                    { label: "Dashboard", link: "/dashboard" }
                  ].map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => {
                          if (item.link.startsWith('/')) {
                            navigate(item.link);
                          } else {
                            setActiveSection(item.link.replace('#', ''));
                            const element = document.getElementById(item.link.replace('#', ''));
                            if (element) {
                              element.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        }}
                        className="hover:text-cyan-300 transition-colors text-left w-full flex items-center text-sm py-1"
                      >
                        <i className="fas fa-chevron-right text-xs mr-3 text-cyan-400"></i>
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* External Links */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">EXTERNAL LINKS</h3>
                <ul className="space-y-3">
                  {[
                    { name: "Ministry of Power (MoP)", url: "#" },
                    { name: "Power Grid Corporation", url: "#" },
                    { name: "National Power Portal", url: "#" },
                    { name: "Central Electricity Authority", url: "#" },
                    { name: "National Grid", url: "#" },
                    { name: "Renewable Energy", url: "#" }
                  ].map((link, idx) => (
                    <li key={idx}>
                      <button className="hover:text-cyan-300 transition-colors text-left w-full text-sm py-1 flex items-center">
                        <i className="fas fa-external-link-alt text-xs mr-3 text-cyan-400"></i>
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Website Info */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-300">WEBSITE INFO</h3>
                <div className="bg-cyan-900/20 p-5 rounded-xl border border-cyan-800/30">
                  <p className="text-sm mb-3 flex items-start">
                    <i className="fas fa-info-circle mr-3 text-cyan-400 mt-0.5"></i>
                    This website is managed by the Ministry of Power, Government of India.
                  </p>
                  <div className="text-xs text-cyan-300 space-y-2 mt-4">
                    <p><strong className="text-yellow-300">Last Updated:</strong> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p><strong className="text-yellow-300">Version:</strong> 3.0.0</p>
                    <p><strong className="text-yellow-300">Browser Support:</strong> Chrome 90+, Firefox 85+, Edge 90+</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-cyan-800 mt-10 pt-8 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-shield-alt text-yellow-400"></i>
                    <span>Secure & Official Website</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <i className="fas fa-user-shield text-yellow-400"></i>
                    <span>GDPR Compliant</span>
                  </div>
                </div>
                <div>
                  <p className="text-yellow-300 font-bold">
                    <i className="far fa-copyright mr-2"></i>
                    {new Date().getFullYear()} Ministry of Power, Government of India. All Rights Reserved.
                  </p>
                  <p className="text-cyan-300 text-sm mt-2">
                    National Digital Substation Portal v3.0
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Floating Action Button */}
        <button 
          onClick={handleDashboardClick}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-cyan-600 to-teal-600 text-white rounded-full flex items-center justify-center shadow-xl hover:from-cyan-700 hover:to-teal-700 transition-all hover:scale-110 z-50"
        >
          <i className="fas fa-rocket text-lg"></i>
        </button>
      </div>
    </>
  );
};

export default Home;