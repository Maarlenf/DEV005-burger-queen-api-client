import bannerBurguer from "../../assets/banner-opacity.png";

function Banner() {
  return (
    <>
      <div className='contain-banner'>
        <img
          src={bannerBurguer}
          className='banner'
          alt='Banner Burguer Queen'
        />
      </div>
    </>
  );
}

export default Banner;
