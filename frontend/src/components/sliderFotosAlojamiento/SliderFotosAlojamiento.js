// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function SliderFotosAlojamiento({fotos}) {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
            fotos.map(f => 
                <SwiperSlide>
                    <img src={f.path} width={"100%"} alt={f.descripcion}></img>
                </SwiperSlide>
            )
        }
        
      </Swiper>
      </>
  );
}
