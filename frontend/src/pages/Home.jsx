import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {


return (

    <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-blue-600
        via-indigo-700
        to-purple-800
        text-white
        "
    >

        <nav
            className="
            flex
            justify-between
            items-center
            px-8
            py-6
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
                gap-4
                "
            >

                <Link
                    to="/login"
                    className="
                    bg-white
                    text-blue-700
                    px-5
                    py-2
                    rounded-lg
                    font-semibold
                    "
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className="
                    border
                    border-white
                    px-5
                    py-2
                    rounded-lg
                    "
                >
                    Register
                </Link>

            </div>

        </nav>

        <div
            className="
            max-w-7xl
            mx-auto
            px-8
            py-20
            "
        >

            <div
                className="
                grid
                lg:grid-cols-2
                gap-12
                items-center
                "
            >

                <div>

                    <h1
                        className="
                        text-6xl
                        font-bold
                        leading-tight
                        "
                    >
                        Connecting
                        Volunteers
                        With
                        Meaningful
                        Community Impact
                    </h1>

                    <p
                        className="
                        text-xl
                        mt-6
                        opacity-90
                        "
                    >
                        Join events, contribute
                        to social causes, and
                        make a difference in
                        your community through
                        VolunteerHub.
                    </p>

                    <div
                        className="
                        mt-8
                        flex
                        gap-4
                        "
                    >

                        <Link
                            to="/register"
                            className="
                            bg-white
                            text-blue-700
                            px-8
                            py-4
                            rounded-xl
                            font-bold
                            shadow-lg
                            "
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/login"
                            className="
                            border
                            border-white
                            px-8
                            py-4
                            rounded-xl
                            font-bold
                            "
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="relative">

                    <img
                        src="https://media.istockphoto.com/id/1625310710/photo/happy-group-of-volunteer-people-stacking-hands-celebrating-together-outdoor-teamwork-and.jpg?s=612x612&w=0&k=20&c=KrkTdMYjObaAhhwzsTnHf8dIDpdmc5pvAujfCl6riXU="
                        alt="Volunteer Community"
                        className="
                        w-full
                        h-[500px]
                        object-cover
                        rounded-3xl
                        shadow-2xl
                        "
                    />

                    <div
                        className="
                        absolute
                        -bottom-6
                        left-6
                        bg-white
                        text-gray-900
                        p-5
                        rounded-2xl
                        shadow-xl
                        "
                    >
                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-blue-600
                            "
                        >
                            100+
                        </h2>

                        <p>
                            Active Volunteers
                        </p>
                    </div>

                    <div
                        className="
                        absolute
                        -top-6
                        right-6
                        bg-white
                        text-gray-900
                        p-5
                        rounded-2xl
                        shadow-xl
                        "
                    >
                        <h2
                            className="
                            text-3xl
                            font-bold
                            text-green-600
                            "
                        >
                            25+
                        </h2>

                        <p>
                            Community Events
                        </p>
                    </div>

                </div>

            </div>

        </div>

        <section
            className="
            max-w-7xl
            mx-auto
            px-8
            py-20
            "
        >

            <h2
                className="
                text-4xl
                font-bold
                text-center
                mb-12
                "
            >
                Why VolunteerHub?
            </h2>

            <div
                className="
                grid
                md:grid-cols-3
                gap-8
                "
            >

                <div
                    className="
                    bg-white/10
                    backdrop-blur-md
                    rounded-2xl
                    p-8
                    "
                >
                    <h3 className="text-2xl font-bold mb-4">
                        🌱 Make Impact
                    </h3>

                    <p>
                        Participate in meaningful
                        events that improve communities.
                    </p>
                </div>

                <div
                    className="
                    bg-white/10
                    backdrop-blur-md
                    rounded-2xl
                    p-8
                    "
                >
                    <h3 className="text-2xl font-bold mb-4">
                        🤝 Build Connections
                    </h3>

                    <p>
                        Meet passionate volunteers
                        and organizations.
                    </p>
                </div>

                <div
                    className="
                    bg-white/10
                    backdrop-blur-md
                    rounded-2xl
                    p-8
                    "
                >
                    <h3 className="text-2xl font-bold mb-4">
                        🚀 Grow Skills
                    </h3>

                    <p>
                        Gain real-world experience
                        while helping others.
                    </p>
                </div>

            </div>

        </section>

        <Footer />

    </div>

);


}

export default Home;
