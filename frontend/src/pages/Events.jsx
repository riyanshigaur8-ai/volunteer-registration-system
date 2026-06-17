import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

function Events() {


const [events, setEvents] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] =
    useState("All");

useEffect(() => {

    fetchEvents();

}, []);

const fetchEvents = async () => {

    try {

        const res =
            await API.get("/events");

        setEvents(res.data);

    } catch (error) {

        console.log(error);

    }

};

const joinEvent = async (eventId) => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    try {

        const res =
            await API.post(
                "/join-event",
                {
                    volunteer_id:
                        user.id,
                    event_id:
                        eventId
                }
            );

        alert(
            res.data.message
        );

    } catch (error) {

        console.log(error);

        alert(
            "Failed to join event"
        );

    }

};

const filteredEvents =
    events.filter((event) => {

        const matchesSearch =
            event.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesCategory =
            category === "All"
                ? true
                : event.category ===
                  category;

        return (
            matchesSearch &&
            matchesCategory
        );

    });

return (

    <>
        <Navbar />

        <div
            className="
            min-h-screen
            bg-slate-100
            "
        >

            <div className="p-8">

                {/* Hero */}

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
                                Explore
                                Volunteer
                                Events 🌱
                            </h1>

                            <p
                                className="
                                text-xl
                                "
                            >
                                Discover
                                meaningful
                                opportunities
                                to contribute
                                and create
                                impact.
                            </p>

                        </div>

                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            alt="Volunteer"
                            className="
                            h-72
                            w-full
                            object-cover
                            rounded-3xl
                            shadow-xl
                            "
                        />

                    </div>

                </div>

                {/* Search */}

                <input
                    type="text"
                    placeholder="Search Events..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                    w-full
                    p-4
                    rounded-xl
                    border
                    border-gray-300
                    shadow-sm
                    mb-4
                    "
                />

                {/* Category Filter */}

                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                    className="
                    w-full
                    p-4
                    rounded-xl
                    border
                    border-gray-300
                    shadow-sm
                    mb-8
                    "
                >

                    <option value="All">
                        All Categories
                    </option>

                    <option value="Environment">
                        🌱 Environment
                    </option>

                    <option value="Healthcare">
                        🩺 Healthcare
                    </option>

                    <option value="Education">
                        📚 Education
                    </option>

                    <option value="Community Service">
                        🤝 Community Service
                    </option>

                    <option value="Animal Welfare">
                        🐶 Animal Welfare
                    </option>

                </select>

                {/* Event Cards */}

                {
                    filteredEvents.length === 0 ? (

                        <div
                            className="
                            bg-white
                            rounded-3xl
                            p-10
                            text-center
                            shadow-md
                            "
                        >

                            <h2
                                className="
                                text-2xl
                                font-bold
                                "
                            >
                                No Events Found
                            </h2>

                            <p
                                className="
                                text-gray-500
                                mt-2
                                "
                            >
                                Try changing
                                search or
                                category.
                            </p>

                        </div>

                    ) : (

                        <div
                            className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            lg:grid-cols-3
                            gap-6
                            "
                        >

                            {
                                filteredEvents.map(
                                    (event) => (

                                        <EventCard
                                            key={
                                                event.id
                                            }
                                            event={
                                                event
                                            }
                                            onJoin={
                                                joinEvent
                                            }
                                        />

                                    )
                                )
                            }

                        </div>

                    )
                }

            </div>

            <Footer />

        </div>

    </>
);


}

export default Events;
