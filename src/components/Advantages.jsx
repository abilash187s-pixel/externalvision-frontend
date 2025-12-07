// client/src/components/Advantages.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ITEMS = [
  {
    id: 'concept',
    img: 'https://cdn1.byjus.com/wp-content/uploads/2022/04/concept-clarity.png',
    title: 'Conceptual clarity',
    subtitle: 'through visualisation'
  },
  {
    id: 'personalised',
    img: 'https://cdn1.byjus.com/wp-content/uploads/2022/04/personalised-learning.png',
    title: 'Personalised learning',
    subtitle: 'programs'
  },
  {
    id: 'attention',
    img: 'https://cdn1.byjus.com/wp-content/uploads/2022/04/unmatched-attention.png',
    title: 'Unmatched individual',
    subtitle: 'attention'
  }
];

export default function Advantages() {
  return (
    <section className="advantages-section">
      <div className="container">
        <motion.h2
          className="section-header"
          initial={{ y: 16, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Get the External vision'S advantage
        </motion.h2>

        <div className="adv-grid">
          {ITEMS.map(item => (
            <motion.div
              key={item.id}
              className="adv-item"
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.06 * ITEMS.indexOf(item) }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="adv-media">
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
              <p className="adv-text">
                <strong>{item.title}</strong><br />
                <span>{item.subtitle}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
