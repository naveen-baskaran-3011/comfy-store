import { redirect, useLoaderData } from "react-router-dom";
import { fetchOrders } from "../api/orders"
import OrdersTable from "../components/OrdersTable";

const ordersQuery = (jwt, userObj, params) => {
    return {
        queryKey: ['orders', userObj.user.id, params.page],
        queryFn: () => fetchOrders(jwt, params.page)
    }
}

export const loader = (store, queryClient) => {
    return async ({ request }) => {
        const userObj = store.getState().user;
        const jwt = userObj?.jwt;

        const params = Object.fromEntries([
            ...new URL(request.url).searchParams.entries(),
        ]);

        if (!jwt) {
            return redirect('/');
        }

        return await queryClient.ensureQueryData(
            ordersQuery(jwt, userObj, params)
        );
    }
}

export default function Orders() {
    const ordersData = useLoaderData();

    return (<>
        <h1 className='text-4xl'>Your Orders</h1>
        <div className="border-b mt-5"></div>
        <div className="text-md my-4 capitalize">total orders : {ordersData.meta.pagination.total}</div>
        <OrdersTable />
    </>)
};