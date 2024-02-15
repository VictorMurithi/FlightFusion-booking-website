import react from "react";
import Navbar from "../Layout/Navbar";
import '../Css/Home.css';
import Footer from "../Layout/Footer";
import Carousel from "../Components/Carousel";


export default function Home() {
    return (
        <div>
            <Navbar />
            <Carousel />
            <Footer/>
        </div>
    );
}