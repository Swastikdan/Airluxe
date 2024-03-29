'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function ImageSlider({ customButton, images, isFavorite, id }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFavoritePlace, setIsFavoritePlace] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  useEffect(() => {
    if (isFavorite === true) {
      setIsFavoritePlace(true);
    }
  }, [isFavorite]);

  const handleFavoriteClick = () => {
    if (session?.user) {
      setFavoriteLoading(true);
      setIsFavoritePlace(!isFavoritePlace);

      fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId: id }),
      })
        .then((res) => res.json())
        .then((data) => {
        setFavoriteLoading(false);
          toast.success(data.message);
        })
        .catch((error) => {
         setFavoriteLoading(false);
          toast.error('An error occurred');
          setIsFavoritePlace(isFavoritePlace);
        });
    } else {
      router.push('/login');
    }
  };

  return (
    <div className=" group relative z-0 m-1 flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-600">
      <button
        className={`prevButton${customButton} absolute  left-5 -z-10 -mr-10 cursor-pointer rounded-full bg-white py-[6px] pl-[5px] pr-[6px] text-black  opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
      >
        <ChevronLeft width={20} height={20} />
        <span className="sr-only">Previous</span>
      </button>
      <Swiper
        cssMode={true}
        direction={'horizontal'}
        pagination={{
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true,
        }}
        slidesPerView={1}
        navigation={{
          nextEl: `.nextButton${customButton}`,
          prevEl: `.prevButton${customButton}`,
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper z-0"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <Link href={`/place/${id}`}>
              <img
                src={img.replace('/upload/', '/upload/w_1000/')}
                alt="property image"
                className="h-[300px] w-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination px-3 py-1 "></div>
      </Swiper>

      <button
        className={`nextButton${customButton} absolute right-5 -z-10 -ml-10 cursor-pointer rounded-full bg-white p-[6px] text-black opacity-0 shadow-xl transition-all duration-200 hover:scale-105 hover:transition-all disabled:opacity-0 group-hover:z-10 md:opacity-100`}
      >
        <ChevronRight width={20} height={20} />
        <span className="sr-only">Next</span>
      </button>
      <button
        className="absolute right-2 top-2 z-20 rounded-full p-3"
        onClick={() => handleFavoriteClick()}
      >
        <Heart
          width={30}
          height={30}
          disabled={favoriteLoading}
          className={`text-white disabled:pointer-events-none md:h-7 md:w-7 ${favoriteLoading ? 'animate-pulse' : ''} `}
          fill={
            isFavoritePlace === true ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'
          }
          focusable="true"
          strokeWidth={1}
        />
      </button>
    </div>
  );
}
