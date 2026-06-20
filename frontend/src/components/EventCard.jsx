function EventCard({ event, onJoin }) {

    const categoryImages = {

        Environment:
            "https://thumbs.dreamstime.com/b/earth-hands-environment-concept-grass-background-usa-38622929.jpg",

        Education:
            "https://img.magnific.com/free-vector/modern-hand-drawn-education-concept_23-2147906438.jpg?semt=ais_hybrid&w=740&q=80",

        Healthcare:
            "https://idronline.org/wp-content/uploads/2020/12/OGFB4B0.jpg.webp",

        "Community Service":
            "https://i.pinimg.com/736x/e2/c2/70/e2c27090b57d4217f22ba9b7a6e6aacd.jpg",

        "Animal Welfare":
            "https://cf-images.assettype.com/thequint%2F2023-10%2Fbbb28404-c8ad-4e24-95b5-e9362affd7fb%2Fworld_wildlife_day_concept_nature_reserve_conserve_wildlife_reserve_tiger_deer_global_warming_jpg_s_.jpg?auto=format%2Ccompress&fmt=webp&width=720&w=1200"

    };

    return (

        <div
            className="
            bg-white
            rounded-2xl
            shadow-md
            overflow-hidden
            hover:shadow-2xl
            hover:-translate-y-2
            transition-all
            duration-300
            "
        >

            <img
                src={
                    event.image_url
                        ? event.image_url
                        : categoryImages[
                            event.category
                        ] ||
                        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
                }
                alt={event.title}
                className="
                w-full
                h-52
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
                    font-semibold
                    "
                >
                    {event.category || "Community"}
                </span>

                <h2
                    className="
                    text-2xl
                    font-bold
                    mt-4
                    text-slate-800
                    "
                >
                    {event.title}
                </h2>

                <p
                    className="
                    text-gray-600
                    mt-3
                    line-clamp-3
                    "
                >
                    {event.description}
                </p>

                <div
                    className="
                    mt-4
                    space-y-2
                    text-gray-700
                    "
                >

                    <p>
                        📍 {event.location}
                    </p>

                    <p>
                        📅 {event.date}
                    </p>

                </div>

                <button
                    onClick={() =>
                        onJoin(event.id)
                    }
                    className="
                    mt-6
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-3
                    rounded-xl
                    w-full
                    font-semibold
                    transition-all
                    "
                >
                    Join Event
                </button>

            </div>

        </div>

    );

}

export default EventCard;