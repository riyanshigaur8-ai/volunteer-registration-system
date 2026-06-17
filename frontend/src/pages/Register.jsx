import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                "/register",
                formData
            );

            alert(res.data.message);

            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration Failed"
            );

        }
    };

    return (

        <div
            className="
            min-h-screen
            bg-gradient-to-br
            from-blue-600
            via-indigo-700
            to-purple-800
            flex
            items-center
            justify-center
            px-4
            "
        >

            <div
                className="
                bg-white
                rounded-3xl
                shadow-2xl
                p-10
                w-full
                max-w-md
                "
            >

                <div className="text-center mb-8">

                    <h1
                        className="
                        text-4xl
                        font-bold
                        text-blue-700
                        "
                    >
                        VolunteerHub
                    </h1>

                    <p
                        className="
                        text-gray-500
                        mt-2
                        "
                    >
                        Create your volunteer account
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        mb-4
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        mb-4
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                    />

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        mb-4
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="
                        w-full
                        p-3
                        border
                        rounded-xl
                        mb-6
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                        "
                    />

                    <button
                        type="submit"
                        className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3
                        rounded-xl
                        font-semibold
                        transition
                        "
                    >
                        Create Account
                    </button>

                </form>

                <p
                    className="
                    text-center
                    mt-6
                    text-gray-600
                    "
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="
                        text-blue-600
                        font-semibold
                        "
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>

    );
}

export default Register;