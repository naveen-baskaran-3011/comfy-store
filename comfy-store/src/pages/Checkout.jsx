import { useSelector } from "react-redux"
import FormInput from "../components/FormInput";
import CartTotal from "./CartTotal";

export default function Checkout() {
    const { value: cartItems } = useSelector(state => state.cart);
    return (<>
        <h1 className='text-3xl capitalize border-b pb-5 font-medium tracking-wider'>place your order</h1>
        <div className='flex'>
            <div style={{ flexGrow: 1 }}>
                <form method="post" action="/checkout">
                    <FormInput
                        label='First Name'
                        name='first_name'
                        type='text' />
                    <FormInput
                        label='Address'
                        name='address'
                        type='text' />
                </form>
            </div>
            <CartTotal cartItems={cartItems} />
        </div>
        <button
            className='uppercase w-full btn btn-primary mt-4'
            onClick={() => {}}>
            Place your order
        </button>
    </>)
};