import Navbar from "@/componenets/main/navbar/page"
import Suggestion from "@/componenets/suggesttopics/page";
export default function MainLayout({ children }) {
  return (
   <>
        <Navbar />
        {children}
      
   </>
  );
}
