import React from "react";
import Banner from "../Components/Banner"
import Belt from "../Components/Belt"
import Navbar from "../Components/Navbar";

const Home = () => {
    return(
        <div>
            <Navbar />
            <hr className="hr"/>
            <Banner />
            <Belt />
        </div>
    )
}

export default Home;