import Banner from "../components/Banner";
import Recent from "../components/Recent";

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div>
                <h1>Recent Listings Section</h1>
                <Recent></Recent>
            </div>
        </div>
    );
    
};

export default Home;