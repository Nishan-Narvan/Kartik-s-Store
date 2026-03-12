import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    'COMPANY': ['ABOUT', 'CAREERS', 'PRIVACY', 'TERMS', 'PRESS'],
    'SERVICES': ['GIFT CARDS', 'SHIPPING', 'RETURNS', 'TRACKING', 'HELP'],
  };

  return (
    <footer className="w-full bg-white border-t border-[#e5e5e5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 3xl:max-w-full 3xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 sm:gap-12">
          {/* Company Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col items-center">
              <h3 className="text-black text-xs font-medium tracking-[0.15em] uppercase mb-8">
                {title}
              </h3>
              <ul className="space-y-4 text-center">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="text-[#999] hover:text-black text-[11px] tracking-wider uppercase transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-black text-xs font-medium tracking-[0.15em] uppercase mb-8">
              CONTACT
            </h3>
            <ul className="space-y-3 text-center text-[11px] tracking-wider text-[#999] mb-8">
              <li>123 FASHION STREET</li>
              <li>Faridabad, HR 400001</li>
              <li>+91 76783 72732</li>
              <li>HELLO@KARTIK.COM</li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-6">
              {['INSTAGRAM', 'TWITTER', 'PINTEREST'].map((social) => (
                <a
                  key={social}
                  href="https://www.instagram.com/kart.ikyadav_/"
                  className="text-[9px] tracking-wider text-[#999] hover:text-black transition-colors duration-200 uppercase"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#e5e5e5] bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 3xl:max-w-full 3xl:px-16">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 text-center sm:text-left">
            <p className="text-[10px] tracking-wider text-[#999] uppercase order-2 sm:order-1">
              © 2026 KARTIK. ALL RIGHTS RESERVED.
            </p>
            
            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-3 order-1 sm:order-2">
              <img 
                src="/assets/images/payment.png" 
                alt="Payment Methods" 
                className="h-5 object-contain"
              />
              <div className="flex gap-4">
                <span className="text-[8px] tracking-wider text-[#999] uppercase">UPI</span>
                <span className="text-[8px] tracking-wider text-[#999] uppercase">VISA</span>
                <span className="text-[8px] tracking-wider text-[#999] uppercase">MASTERCARD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
