function EventCard({ event, onJoin }) {


const getCategoryStyle = () => {

    switch (event.category) {

        case "Environment":
            return "bg-green-100 text-green-700";

        case "Healthcare":
            return "bg-red-100 text-red-700";

        case "Education":
            return "bg-blue-100 text-blue-700";

        case "Community Service":
            return "bg-purple-100 text-purple-700";

        case "Animal Welfare":
            return "bg-yellow-100 text-yellow-700";

        default:
            return "bg-gray-100 text-gray-700";

    }

};

const getCategoryIcon = () => {

    switch (event.category) {

        case "Environment":
            return "🌱";

        case "Healthcare":
            return "🩺";

        case "Education":
            return "📚";

        case "Community Service":
            return "🤝";

        case "Animal Welfare":
            return "🐶";

        default:
            return "📌";

    }

};

return (

    <div
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all
        duration-300
        "
    >

        <img
            src="https://images.unsplash.com/photo-1469571486292-b53601020f88"
            alt="Volunteer Event"
            className="
            w-full
            h-52
            object-cover
            "
        />

        <div className="p-6">

            <span
                className={`
                ${getCategoryStyle()}
                px-3
                py-1
                rounded-full
                text-sm
                font-medium
                `}
            >
                {getCategoryIcon()} {event.category}
            </span>

            <h2
                className="
                text-2xl
                font-bold
                mt-4
                "
            >
                {event.title}
            </h2>

            <p
                className="
                text-gray-600
                mt-3
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
                mt-5
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-4
                py-3
                rounded-xl
                w-full
                font-semibold
                transition
                "
            >
                Join Event
            </button>

        </div>

    </div>

);


}

export default EventCard;
