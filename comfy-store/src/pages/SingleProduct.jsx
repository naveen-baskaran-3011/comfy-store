import { fetchProduct } from "../api/products";
import { Link, useLoaderData, useParams } from "react-router-dom";
import styles from './SingleProduct.module.css';
import { formatPrice } from "../utils";
import { useCallback, useEffect, useState } from "react";

const singleProductQuery = (id) => {
    return {
        queryKey: ['singleProduct', id],
        queryFn: () => fetchProduct(id),
    };
};

export function loader(queryClient) {
    return async ({ params }) => {
        const response = await queryClient.ensureQueryData(
            singleProductQuery(params.id)
        );

        return response;
    };
};

export default function SingleProduct() {
    const { attributes } = useLoaderData();
    const abc = useLoaderData();

    const [colorCode, setColorCode] = useState(attributes.colors[0]);
    const [quantity, setQuantity] = useState(1);

    const selectColor = useCallback((color) => {
        setColorCode(color);
    });

    const handleQuantity = useCallback((e) => {
        setQuantity(parseInt(e.target.value));
    }, []);

    return (
        <>
            <div className='text-md breadcrumbs mb-3'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/products'>Products</Link>
                    </li>
                </ul>
            </div>
            <div className="flex gap-x-16">
                <img src={attributes.image} alt={attributes.title} className={`w-96 h-96 ${styles.product_image} ${styles.image_width}`} />
                <div className={`details ${styles.details}`}>
                    <h1 className="capitalize font-bold text-3xl">{attributes.title}</h1>
                    <h3 className="capitalize font-bold text-xl text-neutral-content mt-2">{attributes.company}</h3>
                    <p className="mt-3 text-xl">{formatPrice(attributes.price)}</p>
                    <p className="mt-6">{attributes.description}</p>

                    {/* Color */}
                    <div className="mt-10">
                        <h3 className="font-bold">Colors</h3>
                        <div>
                            {attributes.colors.map(color => (
                                <button
                                    key={color}
                                    style={{ backgroundColor: color }}
                                    className={`badge w-6 h-6 mr-2 ${colorCode === color ? 'border-2 border-secondary' : ''}`}
                                    onClick={() => { selectColor(color) }} />
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className='form-control w-full max-w-xs'>
                        <label className='label'>
                            <h4 className='text-md font-medium tracking-wider capitalize'>
                                quantity
                            </h4>
                        </label>
                        <select
                            className='select select-secondary select-bordered select-md'
                            value={quantity}
                            onChange={handleQuantity}
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                    </div>
                </div>
            </div>
        </>)
};