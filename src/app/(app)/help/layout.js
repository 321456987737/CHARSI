import Navbar from "@/componenets/help/navbar";
import Footer from "@/componenets/help/footer"
export default function Helplayout({ children }) {
  return (
   <>
   <div><Navbar/></div>
        {children}
        <div><Footer/></div>
   </>
  );
}
