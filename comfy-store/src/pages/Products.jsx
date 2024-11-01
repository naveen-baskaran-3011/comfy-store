import { fetchListItems } from "../api/products";
import ProductCard from "../components/ProductCard";
import { Link, useLoaderData } from "react-router-dom";
import { BsGrid, BsList } from "react-icons/bs";
import { useState } from "react";
import ProductListCard from "../components/ProductListCard";
import FilterControls from "../components/FilterControls";
import Pagination from "../components/Pagination";

const listProductQuery = (queryParams) => {
    const { search, category, company, sort, price, shipping, page } = queryParams;

    return {
        queryKey: [
            'products',
            search ?? '',
            category ?? 'all',
            company ?? 'all',
            sort ?? 'a-z',
            price ?? 100000,
            shipping ?? false,
            page ?? 1
        ],
        queryFn: () => fetchListItems(queryParams),
    };
};

export function loader(queryClient) {
    return async ({ request }) => {
        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);
        const response = await queryClient.ensureQueryData(
            listProductQuery(params)
        );

        return {
            data: response.data,
            meta: response.meta,
            params
        };
    };
};

export default function Products() {
    const { data, meta, params } = useLoaderData();

    const [layoutType, setLayoutType] = useState(localStorage.getItem('viewType') || 'grid');
    const [selectedRange, setSelectedRange] = useState(params.price || 100000);

    return (<>
        <h1 className='text-4xl'>Products</h1>
        <>
            <div>
                <FilterControls
                    companies={meta.companies}
                    categories={meta.categories}
                    selectedCompany={params.company || 'all'}
                    selectedCategory={params.category || 'all'}
                    selectedSort={params.order || 'a-z'}
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange} />
            </div>
            <div className="flex justify-between border-b border-base items-center py-4">
                <h4 className="font-medium text-md">{meta.pagination.total} products</h4>
                <div className="flex gap-x-2">
                    <button
                        className={`text-xl btn btn-circle btn-sm ${layoutType === 'grid' ? 'btn-primary text-primary-content' : ''}`}
                        onClick={() => {
                            setLayoutType('grid');
                            localStorage.setItem('viewType', 'grid');
                        }}>
                        <BsGrid />
                    </button>
                    <button
                        className={`text-xl btn btn-circle btn-sm ${layoutType === 'list' ? 'btn-primary text-primary-content' : ''}`}
                        onClick={() => {
                            setLayoutType('list');
                            localStorage.setItem('viewType', 'list');
                        }}>
                        <BsList />
                    </button>
                </div>
            </div>
            {layoutType === 'grid' ? (<div className="pt-12 grid grid-cols-3 gap-4">
                {data.map(product => (
                    <Link key={product.id} to={`/products/${product.id}`}>
                        <ProductCard productConfig={product.attributes} />
                    </Link>
                ))}
            </div>) : (<div className="pt-12 grid gap-4">
                {data.map(product => (
                    <Link key={product.id} to={`/products/${product.id}`}>
                        <ProductListCard productConfig={product.attributes} />
                    </Link>
                ))}
            </div>)}
            <div className="mt-16 flex justify-end">
                <Pagination currentPage={meta.pagination.page} pageCount={meta.pagination.pageCount} />
            </div>
        </>
    </>)
};