import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct
} from './pages';
import { loader as featuredProductLoader } from './pages/Landing';
import { loader as listProductLoader } from './pages/Products';
import { loader as singleProductLoader } from './pages/SingleProduct';
import { action as loginAction } from './pages/Login';
import { loader as ordersLoader } from './pages/Orders';
import { action as checkoutAction } from './pages/Checkout';
import { action as registerAction } from './pages/Register';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: featuredProductLoader(queryClient),
        element: <Landing />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        action: checkoutAction(store, queryClient),
        element: <Checkout />,
      },
      {
        path: 'orders',
        loader: ordersLoader(store, queryClient),
        element: <Orders />,
      },
      {
        path: 'products',
        loader: listProductLoader(queryClient),
        element: <Products />,
      },
      {
        path: '/products/:id',
        loader: singleProductLoader(queryClient),
        element: <SingleProduct />,
      }
    ]
  },
  {
    path: '/login',
    action: loginAction(store),
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    action: registerAction(),
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
