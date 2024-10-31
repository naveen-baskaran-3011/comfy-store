import { useDispatch } from 'react-redux';
import { formatPrice } from '../utils';
import { removeFromCart, updateCartItem } from '../slice/cartSlice';

export default function ({ cartItems }) {
    const dispatch = useDispatch();

    return (<div className="overflow-x-auto mt-6" style={{flexGrow: 1}}>
        <table className="table">
            <tbody>
                {cartItems.map(item => (
                    <tr key={item.id}>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={item.image}
                                            alt={item.title} />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold capitalize">{item.title}</div>
                                    <div className="text-sm opacity-50 capitalize font-medium">{item.company}</div>
                                    <div
                                        style={{ backgroundColor: item.color }}
                                        className="badge badge-xs mr-2 border-1 border-secondary" />
                                </div>
                            </div>
                        </td>
                        <td>
                            Amount
                            <br />
                            <select
                                className='select select-secondary select-bordered select-xs'
                                value={item.quantity}
                                onChange={(e) => {
                                    dispatch(updateCartItem({
                                        product_id: item.product_id,
                                        color: item.color,
                                        quantity: Number(e.target.value)
                                    }))
                                }}
                            >
                                {Array.from({ length: item.quantity + 5 }, (_, index) => {
                                    const amount = index + 1;
                                    return (
                                        <option key={amount} value={amount}>
                                            {amount}
                                        </option>
                                    );
                                })}
                            </select>
                            <br />
                            <button className='link link-primary link-hover' onClick={() => dispatch(removeFromCart({
                                product_id: item.product_id,
                                color: item.color
                            }))}>remove</button>
                        </td>
                        <td>{formatPrice(item.price)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>)
}