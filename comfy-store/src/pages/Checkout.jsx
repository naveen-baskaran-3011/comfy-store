import { useSelector } from "react-redux"
import FormInput from "../components/FormInput";
import CartTotal from "./CartTotal";
import { Form, redirect } from "react-router-dom";
import { formatPrice, triggerFlashMessage } from "../utils";
import { removeAllProducts } from "../slice/cartSlice";

export const action = (store, queryClient) => {
    return async ({ request }) => {
        const cartItems = store.getState().cart.value;
        const jwt = store.getState().user.jwt;
        const requestData = await request.formData();
        const formData = Object.fromEntries(requestData);

        const subTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const shippingCost = 500;
        const taxAmount = 0.1 * subTotal;
        const totalAmount = subTotal + taxAmount + shippingCost;
        const numItemsInCart = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        try {
            const result = await fetch('https://strapi-store-server.onrender.com/api/orders', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        address: formData.address,
                        chargeTotal: totalAmount,
                        name: formData.first_name,
                        numItemsInCart: numItemsInCart,
                        orderTotal: formatPrice(totalAmount),
                        cartItems: cartItems.map(el => {
                            return {
                                amount: el.quantity,
                                cartID: `${el.id}${el.color}`,
                                company: el.company,
                                image: el.image,
                                price: el.price,
                                productColor: el.color,
                                productID: el.product_id,
                                title: el.title
                            };
                        })
                    }
                })
            })

            if (result.ok) {
                queryClient.removeQueries(['orders']);
                store.dispatch(removeAllProducts());
                triggerFlashMessage({
                    message: 'Order placed successfully !',
                    messageType: 'success'
                });
                return redirect('/orders');
            } else {
                triggerFlashMessage({
                    message: 'Error while placing an order !',
                    messageType: 'error'
                });
                throw new Error('Yeah... Sorry');
            }
        } catch (e) {
            triggerFlashMessage({
                message: 'Error while placing an order !',
                messageType: 'error'
            });
            console.error(e);
        }
    }
};

export default function Checkout() {
    const { value: cartItems } = useSelector(state => state.cart);
    return (<>
        <h1 className='text-3xl capitalize border-b pb-5 font-medium tracking-wider'>place your order</h1>
        <div className='flex'>
            <div style={{ flexGrow: 1 }}>
                <Form method="post">
                    <FormInput
                        label='First Name'
                        name='first_name'
                        type='text' />
                    <FormInput
                        label='Address'
                        name='address'
                        type='text' />
                    <button
                        className='uppercase w-full btn btn-primary mt-4'
                        type="submit">
                        Place your order
                    </button>
                </Form>
            </div>
            <CartTotal cartItems={cartItems} />
        </div>
    </>)
};