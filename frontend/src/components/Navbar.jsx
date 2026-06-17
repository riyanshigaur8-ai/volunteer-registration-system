import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

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

                {
                    user?.role === "admin" && (

                        <Link to="/admin">
                            Admin Panel
                        </Link>

                    )
                }

                <span>
                    👤 {user?.name}
                </span>
                <span>
                    Role: {user?.role}
                </span>

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