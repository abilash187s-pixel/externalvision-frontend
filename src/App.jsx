import React from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import AnimatedLogo from './components/AnimatedLogo';
import ProductSlider from './components/ProductSlider';
import './styles.css';
import Advantages from './components/Advantages';
import { motion } from "framer-motion";
import { useState,useEffect  } from "react";
import AdminDashboard from './admin/AdminDashboard';
import LearningPrograms from "./components/LearningPrograms";
import BlogHero from "./components/BlogHero";

const PRODUCTS = [
  { id: 'product-3', title: 'Creative Writing', preview: 'TBA', image: '/images/shot3.jpeg', price: '₹299' },
  { id: 'product-4', title: 'Music Theory Basics', preview: '10 Jan 2026', image: '/images/shot1.jpeg', price: '₹799' },
];


function Navbar(){ 
  const [open, setOpen] = React.useState(false);
  return (
    <header className="site-header">
      <div className="nav-inner">
        <div className="left">
          <AnimatedLogo size={56} />
          <div className="brand-text"><div className="logo-text">E-Learn</div><div className="logo-sub">Skills for life</div></div>
        </div>
        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/register" className="btn-outline" onClick={() => setOpen(false)}>Register</Link>
        </nav>
        <button className="hamburger" onClick={() => setOpen(s=>!s)} aria-label="Toggle menu"><span className="bar" /><span className="bar" /><span className="bar" /></button>
      </div>
      <div className="marquee"><marquee>Upcoming: Demo on 24 Nov 2025 — Limited seats. Enroll now!</marquee></div>
    </header>
  );
}

function Hero(){ const heroFallback = 'https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2024/11/blog-affiliate-marketing.jpg?w=300'; const heroFallbackUploaded = 'https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2024/11/blog-affiliate-marketing.jpg?w=300';
  return (
    <section className="hero enhanced-hero">
      <div className="hero-media"><img className="hero-fallback" src={heroFallback} alt="India themed" onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src=heroFallbackUploaded}}/></div>
      <div className="container hero-content">
        <div><h1>Learn from experts — anytime, anywhere</h1><p className="lead">Interactive classes, practical projects, and community support to help you grow.</p><div className="hero-cta"><Link to="/products" className="btn">View Courses</Link><Link to="/register" className="btn-outline">Register</Link></div></div>
        <div className="hero-img"><img src="https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2024/11/blog-affiliate-marketing.jpg?w=300" alt="hero" /></div>
      </div>
    </section>
    
  );
}

function ProductCard({p}){ return (<div className="product-card"><div className="pc-media"><img src={p.image} alt={p.title}/></div><div className="pc-body"><h3>{p.title}</h3><p className="pc-meta">Starts: {p.preview} • {p.price}</p><p className="pc-desc">Short, engaging description to highlight outcomes and target learners.</p><div className="pc-actions"><Link to={`/product/${p.id}`} className="btn small">Details</Link><Link to="/register" className="btn-outline small">Book</Link></div></div></div>); }

function Home(){ return (<main><Hero /> <LearningPrograms /> <Advantages /><section className="container section"><div className="section-header"><h2>Featured Courses</h2><p className="muted">Handpicked courses to get you started quickly.</p></div><div className="grid products-grid">{PRODUCTS.map(p => <ProductCard key={p.id} p={p} />)}</div></section><section className="container section subtle"><div className="two-col"><div><h3>Why choose E-Learn?</h3><ul><li>Practical projects and assignments</li><li>Experienced instructors</li><li>Lifetime access to course materials</li></ul></div><div><h3>Contact</h3><p>Email: support@example.com • Phone: +91 98765 43210</p></div></div></section></main>); }

function ProductDetail(){ const { id } = useParams(); const p = PRODUCTS.find(x=>x.id===id); const nav = useNavigate(); if (!p) return <div className="container"><p>Not found</p></div>; return (<div className="container section"><button onClick={() => nav(-1)} className="btn-link">← Back</button><div className="detail-two"><img src={p.image} alt={p.title}/><div><h2>{p.title}</h2><p className="muted">Starts: {p.preview}</p><p>Longer course description with outcomes, syllabus and instructor info. Suitable for learners of all levels.</p><Link to="/register" className="btn">Register</Link></div></div></div>); }

// function Register() {
//   const [form, setForm] = React.useState({
//     name: "",
//     location: "",
//     age: "",
//     whatsapp: "",
//     email: "",
//     phone: "",
//   });
//   const [status, setStatus] = React.useState(null);
//   function onChange(e) {
//     setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
//   }
//   async function onSubmit(e) {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) setStatus("registered");
//       else if (res.status === 202) setStatus("saved");
//       else setStatus("error");
//     } catch (err) {
//       console.error(err);
//       setStatus("local");
//       const subs = JSON.parse(localStorage.getItem("submissions" || "[]"));
//       subs.push(form);
//       localStorage.setItem("submissions", JSON.stringify(subs));
//     }
//   }
//   return (
//     <div className="container section">
//       <div className="form-card">
//         <h2>Register for a demo</h2>
//         {status === "registered" && (
//           <div className="alert success">
//             Registered & confirmation email sent!
//           </div>
//         )}
//         {status === "saved" && (
//           <div className="alert warn">Saved, email not sent.</div>
//         )}
//         {status === "local" && (
//           <div className="alert warn">Saved locally (server unreachable).</div>
//         )}
//         <form onSubmit={onSubmit} className="form-grid">
//           <label className="floating">
//             Name
//             <input name="name" value={form.name} onChange={onChange} required />
//           </label>
//           <label className="floating">
//             Email
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={onChange}
//               required
//             />
//           </label>
//           <label className="floating">
//             Phone
//             <input name="phone" value={form.phone} onChange={onChange} />
//           </label>
//           <label className="floating">
//             WhatsApp
//             <input name="whatsapp" value={form.whatsapp} onChange={onChange} />
//           </label>
//           <label className="floating">
//             Location
//             <input name="location" value={form.location} onChange={onChange} />
//           </label>
//           <label className="floating">
//             Age
//             <input name="age" value={form.age} onChange={onChange} />
//           </label>
//           <button className="btn wide" type="submit">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


function Register() {
  const initialForm = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  location: "",
  age: "",
};
const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
console.log("demo",import.meta.env.VITE_API_URL)
  // const VITE_API_URL =
  //   import.meta.env.VITE_API_URL || "http://localhost:5000" ;
  const VITE_API_URL="https://externalvisionacademy-backend.onrender.com"

  useEffect(() => {
    if (status === "success") {
      const t = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(t);
    }
  }, [status]);
  function onChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

async function onSubmit(e) {
  e.preventDefault();
  setLoading(true);
  setStatus(null);

  try {
    const res = await fetch(`${VITE_API_URL}/api/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    let data = null;
    try {
      data = await res.json();
    } catch (e) {
      // ignore empty JSON
    }

    if (res.ok) {
      setStatus("success");   // ✅ correct
      setForm(initialForm);
    } else {
      setStatus("error");
    }
  } catch (err) {
    console.error(err);
    setStatus("network_error"); // ❌ only when fetch itself fails
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="container section">
      <motion.div
        className="modern-form-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="form-title">Register for Demo</h2>
        <p className="form-sub">Join the learning revolution 🚀</p>

        {status === "success" && (
          <motion.div
            className="alert success modern-success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            🎉 Registration Successful!  
            <br />A confirmation email has been sent to you.
          </motion.div>
        )}

        {status === "error" && (
          <div className="alert error">❌ Something went wrong!</div>
        )}
        {status === "network_error" && (
          <div className="alert warn">⚠ Server unreachable (saved locally)</div>
        )}

        <form onSubmit={onSubmit} className="modern-form">
          {["name", "email", "phone", "whatsapp", "location", "age"].map(
            (field) => (
              <div className="input-box" key={field}>
                <input
                  type="text"
                  name={field}
                  required
                  value={form[field]}
                  onChange={onChange}
                />
                <label>{field.toUpperCase()}</label>
              </div>
            )
          )}

          <motion.button
            type="submit"
            className="modern-btn"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? (
              <motion.div
                className="loader"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
            ) : (
              "Submit"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}


function Contact(){ return <div className="container section"><h2>Contact</h2><p>Email: support@example.com</p></div>; }
function About(){ return <div className="container section"><h2>About</h2><p>Short about text.</p></div>; }

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <footer className="site-footer">
        <div className="container footer-inner">
          <div>© {new Date().getFullYear()} E-Learn — All rights reserved</div>
          <div className="footer-links">
            <a href="#">Privacy</a> <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
