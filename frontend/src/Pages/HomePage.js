import react from "react";
import Navbar from "../Layout/Navbar";
import '../Css/Home.css';
import Footer from "../Layout/Footer";
import Carousel from "../Components/Carousel";
import Cards from "../Components/Cards";
import PhotoGrid from "../Components/PhotoGrid";


export default function Home() {
    return (
        <div>
            <Navbar />
            <Carousel />
            <Cards />
            <PhotoGrid />
            <Footer/>
        </div>
    );
}