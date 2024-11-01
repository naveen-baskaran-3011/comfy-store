import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../slice/userSlice";

export default function Header() {
    const useObj = useSelector(selector => selector.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="flex text-sm py-2 gap-x-6 justify-end align-element">
            {useObj.user ? (<>
                <p>Hi, {useObj.user.username}</p>
                <button className="btn btn-xs btn-outline btn-primary" onClick={() => {
                    dispatch(logout());
                    navigate('/');
                }}>Logout</button>
            </>) : (<>
                <Link to="/login">Sign in / Guest</Link>
                <Link to="/register">Create Account</Link>
            </>)}
        </div>
    );
}