import { formatPrice } from "../utils";

export default function ({ productConfig }) {
    return (
        <div className="card glass w-50">
            <figure>
                <img
                    className="h-64 w-full"
                    src={productConfig.image}
                    alt={productConfig.title} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{productConfig.title}</h2>
                <p>{formatPrice(productConfig.price)}</p>
            </div>
        </div>
    )
}