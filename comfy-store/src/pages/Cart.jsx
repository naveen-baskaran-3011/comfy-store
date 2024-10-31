import { useSelector } from 'react-redux';
import CartTable from './CartTable';
import CartTotal from './CartTotal';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cartObject = useSelector(state => state.cart);
    const userObject = useSelector(state => state.user);
    const navigate = useNavigate();
    const { value: cartItems, count } = cartObject;

    const canProceed = userObject.user !== null;
    const proceedBtnClick = useCallback(() => {
        navigate(canProceed ? '/checkout' : '/login')
    }, [canProceed]);

    return (<>
        <h1 className='text-3xl capitalize font-medium tracking-wider'>{count ? 'Shopping cart' : 'Your cart is empty'}</h1>
        <div className="border-b mt-4"></div>
        {count > 0 && <>
            <div className='flex'>
                <CartTable cartItems={cartItems} />
                <CartTotal cartItems={cartItems} />
            </div>
            <button
                className='uppercase w-full btn btn-primary mt-4'
                onClick={proceedBtnClick}>
                {canProceed ? 'Proceed to checkout' : 'Please login'}
            </button>
        </>}
    </>)
};