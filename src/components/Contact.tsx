import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../App';

export default function Contact() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className={`py-32 px-6 relative overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-white'}`}
    >
      <motion.div
        className="absolute top-0 left-0 right-0 h-2 bg-yellow-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isInView ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none mb-8 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            READY TO
            <br />
            <span className="text-yellow-400">CLEAR THE PIPE?</span>
          </h2>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            STOP SWIMMING IN BAD IDEAS. START MAKING A SPLASH.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className={`text-4xl font-black mb-8 ${isDarkMode ? 'text-white' : 'text-black'} uppercase`}>Get in Touch</h3>

            <div className="space-y-6 mb-12">
              <motion.div
                className={`flex items-start gap-4 ${isDarkMode ? 'bg-white' : 'bg-black'} p-6 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}
                whileHover={{ x: 10, boxShadow: '8px 8px 0px 0px rgba(250,204,21,1)' }}
              >
                <div className={`bg-yellow-400 w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}>
                  <Mail className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 ${isDarkMode ? 'text-black' : 'text-white'} uppercase`}>Email Us</h4>
                  <a
                    href="mailto:hello@flushit.com.pk"
                    className={`${isDarkMode ? 'text-gray-700' : 'text-gray-300'} hover:text-yellow-600 transition-colors font-bold`}
                  >
                    hello@flushit.com.pk
                  </a>
                </div>
              </motion.div>

              <motion.div
                className={`flex items-start gap-4 ${isDarkMode ? 'bg-white' : 'bg-black'} p-6 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}
                whileHover={{ x: 10, boxShadow: '8px 8px 0px 0px rgba(255,255,0,1)' }}
              >
                <div className={`bg-yellow-400 w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}>
                  <Phone className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 ${isDarkMode ? 'text-black' : 'text-white'} uppercase`}>Call Us</h4>
                  <a
                    href="tel:+92-XXX-XXXXXXX"
                    className={`${isDarkMode ? 'text-gray-700' : 'text-gray-300'} hover:text-yellow-600 transition-colors font-bold`}
                  >
                    +92-XXX-XXXXXXX
                  </a>
                </div>
              </motion.div>

              <motion.div
                className={`flex items-start gap-4 ${isDarkMode ? 'bg-white' : 'bg-black'} p-6 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}
                whileHover={{ x: 10, boxShadow: '8px 8px 0px 0px rgba(250,204,21,1)' }}
              >
                <div className={`bg-yellow-400 w-14 h-14 flex items-center justify-center flex-shrink-0 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}>
                  <MapPin className="text-black" size={24} strokeWidth={3} />
                </div>
                <div>
                  <h4 className={`font-black mb-1 ${isDarkMode ? 'text-black' : 'text-white'} uppercase`}>Visit Us</h4>
                  <p className={`${isDarkMode ? 'text-gray-700' : 'text-gray-300'} font-bold`}>Pakistan</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className={`${isDarkMode ? 'bg-white' : 'bg-black'} p-8 border-4 ${isDarkMode ? 'border-black' : 'border-white'}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-black mb-2 uppercase ${isDarkMode ? 'text-black' : 'text-white'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'} border-4 ${isDarkMode ? 'border-black' : 'border-white'} px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}
                  placeholder="JOHN DOE"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-black mb-2 uppercase ${isDarkMode ? 'text-black' : 'text-white'}`}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'} border-4 ${isDarkMode ? 'border-black' : 'border-white'} px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}
                  placeholder="JOHN@COMPANY.COM"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className={`block text-sm font-black mb-2 uppercase ${isDarkMode ? 'text-black' : 'text-white'}`}>
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'} border-4 ${isDarkMode ? 'border-black' : 'border-white'} px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}
                  placeholder="YOUR COMPANY"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-black mb-2 uppercase ${isDarkMode ? 'text-black' : 'text-white'}`}>
                  Project Details
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className={`w-full ${isDarkMode ? 'bg-gray-100' : 'bg-gray-900'} border-4 ${isDarkMode ? 'border-black' : 'border-white'} px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none font-bold ${isDarkMode ? 'text-black' : 'text-white'}`}
                  placeholder="TELL US ABOUT YOUR PROJECT..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
                whileTap={{ scale: 0.95 }}
                className={`w-full bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 font-black text-xl uppercase transition-all border-4 ${isDarkMode ? 'border-black' : 'border-white'} ${isDarkMode ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' : 'shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]'}`}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <footer className={`mt-32 pt-12 border-t-4 ${isDarkMode ? 'border-white' : 'border-black'}`}>
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-5xl font-black mb-4 uppercase">
            <span className={isDarkMode ? 'text-white' : 'text-black'}>flush</span>
            <span className="text-yellow-400">it</span>
          </div>
          <p className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold text-xl mb-4 uppercase`}>
            Clear. Create. Flow. Repeat.
          </p>
          <p className="text-gray-500 text-sm font-bold uppercase">
            © 2024 Flushit. Flushing bad ideas since inception.
          </p>
        </motion.div>
      </footer>
    </section>
  );
}
