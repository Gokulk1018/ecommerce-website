// src/FeaturedCarousel.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import './App.css';

const FeaturedCarousel = () => {
  const featured = [
    { id: 1, image: '/images/featured1.jpg', text: '✨ New Arrivals – Fresh Deals!' },
    { id: 2, image: '/images/featured2.jpg', text: '🔥 Big Discounts on Electronics!' },
    { id: 3, image: '/images/featured3.jpg', text: '🌸 Trending Fashion Picks!' },
  ];

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        spaceBetween={10}
      >
        {featured.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="carousel-slide">
              <img src={item.image} alt={item.text} />
              <div className="carousel-caption">{item.text}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedCarousel;
