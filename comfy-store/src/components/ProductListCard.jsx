import { formatPrice } from "../utils";

export default function ({ productConfig }) {
    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure>
                <img
                    className="h-32 w-32"
                    src={productConfig.image}
                    alt={productConfig.title} />
            </figure>
            <div className="card-body flex flex-row justify-between">
                <div>
                    <h2 className="card-title capitalize">{productConfig.title}</h2>
                    <h3 className="text-neutral-content capitalize">{productConfig.company}</h3>
                </div>
                <div>
                    <p>{formatPrice(productConfig.price)}</p>
                </div>
            </div>
        </div>
    );
};