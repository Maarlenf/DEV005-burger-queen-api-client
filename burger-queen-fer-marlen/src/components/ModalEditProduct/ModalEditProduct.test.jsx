/**
 * @jest-environment jsdom
 */
 import ModalEditProduct from "./ModalEditProduct";
 import React from "react";
 import { render, screen,  fireEvent, renderHook, waitFor} from "@testing-library/react";
 import { editProduct, createProduct } from "../../lib/api";

 jest.mock("../ModalEditProduct/ModalEditProduct.css", () => ({
    banner: {},
  }));

jest.mock("../Input/Input.css", () => ({
    banner: {},
  }));
  
  jest.mock("../../lib/api", () => ({
    editProduct: jest.fn().mockResolvedValue(),
    createProduct: jest.fn().mockResolvedValue()
  }));

describe('ModalEditProduct component', () => {
    test('have a function to send edit', () => {
        const mockRes = {
            dateEntry: "2022-03-05 15:14:10",
            id: 3,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            price: 500,
            type: "Almuerzo",
          };
        const onCloseMock = jest.fn();
        const {getByLabelText} = render(<ModalEditProduct dataProduct={mockRes} onClose={onCloseMock}/>);
        const radioDes = screen.getByLabelText("Desayuno");
        const radioAlm = screen.getByLabelText("Almuerzo");
        const radioCen = screen.getByLabelText("Cena");
        fireEvent.click(radioDes);
        expect(radioDes).toBeChecked();
        expect(radioAlm).not.toBeChecked();
        expect(radioCen).not.toBeChecked();
    })
    test('call a function to createProduct', () => {
        const mockRes = {
            dateEntry: "2022-03-05 15:14:10",
            // id: 3,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            price: 500,
            type: "Almuerzo",
          };
        const onCloseMock = jest.fn();
        render(<ModalEditProduct onClose={onCloseMock} dataProduct={mockRes}/>);
        const button = screen.getByTestId('modalOptionProducts');
            fireEvent.click(button);
            expect(createProduct).toHaveBeenCalled();
    })
    test('call a function to createProduct', () => {
        const mockRes = {
            dateEntry: "2022-03-05 15:14:10",
            id: 3,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            price: 500,
            type: "Almuerzo",
          };
        const onCloseMock = jest.fn();
      render(<ModalEditProduct onClose={onCloseMock} dataProduct={mockRes}/>);
        const button = screen.getByTestId('modalOptionProducts');
            fireEvent.click(button);
            expect(editProduct).toHaveBeenCalled();
    })
    test('change content of input', () =>{
        const mockRes = {
            dateEntry: "2022-03-05 15:14:10",
            id: 3,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            price: 500,
            type: "Almuerzo",
          };
          const onCloseMock = jest.fn();
          const {getByLabelText, getByText} = render(<ModalEditProduct dataProduct={mockRes} onClose={onCloseMock}/>);
          expect(getByLabelText('Nombre')).toHaveValue(mockRes.name);
          expect(getByLabelText('Precio')).not.toBe('string');
          expect(getByLabelText('Almuerzo')).toBeChecked();
    })
    test('show modal whit nothing text when create product', () => {
        const dataProduct = {
            // dateEntry: "2022-03-05 15:14:10",
            // id: 3,
            // image:
            //   "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            // name: "Agua 500ml",
            // price: 500,
            // type: "Almuerzo",
          };
          const onCloseMock = jest.fn();
          const {getByLabelText, getByText} = render(<ModalEditProduct dataProduct={dataProduct} onClose={onCloseMock}/>);

        const labelName = getByLabelText("Nombre");
        const labelPrice = getByLabelText("Precio");
        const labelImg = getByLabelText('Imágen');
        
        fireEvent.change(labelName, {target:{value: 'Pan con palta'}});
        fireEvent.change(labelPrice, {target:{value: '10'}});
        fireEvent.change(labelImg, {target:{value: 'http://mentira.com/hola.png'}});

        expect(labelName).toHaveValue('Pan con palta');
        expect(labelImg).toHaveValue('http://mentira.com/hola.png');
    })
    test("have hooks initial whit value ''", () => {
        const onCloseMock = jest.fn();
        const dataProduct = {
            // dateEntry: "2022-03-05 15:14:10",
            // id: 3,
            // image:
            //   "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            // price: 500,
            // type: "Almuerzo",
          };
          render(<ModalEditProduct dataProduct={dataProduct} onClose={onCloseMock} />)
        const { result } = renderHook(() => {
            const [product, setProduct] = React.useState(dataProduct.name);
            React.useEffect(() => {
                setProduct('')
              }, [])
            return product;
        });
        expect(result.current).toBe('');
    })
    // test("have hooks of product initial whit value ''", () => {
    //     const onCloseMock = jest.fn();
    //     const dataProduct = {
    //         image:
    //         "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
    //         name: "Agua 500ml",
    //         price: 500,
    //         type: "Almuerzo",
    //       };
    //       render(<ModalEditProduct onClose={onCloseMock} dataProduct={dataProduct} />)
        
    // });  
    // test("have hooks of price initial whit value ''", () => {
    //     const onCloseMock = jest.fn();
    //     const dataProduct = {
    //         // dateEntry: "2022-03-05 15:14:10",
    //         // id: 3,
    //         // image:
    //         //   "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
    //         //name: "Agua 500ml",
    //         price: 500,
    //         // type: "Almuerzo",
    //       };
    //       render(<ModalEditProduct dataProduct={dataProduct} onClose={onCloseMock} />)
    //     const { result } = renderHook(() => {
    //         const [price, setPrice] = React.useState(dataProduct.price);
    //         React.useEffect(() => {
    //             setPrice('')
    //           }, [])
    //         return price;
    //     });
    //     expect(result.current).toBe('');
    // })
})