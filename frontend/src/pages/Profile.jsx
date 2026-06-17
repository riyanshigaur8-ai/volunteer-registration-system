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

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        shadow-md
                        p-8
                        "
                    >

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
                            mb-4
                            "
                        >
                            Volunteer Statistics 📊
                        </h2>

                        <div
                            className="
                            text-5xl
                            font-bold
                            text-blue-600
                            "
                        >
                            {joinedEvents}
                        </div>

                        <p
                            className="
                            text-gray-500
                            "
                        >
                            Events Joined
                        </p>

                    </div>

                </div>

            </div>

            <Footer />

        </>
    );
}

export default Profile;