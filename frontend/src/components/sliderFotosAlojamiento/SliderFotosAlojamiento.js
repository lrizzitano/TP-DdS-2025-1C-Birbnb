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
      { fotos.length > 1 ?
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {
              fotos.map(f => 
                  <SwiperSlide>
                      <img src={f.path} width={"100%"} alt={f.descripcion}></img>
                  </SwiperSlide>
              )
          }
          
        </Swiper> :
        (<img src={fotos[0].path} width={"50%"} alt={fotos[0].descripcion}></img>)
      }
      </>
  );
}
