const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black py-8">
      <div className="container">
        {/* <p className="text-sm text-gray-400 md:text-lg"> */}
        <p className="text-sm text-gray-400 md:text-base">
          © {new Date().getFullYear()} Heewon Kim. All rights reserved |
          MotionGallery
        </p>
      </div>
    </footer>
  );
};

export default Footer;
