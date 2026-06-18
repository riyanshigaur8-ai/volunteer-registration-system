import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminAccess() {

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    const handleVerify = () => {

        if (
            password === "Admin@123"
        ) {

            localStorage.setItem(
                "isAdmin",
                "true"
            );

            alert(
                "Admin Access Granted"
            );

            navigate("/admin");

        } else {

            alert(
                "Wrong Password"
            );

        }

    };

    return (

        <div
            className="
            min-h-screen
            flex
            justify-center
            items-center
            bg-slate-100
            "
        >

            <div
                className="
                bg-white
                p-8
                rounded-3xl
                shadow-lg
                w-full
                max-w-md
                "
            >

                <h1
                    className="
                    text-3xl
                    font-bold
                    mb-6
                    text-center
                    "
                >
                    🔐 Admin Access
                </h1>

                <input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="
                    w-full
                    border
                    p-3
                    rounded-xl
                    mb-4
                    "
                />

                <button
                    onClick={
                        handleVerify
                    }
                    className="
                    w-full
                    bg-blue-600
                    text-white
                    p-3
                    rounded-xl
                    "
                >
                    Verify
                </button>

            </div>

        </div>

    );
}

export default AdminAccess;