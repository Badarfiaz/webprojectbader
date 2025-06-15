import { Link } from 'react-router-dom';
import { 
  FiHome,
  FiClock,
  FiShoppingBag,
  FiSmartphone,
  FiMail,
  FiInstagram,
  FiTwitter,
  FiFacebook
} from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Shop Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiShoppingBag className="mr-2 text-teal-400" />
              Shop
            </h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/item/watches" 
                  className="hover:text-teal-400 transition-colors flex items-center"
                >
                  <FiClock className="mr-2 text-sm" />
                  Watches
                </Link>
              </li>
              <li>
                <Link 
                  to="/item/shoes" 
                  className="hover:text-teal-400 transition-colors flex items-center"
                >
                  <FiShoppingBag className="mr-2 text-sm" />
                  Shoes
                </Link>
              </li>
              <li>
                <Link 
                  to="/item/phones" 
                  className="hover:text-teal-400 transition-colors flex items-center"
                >
                  <FiSmartphone className="mr-2 text-sm" />
                  Phones
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiHome className="mr-2 text-teal-400" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="hover:text-teal-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-teal-400 transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-teal-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-teal-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FiMail className="mr-2 text-teal-400" />
              Contact Us
            </h3>
            <address className="not-italic space-y-2">
              <p>123 Main Street, Karachi</p>
              <p>Pakistan</p>
              <p>Email: info@elitehorizon.com</p>
              <p>Phone: +92 300 1234567</p>
            </address>
            
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <FiFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>&copy; {new Date().getFullYear()} Pk wear. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-500">
            Designed with ❤️ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;