import React, { useRef } from 'react';
import { motion } from 'framer-motion';
const PRODUCTS = [
  { id: 'english-101', title: 'English Foundations', img: '/images/edu1.jpg', meta: 'Demo 24 Nov' },
  { id: 'aff-boot', title: 'Affiliate Bootcamp', img: '/images/edu2.jpg', meta: '5 Dec' },
  { id: 'creative', title: 'Creative Writing', img: '/images/edu3.jpg', meta: 'TBA' },
  { id: 'music', title: 'Music Theory', img: '/images/edu4.jpg', meta: '10 Jan' },
];
export default function ProductSlider(){ const scrollerRef = useRef();
  function scroll(delta){ if(!scrollerRef.current) return; scrollerRef.current.scrollBy({ left: delta, behavior: 'smooth' }); }
  return (
    <section className="slider-section">
      <div className="slider-header">
        <h2>Explore our learning Programs</h2>
        <div className="slider-controls">
          <button onClick={() => scroll(-420)} aria-label="Prev" className="slider-arrow">‹</button>
          <button onClick={() => scroll(420)} aria-label="Next" className="slider-arrow">›</button>
        </div>
      </div>
      <div className="slider-track-wrapper">
        <div ref={scrollerRef} className="slider-track" role="list">
          {PRODUCTS.map(p => (
            <motion.div whileHover={{ y:-8 }} key={p.id} className="slider-card" role="listitem">
              <div className="sc-media"><img src={p.img} alt={p.title} /></div>
              <div className="sc-body"><div className="sc-meta">{p.meta}</div><h3>{p.title}</h3><a className="sc-link" href={`/product/${p.id}`}>Read more</a></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
