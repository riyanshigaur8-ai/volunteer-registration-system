import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

function Dashboard() {


const user = JSON.parse(
    localStorage.getItem("user")
);

const [stats, setStats] = useState({
    totalEvents: 0,
    myEvents: 0,
    upcoming: 0
});

useEffect(() => {
    fetchDashboardStats();
}, []);

const fetchDashboardStats = async () => {

    try {

        const eventsRes =
            await API.get("/events");

        const myEventsRes =
            await API.get(
                `/my-events/${user.id}`
            );

        const totalEvents =
            eventsRes.data.length;

        const myEvents =
            myEventsRes.data.length;

        const today =
            new Date();

        const upcoming =
            eventsRes.data.filter(
                (event) =>
                    new Date(event.date) >
                    today
            ).length;

        setStats({
            totalEvents,
            myEvents,
            upcoming
        });

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
                            Welcome Back,
                            {user?.name} 👋
                        </h1>

                        <p
                            className="
                            text-xl
                            opacity-90
                            "
                        >
                            Ready to make an impact
                            in your community today?
                        </p>

                        <button
                            className="
                            mt-6
                            bg-white
                            text-blue-700
                            px-6
                            py-3
                            rounded-xl
                            font-semibold
                            shadow-lg
                            "
                        >
                            Explore Events
                        </button>

                    </div>

                    <img
                        src="https://img.freepik.com/free-vector/people-volunteering-donating-money_53876-43052.jpg?semt=ais_hybrid&w=740&q=80"
                        alt="Community Impact"
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

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
                "
            >

                <StatCard
                    title="Total Events"
                    value={stats.totalEvents}
                    icon="📅"
                />

                <StatCard
                    title="My Events"
                    value={stats.myEvents}
                    icon="🤝"
                />

                <StatCard
                    title="Upcoming"
                    value={stats.upcoming}
                    icon="🚀"
                />

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
                    Community Impact 🌱
                </h2>

                <p
                    className="
                    text-gray-600
                    leading-relaxed
                    "
                >
                    VolunteerHub connects
                    passionate volunteers
                    with meaningful community
                    initiatives. Explore events,
                    collaborate with NGOs,
                    contribute your skills,
                    and help create lasting
                    positive change.
                </p>

            </div>

        </div>

    </div>

);


}

export default Dashboard;
