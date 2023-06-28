/**
 * @jest-environment jsdom
 */

import React, {useState} from 'react'
import { fireEvent, render } from "@testing-library/react";
import Card from './Card';
import { renderHook } from '@testing-library/react';

jest.mock('../Card/Card.css', () => {
    display: {}
})

describe('Card component', () => {
    test('to show all details of product', () => {
        const mockRes = {
            dateEntry: "2022-03-05 15:14:10",
            id: 3,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            name: "Agua 500ml",
            price: 500,
            type: "Almuerzo",
          };
        const { container } = render(<Card id={mockRes.id} img={mockRes.image} alt='image product' nameProduct={mockRes.name} price={mockRes.price} textBtn='Agregar'/>)
        const button = container.querySelector('#btnOrder');
        expect(button.textContent).toBe('Agregar');
    })
    test('have a counter', () => {
       const {container} = render(<Card />)
        const writeNumber = container.querySelector('.counter');    
        expect(writeNumber).toHaveTextContent('0');
    })
    test('increment when click span', () => {
        const {container} = render(<Card/>);
        const sum = container.querySelector('#plus');
        fireEvent.click(sum);
        expect(container.querySelector('.counter')).toHaveTextContent('1');
    })
    test('decrement when click span', () => {
        const {container} = render(<Card/>);
        const rest = container.querySelector('#minus');
        fireEvent.click(rest);
        expect(container.querySelector('.counter')).toHaveTextContent('-1');
    })
})