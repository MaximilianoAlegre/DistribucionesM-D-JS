import { Roboto } from "next/font/google";
import "./globals.css";
import { CarritoProvider } from "@/contexts/CarritoContext";
import Provider from "@/contexts/Provider";
import { Sidebar } from "@/components/ui/sidebar/page";
import { TopMenu } from "@/components/ui/top-menu/page";
import Footer from "@/components/ui/footer/page";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Distribuciones | M&D",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={roboto.className}>
        <CarritoProvider>
          <TopMenu />
          <Sidebar/>
          <Provider>
            <div className="mt-40 w-[90%] mx-auto min-h-screen">{children}</div>
          </Provider>
          <Footer />
        </CarritoProvider>
      </body>
    </html>
  );
}
