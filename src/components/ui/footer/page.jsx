import Link from "next/link";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
export const Footer = () => {
  return (
    <div className="w-full h-full bg-gris text-text2">
      {/* Parte principal del footer */}
      <div className="md:flex mx-auto w-full h-full justify-between items-center p-5">
        {/* Redes */}
        <div className="w-[100%] md:w-[30%] flex items-center my-1">
          <Link
            href={"/"}
            className="p-2 hover:text-celeste transition-all duration-300"
          >
            <IoLogoInstagram />
          </Link>
          <Link
            href={"/"}
            className="p-2 hover:text-celeste transition-all duration-300"
          >
            <IoLogoFacebook />
          </Link>
        </div>
        {/* Navegación */}
        <div className="w-[100%] md:w-[30%] flex items-center my-1">
          <nav>
            <h2 className="text-sm font-bold">NAVEGACIÓN</h2>
            <ul className="flex flex-col justify-center items-start">
              <Link
                href={"/"}
                className="px-2 mt-1 hover:text-celeste transition-all duration-300 cursor-pointer w-full text-xs"
              >
                INICIO
              </Link>

              <Link
                href={"/products"}
                className="px-2 mt-1 hover:text-celeste transition-all duration-300 cursor-pointer w-full text-xs"
              >
                PRODUCTOS
              </Link>

              <Link
                href={"/contact"}
                className="px-2 mt-1 hover:text-celeste transition-all duration-300 cursor-pointer w-full text-xs"
              >
                CONTACTO
              </Link>
            </ul>
          </nav>
        </div>
        {/* Contacto */}
        <div className="w-[100%] md:w-[30%] flex flex-col justify-center items-start my-1">
          <h2 className="font-bold text-sm">CONTACTO</h2>
          <p className="text-xs px-2 mt-1">3755-344429</p>
          <p className="text-xs px-2 mt-1">Maximilianoalegre@gmail.com</p>
        </div>
      </div>
      {/* Derechos reservados */}
      <div className="flex justify-center items-center">
        <Link href="/">
          <span className={`antialiased font-bold`}>Distribuciones</span>
          <span> | M&D </span>
          <span>© {new Date().getFullYear()}</span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
