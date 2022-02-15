import { FC, useState, useEffect } from 'react';

// css 
import styles from './style.module.css';
import Slider from "react-slick";

interface IProps {
  images: {
    src: string
  }[]
}

const ImageList:FC<IProps> = ({images}) => {

  const [slide, setSlide] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  })

  useEffect(()=>{
    
  },[]);
  if(images.length === 0) {
    return null
  }

  if(images.length === 1) {
    return (
      <>
      <img src={images[0].src} alt={images[0].src} />
      </>
    )
  }

  if(images.length === 2) {
    return (
      <div className={styles.imageListWrap}>
        <div>
          <img src={images[0].src} alt={images[0].src} />
        </div>
        <div>
          <img src={images[1].src} alt={images[1].src} />
        </div>
      </div>
    )
  }

  if(images.length >= 3) {
    return (
      <>
      <Slider {...slide}>
        {
          images?.map((v, i)=>{
            return((
              <div key={i} style={{display:'flex', justifyContent: 'center'}}>
                <img src={v.src} style={{maxHeight:'380px', objectFit:'contain'}}/>
              </div>
            ))
          })
        }
      </Slider>
      </>
    )
  }
}

export default ImageList;