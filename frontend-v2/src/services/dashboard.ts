import api from "./api";
import type { Application, Certificate, Event } from "../types/platform";
import type { User } from "../types/auth";

export async function getCurrentUser() {
  const response = await api.get<{ user: User }>("/auth/me");
  return response.data.user;
}

export async function getEvents() {
  const response = await api.get<{ events: Event[] }>("/events");
  return response.data.events;
}

export async function getMyApplications() {
  const response = await api.get<{ applications: Application[] }>(
    "/my-applications",
  );
  return response.data.applications;
}

export async function getMyCertificates() {
  const response = await api.get<{ certificates: Certificate[] }>(
    "/my-certificates",
  );
  return response.data.certificates;
}