export function fetchOrders(jwt, page = 1) {
    return fetch(`https://strapi-store-server.onrender.com/api/orders?page=${page}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    }).then(res => res.json()).then(res => res)
}