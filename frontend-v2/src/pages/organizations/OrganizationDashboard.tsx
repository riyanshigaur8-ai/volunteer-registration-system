import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  getOrganization,
  getOrganizationApplications,
  getOrganizationEvents,
} from "../../services/dashboard";

interface Organization {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  city: string | null;
  state: string | null;
  verification_status: string;
}

interface OrganizationEvent {
  id: number;
  title: string;
  event_date: string;
  status: string;
  capacity: number;
  city: string | null;
  location_name: string | null;
}

interface OrganizationApplication {
  id: number;
  event_id: number;
  event_title: string;
  volunteer_id: number;
  volunteer_name: string;
  volunteer_email: string;
  status: string;
  applied_at: string;
  rejection_reason: string | null;
}

export default function OrganizationDashboard() {
  const { user } = useAuth();

  const memberships = user?.organizations ?? [];
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(
    memberships[0]?.id ?? null,
  );

  const [organization, setOrganization] =
    useState<Organization | null>(null);

  const [events, setEvents] = useState<OrganizationEvent[]>([]);
  const [applications, setApplications] = useState<
    OrganizationApplication[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedOrgId) {
      setLoading(false);
      return;
    }

    const loadOrganizationDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [org, eventData, applicationData] =
          await Promise.all([
            getOrganization(selectedOrgId),
            getOrganizationEvents(selectedOrgId),
            getOrganizationApplications(selectedOrgId),
          ]);

        setOrganization(org);
        setEvents(eventData);
        setApplications(applicationData);
      } catch (err: any) {
        console.error(
          "Organization dashboard error:",
          err,
        );

        setError(
          err?.response?.data?.error ||
            "Unable to load organization dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrganizationDashboard();
  }, [selectedOrgId]);

  const pendingApplications = useMemo(
    () =>
      applications.filter(
        (application) => application.status === "PENDING",
      ).length,
    [applications],
  );

  if (memberships.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h1 className="text-2xl font-bold text-slate-900">
              No organization access
            </h1>

            <p className="mt-2 text-slate-600">
              Your account is not currently an organization administrator.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-8 w-72 rounded bg-slate-200" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Organization Admin
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              {organization?.name}
            </h1>

            <p className="mt-2 text-slate-600">
              Manage events, volunteers and applications.
            </p>
          </div>

          {memberships.length > 1 && (
            <select
              value={selectedOrgId ?? ""}
              onChange={(event) =>
                setSelectedOrgId(Number(event.target.value))
              }
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm"
            >
              {memberships.map((membership) => (
                <option
                  key={membership.id}
                  value={membership.id}
                >
                  {membership.name}
                </option>
              ))}
            </select>
          )}
        </section>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <StatCard
            label="Events"
            value={events.length}
            subtitle="Total organization events"
          />

          <StatCard
            label="Applications"
            value={applications.length}
            subtitle="Volunteer applications"
          />

          <StatCard
            label="Pending Review"
            value={pendingApplications}
            subtitle="Need your attention"
          />
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Events
              </h2>

              <Link
                to={`/organization/${selectedOrgId}/events`}
                className="text-sm font-semibold text-slate-700"
              >
                Manage →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {event.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {formatDate(event.event_date)}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <p className="py-5 text-sm text-slate-500">
                  No events yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Applications
              </h2>

              <Link
                to={`/organization/${selectedOrgId}/applications`}
                className="text-sm font-semibold text-slate-700"
              >
                Review →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {applications.slice(0, 5).map((application) => (
                <div
                  key={application.id}
                  className="rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {application.volunteer_name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {application.event_title}
                      </p>
                    </div>

                    <StatusBadge
                      status={application.status}
                    />
                  </div>
                </div>
              ))}

              {applications.length === 0 && (
                <p className="py-5 text-sm text-slate-500">
                  No applications yet.
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
  value: number;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {subtitle}
      </p>
    </div>
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
  return new Date(`${value}T00:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}