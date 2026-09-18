import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { verifyCertificate } from "../services/dashboard";

interface VerificationResult {
  valid: boolean;
  message?: string;
  certificate?: {
    certificate_number: string;
    volunteer_name: string;
    event_title: string;
    organization_name: string;
    hours: number;
    status: string;
    issued_at: string;
    verification_hash: string;
  };
}

export default function VerifyCertificate() {
  const { certificateNumber } = useParams();

  const [result, setResult] = useState<VerificationResult | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!certificateNumber) {
        setLoading(false);
        return;
      }

      try {
        const data = await verifyCertificate(certificateNumber);
        setResult(data);
      } catch (err: any) {
        setResult(
          err?.response?.data || {
            valid: false,
            message: "Certificate not found.",
          },
        );
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [certificateNumber]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <p className="text-slate-500">
          Verifying certificate...
        </p>
      </main>
    );
  }

  const certificate = result?.certificate;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            VolunteerHub Certificate Verification
          </p>

          {result?.valid && certificate ? (
            <>
              <div className="mt-6 rounded-2xl bg-emerald-50 p-5">
                <p className="text-lg font-bold text-emerald-700">
                  ✓ Certificate Verified
                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  This certificate was successfully verified.
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <Info
                  label="Certificate Number"
                  value={certificate.certificate_number}
                />

                <Info
                  label="Volunteer"
                  value={certificate.volunteer_name}
                />

                <Info
                  label="Event"
                  value={certificate.event_title}
                />

                <Info
                  label="Organization"
                  value={certificate.organization_name}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Info
                    label="Volunteer Hours"
                    value={`${certificate.hours} hrs`}
                  />

                  <Info
                    label="Issued"
                    value={formatDate(certificate.issued_at)}
                  />
                </div>

                <Info
                  label="Verification Hash"
                  value={certificate.verification_hash}
                  mono
                />
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl bg-red-50 p-5">
              <p className="text-lg font-bold text-red-700">
                Certificate could not be verified
              </p>

              <p className="mt-1 text-sm text-red-600">
                {result?.message || "Certificate not found."}
              </p>
            </div>
          )}

          <Link
            to="/"
            className="mt-8 inline-block text-sm font-semibold text-slate-700 hover:text-slate-950"
          >
            ← Back to VolunteerHub
          </Link>
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 break-all text-sm font-medium text-slate-800 ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}