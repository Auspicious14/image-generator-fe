import { motion } from "framer-motion";
import Link from "next/link"

export const FeatureCard = ({
  icon,
  title,
  desc,
  link
}: {
  icon: string;
  title: string;
  desc: string;
link: string

}) => {
  return (
    <Link href={link}>
    
    <motion.div
      className="bg-gradient-to-r from-blue-100 to-gray-100 border-l-4 border-orange-400 p-6 shadow-sm rounded-lg"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-2 text-sm">{desc}</p>
    </motion.div>
      
    </Link>
  );
};
