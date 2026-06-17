function StatCard({
    title,
    value,
    icon
}) {

    return (

        <div
            className="
            bg-white
            rounded-2xl
            p-6
            shadow-md
            hover:shadow-xl
            transition
            "
        >

            <div
                className="
                text-4xl
                mb-3
                "
            >
                {icon}
            </div>

            <h3
                className="
                text-gray-500
                "
            >
                {title}
            </h3>

            <h2
                className="
                text-4xl
                font-bold
                text-blue-600
                "
            >
                {value}
            </h2>

        </div>

    );
}

export default StatCard;