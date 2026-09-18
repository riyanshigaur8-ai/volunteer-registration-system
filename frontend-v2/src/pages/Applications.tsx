import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    cancelApplication,
    getMyApplications,
} from "../services/dashboard";

import type {Application } from "../types/platform";

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancellingId, setCancellingId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setError("");

      const data = await getMyApplications();
      setApplications(data);
    } catch (err: any) {
      console.error("Applications loading error:", err);

      setError(
        err?.response?.data?.error ||
          "Unable to load your applications.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (applicationId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this application?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingId(applicationId);
      setError("");

      await cancelApplication(applicationId);

      await loadApplications();
    } catch (err: any) {
      console.error("Application cancellation error:", err);

      setError(
        err?.response?.data?.error ||
          "Unable to cancel the application.",
      );
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section>
          <p className="text-sm font-medium text-slate-500">
            Your activity
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            My Applications
          </h1>

          <p className="mt-3 text-slate-600">
            Track the volunteer opportunities you've applied for.
          </p>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No applications yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Discover an opportunity and submit your first application.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Discover Events
            </Link>
          </div>
        ) : (
          <section className="mt-8 space-y-4">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                cancelling={
                  cancellingId === application.id
                }
                onCancel={handleCancel}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function ApplicationCard({
  application,
  cancelling,
  onCancel,
}: {
  application: Application;
  cancelling: boolean;
  onCancel: (applicationId: number) => void;
}) {
  const canCancel =
    application.status === "PENDING" ||
    application.status === "APPROVED";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {application.organization_name}
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {application.event_title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Applied on {formatDate(application.applied_at)}
          </p>
        </div>

        <StatusBadge status={application.status} />
      </div>

      {application.rejection_reason && (
        <div className="mt-5 rounded-xl bg-red-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-500">
            Rejection reason
          </p>

          <p className="mt-1 text-sm text-red-700">
            {application.rejection_reason}
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={`/events/${application.event_id}`}
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          View Event
        </Link>

        {canCancel && (
          <button
            onClick={() => onCancel(application.id)}
            disabled={cancelling}
            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            {cancelling
              ? "Cancelling..."
              : "Cancel Application"}
          </button>
        )}
      </div>
    </article>
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
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
