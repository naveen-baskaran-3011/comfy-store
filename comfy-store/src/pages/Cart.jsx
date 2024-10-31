import { useSelector } from 'react-redux';
import CartTable from './CartTable';
import { useMemo } from 'react';
import { formatPrice } from '../utils';

export default function Cart() {
    const cartObject = useSelector(state => state.cart);
    const { value, count } = cartObject;

    const subTotal = useMemo(() => {
        return value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [value]);

    const shippingCost = 500;
    const taxAmount = 0.1 * subTotal;
    const totalAmount = subTotal + taxAmount + shippingCost;

    return (<>
        <h1 className='text-3xl capitalize font-medium tracking-wider'>{count ? 'Shopping cart' : 'Your cart is empty'}</h1>
        <div className="border-b mt-4"></div>
        {count > 0 && <div className='flex'>
            <CartTable cartItems={value} />
            <div className='card card-body ml-6 mt-6 bg-base-200' style={{flexGrow: 0.5}}>
                <p className='flex justify-between text-xs border-b'>
                    <span>Subtotal</span>
                    <span>{formatPrice(subTotal)}</span>
                </p>
                <p className='flex justify-between text-xs border-b'>
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                </p>
                <p className='flex justify-between text-xs border-b'>
                    <span>Tax</span>
                    <span>{formatPrice(taxAmount)}</span>
                </p>
                <p className='flex justify-between'>
                    <span>Order Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                </p>
            </div>
        </div>}
    </>)
};