import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  getEvents,
  getMyApplications,
  getMyCertificates,
} from "../services/dashboard";

import type { Application, Certificate, Event } from "../types/platform";

export default function Dashboard() {
  const { user } = useAuth();

  const [events, setEvents] = useState<Event[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [eventsData, applicationsData, certificatesData] =
          await Promise.all([
            getEvents(),
            getMyApplications(),
            getMyCertificates(),
          ]);

        setEvents(eventsData);
        setApplications(applicationsData);
        setCertificates(certificatesData);
      } catch (err: any) {
  console.error("Dashboard loading error:", err);

  const message =
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Unable to load your dashboard.";

  setError(message);
} finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-72 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-32 rounded-2xl bg-slate-200"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-2xl bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </main>
    );
  }

  const pendingCount = applications.filter(
    (application) => application.status === "PENDING",
  ).length;

  const approvedCount = applications.filter(
    (application) => application.status === "APPROVED",
  ).length;

  const recommendedEvents = events.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section>
          <p className="text-sm font-medium text-slate-500">
            Volunteer Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
            Welcome back, {user?.name} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-slate-600">
            Discover meaningful opportunities, manage your applications, and
            keep track of your impact.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            label="Volunteer Hours"
            value={(user?.total_hours ?? 0).toFixed(2)}
            subtitle="Completed hours"
          />

          <StatCard
            label="Applications"
            value={applications.length.toString()}
            subtitle={`${pendingCount} pending · ${approvedCount} approved`}
          />

          <StatCard
            label="Certificates"
            value={certificates.length.toString()}
            subtitle="Certificates earned"
          />
        </section>

        <section className="mt-12">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Opportunities
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Discover upcoming events
              </h2>
            </div>

            <Link
              to="/events"
              className="text-sm font-semibold text-slate-700 hover:text-slate-950"
            >
              View all →
            </Link>
          </div>

          {recommendedEvents.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-medium text-slate-800">
                No published events yet.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                New opportunities will appear here when organizations publish
                them.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {recommendedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Recent applications
              </h2>

              <Link
                to="/applications"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {applications.slice(0, 4).map((application) => (
                <div
                  key={application.id}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {application.event_title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {application.organization_name}
                    </p>
                  </div>

                  <StatusBadge status={application.status} />
                </div>
              ))}

              {applications.length === 0 && (
                <p className="py-5 text-sm text-slate-500">
                  You haven't applied to any events yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Recent certificates
              </h2>

              <Link
                to="/certificates"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {certificates.slice(0, 4).map((certificate) => (
                <div
                  key={certificate.id}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {certificate.event_title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {certificate.organization_name}
                      </p>
                    </div>

                    <span className="text-sm font-semibold text-emerald-700">
                      {certificate.hours} hrs
                    </span>
                  </div>
                </div>
              ))}

              {certificates.length === 0 && (
                <p className="py-5 text-sm text-slate-500">
                  Your certificates will appear here after completing events.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>

      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <p className="text-sm font-medium text-slate-500">
        {event.organization_name}
      </p>

      <h3 className="mt-2 text-lg font-bold text-slate-900 group-hover:text-slate-700">
        {event.title}
      </h3>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>📅 {formatDate(event.event_date)}</p>
        <p>
          📍 {event.location_name || event.city || "Location not specified"}
        </p>
      </div>

      <div className="mt-5 text-sm font-semibold text-slate-900">
        View event →
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700",
    APPROVED: "bg-emerald-50 text-emerald-700",
    REJECTED: "bg-red-50 text-red-700",
    CANCELLED: "bg-slate-100 text-slate-600",
    ATTENDED: "bg-blue-50 text-blue-700",
    COMPLETED: "bg-violet-50 text-violet-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

function formatDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}