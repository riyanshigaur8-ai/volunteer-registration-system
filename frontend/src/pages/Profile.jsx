import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import Footer from "../components/Footer";

function Profile() {

    const [joinedEvents, setJoinedEvents] =
        useState(0);

    const [editing, setEditing] =
    useState(false);

    // const [profileData, setProfileData] =
    // useState({
    //     phone: "",
    //     dob: "",
    //     address: "",
    //     city: "",
    //     state: "",
    //     pincode: ""
    // });

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {

        fetchJoinedEvents();

        setProfileData({
    phone: user?.phone || "",
    dob: user?.dob || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || ""
});

    }, []);

    const [profileData, setProfileData] =
    useState({
        phone: user?.phone || "",
        dob: user?.dob || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        pincode: user?.pincode || ""
    });

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

    const handleProfileChange = (e) => {

    setProfileData({

        ...profileData,

        [e.target.name]:
            e.target.value

    });

};

    const saveProfile = async () => {

    try {

        const res =
            await API.put(
                `/profile/${user.id}`,
                profileData
            );

        alert(
            res.data.message
        );

        const updatedUser = {

            ...user,

            ...profileData

        };

        localStorage.setItem(
            "user",
            JSON.stringify(
                updatedUser
            )
        );

        window.location.reload();

    } catch (error) {

        console.log(error);

        alert(
            "Failed to update profile"
        );

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
 
                        <button
                            onClick={() =>
                                setEditing(true)
                            }
                            className="
                            block
                            mx-auto
                            mt-4
                            bg-blue-600
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            hover:bg-blue-700
                            "
                        >
                            Edit Profile
                        </button>
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

            {
    editing && (

        <div
            className="
            fixed
            inset-0
            bg-black/50
            flex
            justify-center
            items-center
            z-50
            "
        >

            <div
                className="
                bg-white
                rounded-3xl
                p-8
                w-full
                max-w-2xl
                "
            >

                <h2
                    className="
                    text-3xl
                    font-bold
                    mb-6
                    "
                >
                    Edit Profile ✏️
                </h2>

                <div
                    className="
                    grid
                    md:grid-cols-2
                    gap-4
                    "
                >

                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        type="date"
                        name="dob"
                        value={profileData.dob}
                        onChange={handleProfileChange}
                        className="
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={profileData.city}
                        onChange={handleProfileChange}
                        className="
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={profileData.state}
                        onChange={handleProfileChange}
                        className="
                        border
                        p-3
                        rounded-xl
                        "
                    />

                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={profileData.pincode}
                        onChange={handleProfileChange}
                        className="
                        border
                        p-3
                        rounded-xl
                        "
                    />

                </div>

                <textarea
                    name="address"
                    placeholder="Address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    className="
                    border
                    p-3
                    rounded-xl
                    w-full
                    mt-4
                    "
                />

                <div
                    className="
                    flex
                    gap-4
                    mt-6
                    "
                >

                    <button
                        onClick={saveProfile}
                        className="
                        bg-green-600
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        "
                    >
                        Save Changes
                    </button>
                    
                    <button
                        onClick={() =>
                            setEditing(false)
                        }
                        className="
                        bg-gray-500
                        text-white
                        px-6
                        py-3
                        rounded-xl
                        "
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>

    )
}

            <Footer />

        </>
    );
}

export default Profile;