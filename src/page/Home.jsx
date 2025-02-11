import Banner from "../components/Banner";
import Recent from "../components/Recent";
import UserTestimonials from "../components/UserTestimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
    return (
        <div className="overflow-y-hidden">
            <Banner></Banner>

            <div>
                <h1 className="text-3xl font-bold text-center pt-5 pb-2">Most Recently </h1>
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