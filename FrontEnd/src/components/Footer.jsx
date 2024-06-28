import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer id="footer" className="bg-slate-200">
      <div className="container mx-auto p-4 ">
      <div className="mb-4">
          <h4 className="text-xl font-semibold">ShopNow</h4>
          <p>© {new Date().getFullYear()} ShopNow. All rights reserved.</p>
        </div>
        <div className="flex justify-end space-x-4">
          <a href="#" className="text-slate-700 hover:text-gray-400">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-slate-700 hover:text-gray-400">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-slate-700 hover:text-gray-400">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" className="text-slate-700 hover:text-gray-400">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
