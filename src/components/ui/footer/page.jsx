import Link from "next/link";

// Assuming titleFont is imported from "@/config/fonts"
// If "@/config/fonts" is a TypeScript alias, adjust the import accordingly in your project structure
// For JavaScript, ensure the correct path relative to your project

export const Footer = () => {
  return (
    <div className="flex justify-center text-xs text-text2 mt-10">
      <Link href="/">
        <span className={`antialiased font-bold`}>
          Distribuciones
        </span>
        <span> | M&D </span>
        <span>© {new Date().getFullYear()}</span>
      </Link>
      </div>
  );
};

export default Footer;
