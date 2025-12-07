import React from 'react';
import { motion } from 'framer-motion';
export default function AnimatedLogo({ size = 56 }) {
  const publicLogo = '/images/logo.png';
  const fallbackLogo = '/mnt/data/accademy vision.png';
  return (
    <motion.div
      className="animated-logo"
      initial={{ rotate: 0, scale: 0.98 }}
      animate={{ rotate: [0, 6, -6, 0], scale: [0.98, 1.06, 1.0, 1.0] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ width: size, height: size, borderRadius: 12, overflow: 'hidden', display: 'inline-block', boxShadow: '0 12px 30px rgba(0,0,0,0.14)', background: 'linear-gradient(180deg,#fff,#f3f4f6)' }}
    >
      <img src={publicLogo} onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src=fallbackLogo}} alt="logo" style={{width:'100%',height:'100%',objectFit:'contain',padding:8}} />
    </motion.div>
  );
}
