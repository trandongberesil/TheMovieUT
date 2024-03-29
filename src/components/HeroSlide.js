import tmdbApi, { movieType } from "../api/tmdbApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HeroSlide() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const respone = await tmdbApi.trendings();
        setMovieItems(respone.results.slice(0, 4));
      } catch {}
    };

    fetch();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function HeroSlideItem({ item }) {
  const link = `/movie/${item.id}`;
  return (
    <div
      className="slide-item"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${item.backdrop_path}")`,
      }}
    >
      <div className="container item-details">
        <h2 className="item-title">{item.original_title}</h2>
        <div className="item-desc">
          <div className="item-vote">
            <i className="bx bxs-star"></i>
            {item.vote_average}
          </div>
          <div className="item-date">{item.release_date}</div>
        </div>
        <Link className="text-link" to={link}>
          <button className="btn btn-trailer">Watch Now</button>
        </Link>
      </div>
    </div>
  );
}

export default HeroSlide;
