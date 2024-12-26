import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from "axios";
import { Pagination, Navigation } from 'swiper/modules';
import StarRatings from "react-star-ratings";

// import { Pagination } from 'swiper';

const UserTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {

        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_url}/testimonials`);
            setTestimonials(response.data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    };
    return (
        <div className="container mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-6">User Testimonials</h2>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                className="mySwiper"
            >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial._id}>
                        <div className="p-6 border rounded-lg w-96 shadow-lg bg-white">
                            <img
                                src={testimonial.profileImage}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full mx-auto mb-4"
                            />
                            <h3 className="text-lg font-semibold text-center mb-2">{testimonial.name}</h3>
                            {/* <Rating value={testimonial.rating} /> */}
                            <p className="text-gray-600 text-center mt-2">{testimonial.text}</p>
                            <StarRatings
                                rating={testimonial?.rating}
                                starDimension="24px"
                                starSpacing="8px"
                                starRatedColor='rgb(255,165,0)'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default UserTestimonials;