import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className="flex text-sm py-2 gap-x-6 justify-end align-element">
            <Link to="/login">Sign in / Guest</Link>
            <Link to="/register">Create Account</Link>
        </div>
    );
}