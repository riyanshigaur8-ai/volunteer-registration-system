import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMyCertificates } from "../services/dashboard";
import type { Certificate } from "../types/platform";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const data = await getMyCertificates();
        setCertificates(data);
      } catch (err: any) {
        console.error("Certificates loading error:", err);

        setError(
          err?.response?.data?.error ||
            "Unable to load your certificates.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCertificates();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="h-8 w-64 rounded bg-slate-200" />
          <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="h-56 rounded-2xl bg-slate-200"
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
            Your achievements
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            My Certificates
          </h1>

          <p className="mt-3 text-slate-600">
            View and verify the certificates you've earned through your
            volunteer work.
          </p>
        </section>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {!error && certificates.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              No certificates yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Complete volunteer events to earn verified certificates.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Discover Events
            </Link>
          </div>
        )}

        {!error && certificates.length > 0 && (
          <section className="mt-8 grid gap-5 md:grid-cols-2">
            {certificates.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function CertificateCard({
  certificate,
}: {
  certificate: Certificate;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-950 p-6 text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Volunteer Certificate
            </p>

            <h2 className="mt-2 text-xl font-bold">
              {certificate.event_title}
            </h2>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            {certificate.status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm font-medium text-slate-500">
          Organization
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {certificate.organization_name}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <Info
            label="Volunteer Hours"
            value={`${certificate.hours} hrs`}
          />

          <Info
            label="Issued"
            value={formatDate(certificate.issued_at)}
          />
        </div>

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Certificate Number
          </p>

          <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
            {certificate.certificate_number}
          </p>
        </div>

        <Link
          to={`/certificates/verify/${encodeURIComponent(
            certificate.certificate_number,
          )}`}
          className="mt-5 block w-full rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-slate-700"
        >
          Verify Certificate
        </Link>
      </div>
    </article>
  );
}

function Info({
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

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}