import { useLoaderData } from "react-router-dom";
import Pagination from "./Pagination";

export default function OrdersTable() {
    const ordersData = useLoaderData();
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Products</th>
                        <th>Cost</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {ordersData.data.map(order => (
                        <tr>
                            <th>{order.id}</th>
                            <td className="capitalize">{order.attributes.name}</td>
                            <td className="capitalize">{order.attributes.address}</td>
                            <td className="capitalize">{order.attributes.numItemsInCart}</td>
                            <td>{order.attributes.orderTotal}</td>
                            <td>{order.attributes.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4">
                <Pagination
                    currentPage={ordersData.meta.pagination.page}
                    pageCount={ordersData.meta.pagination.pageCount} />
            </div>
        </div>
    );
}