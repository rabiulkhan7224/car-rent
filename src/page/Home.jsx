import Banner from "../components/Banner";
import Recent from "../components/Recent";
import UserTestimonials from "../components/UserTestimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>

            <div>
                <h1>Recent Listings Section</h1>
                <Recent></Recent>
            </div>
            <div>
                <WhyChooseUs></WhyChooseUs>
            </div>
            <div>
                <UserTestimonials></UserTestimonials>
            </div>
        </div>
    );

};

export default Home;