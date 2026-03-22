import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = ({ t }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative"
          >
            <svg
              className="w-48 h-48 mx-auto"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="var(--accent-primary)"
                fillOpacity="0.1"
              />
              
              {/* 404 text */}
              <text
                x="100"
                y="110"
                textAnchor="middle"
                className="text-6xl font-bold"
                fill="var(--text-primary)"
                style={{ fontSize: '48px', fontWeight: 'bold' }}
              >
                404
              </text>
              
              {/* Decorative elements */}
              <motion.circle
                cx="45"
                cy="70"
                r="8"
                fill="var(--accent-primary)"
                fillOpacity="0.3"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.circle
                cx="155"
                cy="80"
                r="6"
                fill="var(--accent-secondary)"
                fillOpacity="0.3"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.circle
                cx="140"
                cy="140"
                r="10"
                fill="var(--accent-primary)"
                fillOpacity="0.2"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              
              {/* Question mark */}
              <motion.text
                x="100"
                y="75"
                textAnchor="middle"
                fill="var(--accent-primary)"
                style={{ fontSize: '24px', fontWeight: 'bold' }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ?
              </motion.text>
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-[var(--text-primary)] mb-3"
        >
          Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--text-secondary)] mb-8"
        >
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Go Home
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg font-medium hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
