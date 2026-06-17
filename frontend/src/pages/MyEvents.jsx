import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyEvents() {


const [events, setEvents] = useState([]);

useEffect(() => {

    fetchMyEvents();

}, []);

const fetchMyEvents = async () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    try {

        const res = await API.get(
            `/my-events/${user.id}`
        );

        setEvents(res.data);

    } catch (error) {

        console.log(error);

    }

};

return (

    <div
        className="
        min-h-screen
        bg-slate-100
        "
    >

        <Navbar />

        <div className="p-8">

            {/* Hero Section */}

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

                <div
                    className="
                    grid
                    lg:grid-cols-2
                    gap-8
                    items-center
                    "
                >

                    <div>

                        <h1
                            className="
                            text-5xl
                            font-bold
                            mb-4
                            "
                        >
                            My Events 🌱
                        </h1>

                        <p
                            className="
                            text-xl
                            "
                        >
                            Track all the events
                            you've joined and
                            continue making an
                            impact in your
                            community.
                        </p>

                    </div>

                    <img
                        src="https://www.positivepromotions.com/images/art/COMTHEME_1001_105_400.jpg?v=1"
                        alt="My Events"
                        className="
                        w-full
                        h-72
                        object-cover
                        rounded-3xl
                        shadow-xl
                        "
                    />

                </div>

            </div>

            {/* Empty State */}

            {
                events.length === 0 && (

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        p-12
                        text-center
                        shadow-md
                        "
                    >

                        <h2
                            className="
                            text-3xl
                            font-bold
                            mb-4
                            "
                        >
                            No Events Joined Yet 🌱
                        </h2>

                        <p
                            className="
                            text-gray-600
                            "
                        >
                            Explore events and
                            start volunteering.
                        </p>

                    </div>

                )
            }

            {/* Event Cards */}

            <div
                className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
                "
            >

                {
                    events.map(
                        (event) => (

                            <div
                                key={event.id}
                                className="
                                bg-white
                                rounded-3xl
                                shadow-md
                                overflow-hidden
                                hover:shadow-xl
                                transition
                                "
                            >

                                <img
                                    src="PASTE_EVENT_IMAGE_URL_HERE"
                                    alt="Event"
                                    className="
                                    h-52
                                    w-full
                                    object-cover
                                    "
                                />

                                <div className="p-6">

                                    <span
                                        className="
                                        bg-green-100
                                        text-green-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                        "
                                    >
                                        Registered
                                    </span>

                                    <h2
                                        className="
                                        text-2xl
                                        font-bold
                                        mt-4
                                        mb-3
                                        "
                                    >
                                        {event.title}
                                    </h2>

                                    <p
                                        className="
                                        text-gray-600
                                        mb-4
                                        "
                                    >
                                        {event.description}
                                    </p>

                                    <p
                                        className="
                                        mb-2
                                        "
                                    >
                                        📍 {event.location}
                                    </p>

                                    <p>
                                        📅 {event.date}
                                    </p>

                                </div>

                            </div>

                        )
                    )
                }

            </div>

        </div>

        <Footer />

    </div>

);


}

export default MyEvents;
