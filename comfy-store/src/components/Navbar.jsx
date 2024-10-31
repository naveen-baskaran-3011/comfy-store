import { Link, NavLink } from "react-router-dom";
import { PiShoppingCart, PiMoon as DarkIcon, PiSun as LightIcon } from "react-icons/pi";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [theme, setTheme] = useState('winter');
    const userObject = useSelector((state) => state.user);

    const themeHandler = useCallback(() => {
        const themeToSet = theme === 'winter' ? 'dracula' : 'winter';
        setTheme(themeToSet)
    }, [theme]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const ThemeIcon = theme === 'winter' ? DarkIcon : LightIcon;

    return (
        <div className="navbar align-element">
            <div className="navbar-start">
                <Link to="/" className="btn btn-primary text-xl">C</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/products">Products</NavLink></li>
                    <li><NavLink to="/cart">Cart</NavLink></li>
                    {userObject.user && <li><NavLink to="/orders">Orders</NavLink></li>}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-ghost" onClick={themeHandler}>
                    <ThemeIcon className='h-6 w-6' />
                </a>
                <Link to="/cart" className="btn btn-ghost relative">
                    {/* <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500">3</span> */}
                    <span className="custom-badge">3</span>
                    <PiShoppingCart className='h-6 w-6' />
                </Link>
            </div>
        </div>
    );
}