import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getEvents } from "../services/dashboard";
import type { Event } from "../types/platform";

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Events loading error:", err);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return events;
    }

    return events.filter((event) => {
      return (
        event.title.toLowerCase().includes(query) ||
        event.organization_name.toLowerCase().includes(query) ||
        (event.city ?? "").toLowerCase().includes(query) ||
        (event.state ?? "").toLowerCase().includes(query)
      );
    });
  }, [events, search]);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section>
          <p className="text-sm font-medium text-slate-500">
            Volunteer opportunities
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Discover events
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Find opportunities that match your interests and get involved in
            meaningful work.
          </p>
        </section>

        <div className="mt-8">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by event, organization, city..."
            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none transition focus:border-slate-900 md:max-w-xl"
          />
        </div>

        {loading && (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && filteredEvents.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No events found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try another search or check back later for new opportunities.
            </p>
          </div>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {event.organization_name}
          </p>

          <h2 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-slate-700">
            {event.title}
          </h2>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Open
        </span>
      </div>

      {event.description && (
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">
          {event.description}
        </p>
      )}

      <div className="mt-6 space-y-2 text-sm text-slate-600">
        <p>📅 {formatDate(event.event_date)}</p>

        {event.start_time && (
          <p>
            🕘 {event.start_time}
            {event.end_time ? ` - ${event.end_time}` : ""}
          </p>
        )}

        <p>
          📍 {event.location_name || event.city || "Location not specified"}
        </p>
      </div>

      <div className="mt-auto pt-6 text-sm font-semibold text-slate-900">
        View details →
      </div>
    </Link>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}