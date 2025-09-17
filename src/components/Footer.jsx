export default function Footer() {
  return (
    <footer className=" top-0 left-0 w-full z-50 bg-[#2d2420]/70 backdrop-blur-md shadow-md text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-cat-subtext1 text-sm">
        <p>
          © {new Date().getFullYear()} <span className="text-cat-mauve font-semibold">Moonbrew</span>.  
          All rights reserved.
        </p>
        <p className="mt-1">
          Built with ❤️ using React + Appwrite + Catppuccin
        </p>
      </div>
    </footer>
  );
}