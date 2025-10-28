const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/10 bg-black py-8">
      <div className="container mx-auto px-4">
        <p className="text-gray-500">
          © {new Date().getFullYear()} Heewon Kim. All rights reserved. |
          MotionGallery
        </p>
      </div>
    </footer>
  );
};

export default Footer;
