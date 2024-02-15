import react from "react";
import Navbar from "../Layout/Navbar";
import '../Css/Home.css';
import Footer from "../Layout/Footer";

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>Home Page</h1>
            <Footer/>
        </div>
    );
}