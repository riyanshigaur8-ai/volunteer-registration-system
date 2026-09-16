import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { applyToEvent, getEvent } from "../services/dashboard";
import type { Event } from "../types/platform";

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        if (!eventId) {
          throw new Error("Event ID is missing.");
        }

        const data = await getEvent(Number(eventId));
        setEvent(data);
      } catch (err: any) {
        console.error("Event loading error:", err);

        setError(
          err?.response?.data?.error ||
            "Unable to load this event.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [eventId]);

  const handleApply = async () => {
    if (!event) {
      return;
    }

    setApplying(true);
    setError("");
    setSuccess("");

    try {
      await applyToEvent(event.id);

      setSuccess("Application submitted successfully.");

      setTimeout(() => {
        navigate("/applications");
      }, 1000);
    } catch (err: any) {
      console.error("Application error:", err);

      setError(
        err?.response?.data?.error ||
          "Unable to submit your application.",
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl animate-pulse">
          <div className="h-8 w-72 rounded bg-slate-200" />
          <div className="mt-4 h-5 w-96 rounded bg-slate-200" />
          <div className="mt-8 h-96 rounded-2xl bg-slate-200" />
        </div>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-red-50 p-6 text-red-700">
            {error}
          </div>

          <Link
            to="/events"
            className="mt-6 inline-block text-sm font-semibold text-slate-900"
          >
            ← Back to events
          </Link>
        </div>
      </main>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/events"
          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
        >
          ← Back to events
        </Link>

        <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-slate-950 px-8 py-12 text-white">
            <p className="text-sm font-medium text-slate-300">
              {event.organization_name}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                📅 {formatDate(event.event_date)}
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                📍{" "}
                {event.location_name ||
                  event.city ||
                  "Location not specified"}
              </span>
            </div>
          </div>

          <div className="grid gap-10 p-8 lg:grid-cols-[1fr_320px]">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                About this event
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
                {event.description || "No description available."}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <InfoCard
                  label="Date"
                  value={formatDate(event.event_date)}
                />

                <InfoCard
                  label="Time"
                  value={
                    event.start_time
                      ? `${event.start_time}${
                          event.end_time
                            ? ` - ${event.end_time}`
                            : ""
                        }`
                      : "Time not specified"
                  }
                />

                <InfoCard
                  label="Location"
                  value={
                    event.location_name ||
                    event.city ||
                    "Location not specified"
                  }
                />

                <InfoCard
                  label="Capacity"
                  value={
                    event.capacity > 0
                      ? `${event.capacity} volunteers`
                      : "Open capacity"
                  }
                />
              </div>
            </div>

            <aside className="rounded-2xl bg-slate-50 p-6">
              <p className="text-sm font-medium text-slate-500">
                Ready to help?
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Join this opportunity
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Submit your application and the organization can review your
                participation.
              </p>

              {error && (
                <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              <button
                onClick={handleApply}
                disabled={applying}
                className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {applying ? "Applying..." : "Apply Now"}
              </button>

              <p className="mt-3 text-center text-xs text-slate-500">
                You can track your application from your dashboard.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}