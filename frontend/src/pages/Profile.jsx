import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import Footer from "../components/Footer";

function Profile() {

    const [joinedEvents, setJoinedEvents] =
        useState(0);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchJoinedEvents();

    }, []);

    const fetchJoinedEvents = async () => {

        try {

            const res =
                await API.get(
                    `/my-events/${user.id}`
                );

            setJoinedEvents(
                res.data.length
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <>
            <Navbar />

            <div
                className="
                min-h-screen
                bg-slate-100
                p-8
                "
            >

                <div
                    className="
                    max-w-5xl
                    mx-auto
                    "
                >

                    <div
                        className="
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-700
                        rounded-3xl
                        p-8
                        text-white
                        shadow-xl
                        mb-8
                        "
                    >

                        <h1
                            className="
                            text-5xl
                            font-bold
                            "
                        >
                            Volunteer Profile 👤
                        </h1>

                        <p
                            className="
                            mt-3
                            text-lg
                            "
                        >
                            Manage your volunteer
                            information and track
                            your participation.
                        </p>

                        <div
                            className="
                            mt-4
                            bg-white/20
                            p-4
                            rounded-xl
                            "
                        >
                            <p>
                                Profile Status: Active ✅
                            </p>
                        </div>

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-8
                        mb-8
                        text-center
                        "
                    >

                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=200`}
                            alt="Profile"
                            className="
                            w-32
                            h-32
                            rounded-full
                            mx-auto
                            mb-4
                            shadow-lg
                            "
                        />

                        <h2
                            className="
                            text-3xl
                            font-bold
                            "
                        >
                            {user?.name}
                        </h2>

                        <p
                            className="
                            text-gray-500
                            "
                        >
                            {user?.email}
                        </p>

                        <span
                            className="
                            inline-block
                            mt-3
                            bg-blue-100
                            text-blue-700
                            px-4
                            py-2
                            rounded-full
                            "
                        >
                            {user?.role || "Volunteer"}
                        </span>

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-8
                        "
                    >

                        <h2
                            className="
                            text-2xl
                            font-bold
                            mb-6
                            "
                        >
                            Personal Information
                        </h2>

                        <div
                            className="
                            grid
                            md:grid-cols-2
                            gap-6
                            "
                        >

                            <div>
                                <h3 className="font-bold">
                                    Full Name
                                </h3>

                                <p>
                                    {user?.name}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Email
                                </h3>

                                <p>
                                    {user?.email}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Phone
                                </h3>

                                <p>
                                    {user?.phone}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Date of Birth
                                </h3>

                                <p>
                                    {user?.dob || "Not Provided"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Address
                                </h3>

                                <p>
                                    {user?.address || "Not Provided"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    City
                                </h3>

                                <p>
                                    {user?.city || "Not Provided"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    State
                                </h3>

                                <p>
                                    {user?.state || "Not Provided"}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold">
                                    Pincode
                                </h3>

                                <p>
                                    {user?.pincode || "Not Provided"}
                                </p>
                            </div>

                        </div>

                    </div>

                    <div
                        className="
                        mt-8
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-8
                        "
                    >

                        <h2
                            className="
                            text-2xl
                            font-bold
                            mb-6
                            "
                        >
                            Volunteer Activity 📊
                        </h2>

                        <div
                            className="
                            grid
                            md:grid-cols-3
                            gap-6
                            "
                        >

                            <div
                                className="
                                bg-blue-50
                                p-6
                                rounded-2xl
                                text-center
                                "
                            >
                                <h1
                                    className="
                                    text-5xl
                                    font-bold
                                    text-blue-600
                                    "
                                >
                                    {joinedEvents}
                                </h1>

                                <p>
                                    Events Joined
                                </p>

                            </div>

                            <div
                                className="
                                bg-green-50
                                p-6
                                rounded-2xl
                                text-center
                                "
                            >
                                <h1
                                    className="
                                    text-5xl
                                    font-bold
                                    text-green-600
                                    "
                                >
                                    {
                                        user?.city
                                            ? 100
                                            : 50
                                    }
                                    %
                                </h1>

                                <p>
                                    Profile Completion
                                </p>

                            </div>

                            <div
                                className="
                                bg-purple-50
                                p-6
                                rounded-2xl
                                text-center
                                "
                            >
                                <h1
                                    className="
                                    text-5xl
                                    font-bold
                                    text-purple-600
                                    "
                                >
                                    {
                                        user?.role === "admin"
                                            ? "Yes"
                                            : "No"
                                    }
                                </h1>

                                <p>
                                    Admin Access
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />

        </>
    );
}

export default Profile;