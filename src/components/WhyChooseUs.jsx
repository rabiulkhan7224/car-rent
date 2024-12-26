import React from 'react';
import { motion } from "motion/react"


const WhyChooseUs = () => {
    const points = [
        {
          icon: "🚗",
          title: "Wide Variety of Cars",
          description: "From budget-friendly options to luxury vehicles.",
        },
        {
          icon: "💰",
          title: "Affordable Prices",
          description: "Competitive daily rates you can count on.",
        },
        {
          icon: "📅",
          title: "Easy Booking Process",
          description: "Seamlessly book your ride in just a few clicks.",
        },
        {
          icon: "📞",
          title: "24/7 Support",
          description: "Assistance for all your queries anytime, anywhere.",
        },
      ];
      const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      };
      const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2, 
          },
        },
      };
    return (
        <div>
            <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} 
          variants={containerVariants}
        >
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              variants={itemVariants}
              
            >
              <div className="text-5xl mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
            
        </div>
    );
};

export default WhyChooseUs;