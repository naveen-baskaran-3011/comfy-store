import axios from 'axios';
export function fetchProduct (productId) {
    return fetch(`https://strapi-store-server.onrender.com/api/products/${productId}`)
    .then((response) => response.json())
    .then(({ data }) => {
      return data;
    })
}

export function fetchListItems(queryParams) {
  return axios.get('https://strapi-store-server.onrender.com/api/products', {
    params: queryParams
  })
  .then(({ data }) => {
    return { data: data.data, meta: data.meta };
  });
}