import { useMemo } from "react";
import { formatPrice } from "../utils";

export default function ({ cartItems }) {
    const subTotal = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    const shippingCost = 500;
    const taxAmount = 0.1 * subTotal;
    const totalAmount = subTotal + taxAmount + shippingCost;

    return (
        <div className='card card-body ml-6 mt-6 bg-base-200 h-48' style={{ flexGrow: 0.5 }}>
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
    )
}