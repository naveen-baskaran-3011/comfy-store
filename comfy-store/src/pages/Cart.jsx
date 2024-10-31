import { useSelector } from 'react-redux';
import CartTable from './CartTable';

export default function Cart() {
    const cartObject = useSelector(state => state.cart.value);

    return (<>
        <h1 className='text-3xl capitalize font-medium tracking-wider'>Shopping cart</h1>
        <div className="border-b mt-4"></div>
        <div>
            <CartTable cartItems={cartObject} />
        </div>
    </>)
};