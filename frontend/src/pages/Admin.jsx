import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Admin() {


const [activeSection, setActiveSection] =
    useState("analytics");

const [stats, setStats] = useState({
    volunteers: 0,
    events: 0,
    registrations: 0
});

const [volunteers, setVolunteers] =
    useState([]);

const [eventData, setEventData] =
    useState({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "Environment"
    });

useEffect(() => {
    fetchStats();
    fetchVolunteers();
}, []);

const fetchStats = async () => {

    try {

        const volunteerRes =
            await API.get(
                "/stats/volunteers"
            );

        const eventRes =
            await API.get(
                "/stats/events"
            );

        const registrationRes =
            await API.get(
                "/stats/registrations"
            );

        setStats({
            volunteers:
                volunteerRes.data.total,
            events:
                eventRes.data.total,
            registrations:
                registrationRes.data.total
        });

    } catch (error) {

        console.log(error);

    }

};

const fetchVolunteers = async () => {

    try {

        const res =
            await API.get(
                "/volunteers"
            );

        setVolunteers(
            res.data
        );

    } catch (error) {

        console.log(error);

    }

};

const handleChange = (e) => {

    setEventData({
        ...eventData,
        [e.target.name]:
            e.target.value
    });

};

const createEvent = async (e) => {

    e.preventDefault();

    try {

        const res =
            await API.post(
                "/events",
                eventData
            );

        alert(
            res.data.message
        );

       setEventData({
            title: "",
            description: "",
            date: "",
            location: "",
            category: "Environment"
        });

        fetchStats();

    } catch (error) {

        alert(
            "Failed to create event"
        );

    }

};

return (

    <>
        <Navbar />

        <div className="bg-slate-100 min-h-screen p-8">

            <div
                className="
                bg-gradient-to-r
                from-emerald-500
                to-green-700
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
                            "
                        >
                            Admin Dashboard 🚀
                        </h1>

                        <p
                            className="
                            text-xl
                            mt-4
                            "
                        >
                            Manage volunteers,
                            events and
                            registrations
                            from one place.
                        </p>

                    </div>

                    <img
                        src="https://t3.ftcdn.net/jpg/02/22/49/56/360_F_222495666_BEx60yVeD5JrzMOCIjBvQL1cpwVVfqsg.jpg"
                        alt="Admin"
                        className="
                        rounded-3xl
                        shadow-xl
                        h-72
                        w-full
                        object-cover
                        "
                    />

                </div>

            </div>

            <div
                className="
                flex
                flex-wrap
                gap-4
                mb-8
                "
            >

                <button
                    onClick={() =>
                        setActiveSection(
                            "analytics"
                        )
                    }
                    className="
                    bg-blue-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    "
                >
                    Analytics
                </button>

                <button
                    onClick={() =>
                        setActiveSection(
                            "volunteers"
                        )
                    }
                    className="
                    bg-emerald-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    "
                >
                    Volunteers
                </button>

                <button
                    onClick={() =>
                        setActiveSection(
                            "create"
                        )
                    }
                    className="
                    bg-purple-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    "
                >
                    Create Event
                </button>

            </div>

            {activeSection ===
                "analytics" && (

                <div
                    className="
                    grid
                    md:grid-cols-3
                    gap-6
                    "
                >

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        p-6
                        shadow-md
                        "
                    >
                        <h3>
                            👥 Volunteers
                        </h3>

                        <h1
                            className="
                            text-5xl
                            font-bold
                            text-emerald-600
                            "
                        >
                            {
                                stats.volunteers
                            }
                        </h1>

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        p-6
                        shadow-md
                        "
                    >
                        <h3>
                            📅 Events
                        </h3>

                        <h1
                            className="
                            text-5xl
                            font-bold
                            text-blue-600
                            "
                        >
                            {
                                stats.events
                            }
                        </h1>

                    </div>

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        p-6
                        shadow-md
                        "
                    >
                        <h3>
                            🤝 Registrations
                        </h3>

                        <h1
                            className="
                            text-5xl
                            font-bold
                            text-purple-600
                            "
                        >
                            {
                                stats.registrations
                            }
                        </h1>

                    </div>

                </div>

            )}

            {activeSection ===
                "volunteers" && (

                <div
                    className="
                    bg-white
                    rounded-3xl
                    shadow-md
                    p-6
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-bold
                        mb-6
                        "
                    >
                        Volunteers
                    </h2>

                    <table
                        className="
                        w-full
                        "
                    >

                        <thead>

                            <tr
                                className="
                                bg-slate-100
                                "
                            >

                                <th className="p-4 text-left">
                                    Name
                                </th>

                                <th className="p-4 text-left">
                                    Email
                                </th>

                                <th className="p-4 text-left">
                                    Phone
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                volunteers.map(
                                    (
                                        volunteer
                                    ) => (

                                        <tr
                                            key={
                                                volunteer.id
                                            }
                                            className="
                                            border-b
                                            "
                                        >

                                            <td className="p-4">
                                                {
                                                    volunteer.name
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    volunteer.email
                                                }
                                            </td>

                                            <td className="p-4">
                                                {
                                                    volunteer.phone
                                                }
                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                </div>

            )}

            {activeSection ===
                "create" && (

                <div
                    className="
                    bg-white
                    rounded-3xl
                    p-8
                    shadow-md
                    "
                >

                    <h2
                        className="
                        text-2xl
                        font-bold
                        mb-6
                        "
                    >
                        Create Event
                    </h2>

                    <form
                        onSubmit={
                            createEvent
                        }
                    >

                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={
                                eventData.title
                            }
                            onChange={
                                handleChange
                            }
                            className="
                            w-full
                            border
                            p-3
                            rounded-xl
                            mb-4
                            "
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={
                                eventData.description
                            }
                            onChange={
                                handleChange
                            }
                            className="
                            w-full
                            border
                            p-3
                            rounded-xl
                            mb-4
                            "
                        />

                        <input
                            type="date"
                            name="date"
                            value={
                                eventData.date
                            }
                            onChange={
                                handleChange
                            }
                            className="
                            w-full
                            border
                            p-3
                            rounded-xl
                            mb-4
                            "
                        />

                        <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={
                                        eventData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="
                                    w-full
                                    border
                                    p-3
                                    rounded-xl
                                    mb-4
                                    "
                                />

                                <select
                                    name="category"
                                    value={eventData.category}
                                    onChange={handleChange}
                                    className="
                                    w-full
                                    border
                                    p-3
                                    rounded-xl
                                    mb-4
                                    "
                                >

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

                        <button
                            type="submit"
                            className="
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            "
                        >
                            Create Event
                        </button>

                    </form>

                </div>

            )}

        </div>

    </>
);


}

export default Admin;
                                       

                                            