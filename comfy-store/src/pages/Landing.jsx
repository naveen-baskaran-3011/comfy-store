import { featuredProducts } from "../api/products";
import styles from './Landing.module.css';
import hero1 from '../../../project-assets/hero1.webp';
import hero2 from '../../../project-assets/hero2.webp';
import hero3 from '../../../project-assets/hero3.webp';
import hero4 from '../../../project-assets/hero4.webp';
import { Link, useLoaderData } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const featuredProductQuery = () => {
    return {
        queryKey: ['featuredProducts'],
        queryFn: () => featuredProducts()
    }
}

export const loader = (queryClient) => {
    return async () => {
        const response = await queryClient.ensureQueryData(
            featuredProductQuery()
        );

        return response;
    }
}

const carouselImages = [hero1, hero2, hero3, hero4];

export default function Landing() {
    const featureProducts = useLoaderData();
    return (<>
        <div className="flex justify-between">
            <div className={`description ${styles.description}`}>
                <h2 className="text-6xl max-w-2xl font-bold">We are changing the way people shop</h2>
                <p className="mt-5 text-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>
                <Link to="/products" className="btn btn-primary capitalize mt-10">Our Products</Link>
            </div>
            <div className={`carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 ${styles.carousel}`}>
                {carouselImages.map(cImg => (
                    <div className="carousel-item" key={cImg}>
                        <img
                            src={cImg}
                            className="rounded-box h-90 w-80" />
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-10">
            <h3 className="text-3xl capitalize font-bold">Feature products</h3>
            <div className="border-b mt-5"></div>
            <div className="pt-12 grid grid-cols-3 gap-4">
                {featureProducts.map(product => (
                    <Link key={product.id} to={`/products/${product.id}`}>
                        <ProductCard productConfig={product.attributes} />
                    </Link>
                ))}
            </div>
        </div>
    </>)
};