import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (<>
    <header className='bg-neutral text-neutral-content'>
      <Header />
    </header>
    <nav className='bg-base-200'>
      <Navbar />
    </nav>
    {isPageLoading ? (
      <Loading />
    ) : (
      <section className='align-element py-20'>
        <Outlet />
      </section>
    )}
  </>);
};