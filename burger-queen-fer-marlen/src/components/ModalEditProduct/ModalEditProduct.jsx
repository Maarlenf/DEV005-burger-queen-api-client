import { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Input from "../Input/Input";
import "../Input/Input.css";
import "../ModalEdit/ModalEdit.css";
import { createProduct, editProduct } from "../../lib/api";

function ModalEditProduct({ onClose, dataProduct, token, option }) {
  const [product, setProduct] = useState(dataProduct.name);
  const [price, setPrice] = useState(dataProduct.price);
  const [image, setImage] = useState(dataProduct.image);
  const [type, setType] = useState(dataProduct.type);
  const [failImage, setViewImage] = useState(dataProduct.image);

  if (!{ dataProduct }) {
    setProduct("");
    setPrice("");
    setImage("");
    setType("");
  }

  const listType = [
    { type: "Desayuno", title: "Desayuno" },
    { type: "Almuerzo", title: "Almuerzo" },
    { type: "Cena", title: "Cena" },
  ];

  const confirm = () => {
    if (!dataProduct.id) {
      createProduct(token, product, price, image, type).then((res) =>
        console.log(res)
      );
    } else {
      editProduct(token, dataProduct.id, product, price, image, type).then(
        (res) => console.log(res)
      );
    }
    onClose();
  };
  return (
    <>
      <div className='modal' id='modalEditProduct'>
        <div className='innerModal'>
          <div className='containerClose'>
            <AiOutlineClose size={30} onClick={onClose} />
          </div>
          <form action='submit' className='viewAdmin'>
            <>
              <label>
                <Input
                  textLabel='Nombre'
                  type='text'
                  className='input'
                  placeholder='Hamburguesa Doble'
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </label>
              <label>
                <Input
                  textLabel='Precio'
                  type='text'
                  className='input'
                  placeholder='$ 1000'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label>
                <div className='containerImg'>
                  <span>Imágen</span>
                  <img
                    alt='image product'
                    src={image}
                    style={{ margin: "10px", width: "100px", height: "100px" }}
                  />
                  {/* <Input
                    type='file'
                    className='input'
                    placeholder='imageBurger.png...'
                    alt='image product'
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setViewImage(URL.createObjectURL(e.target.files[0]));
                      }
                    }}
                  /> */}
                  <Input
                    type='text'
                    className='input'
                    placeholder='ingresa la url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </label>
              <div className='containerRadio'>
                {listType.map((e) => {
                  //   console.log(e);
                  return (
                    <label key={e.type}>
                      <input
                        type='radio'
                        key={e.id}
                        name='myRadio'
                        value={type}
                        defaultChecked={type === e.type}
                        onChange={() => {
                          setType(e.type);
                        }}
                      />
                      {e.title}
                    </label>
                  );
                })}
              </div>
              <div className='containerChecks'>
                <AiOutlineCheck
                  data-testid='modalOptionProducts'
                  size={30}
                  onClick={confirm}
                />
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEditProduct;
