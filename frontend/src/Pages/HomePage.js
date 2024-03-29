import react from "react";
import '../Css/Home.css';
import Footer from "../Layout/Footer";
import Carousel from "../Components/Carousel";
import Cards from "../Components/Cards";
import PhotoGrid from "../Components/PhotoGrid";
import Services from "../Components/Services";

export default function Home() {
    return (
        <div className="homep">
            <Carousel />
            <Cards />
            <PhotoGrid />
            <div className="gradientbg">
               <Services />
               <Footer/> 
            </div>
            
        </div>
    );
}