import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContent";

function Navbar() {

    const navigate = useNavigate();

    const {
        darkMode,
        toggleDarkMode
    } = useTheme();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <nav
            className="
            bg-gradient-to-r
            from-blue-600
            to-indigo-700
            text-white
            px-8
            py-4
            flex
            justify-between
            items-center
            shadow-lg
            "
        >

            <h1
                className="
                text-3xl
                font-bold
                "
            >
                VolunteerHub
            </h1>

            <div
                className="
                flex
                items-center
                gap-6
                "
            >

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/events">
                    Events
                </Link>

                <Link to="/my-events">
                    My Events
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                <Link to="/admin-access">
                    Admin Access
                </Link>

                <span>
                    👤 {user?.name}
                </span>

                <span>
                    Role: {user?.role}
                </span>

                <button
                    onClick={toggleDarkMode}
                    className="
                    bg-slate-800
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    hover:bg-slate-700
                    "
                >
                    {
                        darkMode
                            ? "☀️ Light"
                            : "🌙 Dark"
                    }
                </button>

                <button
                    onClick={handleLogout}
                    className="
                    bg-white
                    text-blue-600
                    px-4
                    py-2
                    rounded-lg
                    font-semibold
                    hover:bg-gray-100
                    "
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;