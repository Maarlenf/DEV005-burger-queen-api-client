import { bannerBurger } from "../../images";

function Banner() {
  return (
    <>
      <div className='contain-banner'>
        <img
          src={bannerBurger}
          className='banner'
          alt='Banner Burguer Queen'
        />
      </div>
    </>
  );
}

export default Banner;
