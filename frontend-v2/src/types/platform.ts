export interface Event {
  id: number;
  organization_id: number;
  organization_name: string;
  title: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  location_name: string | null;
  city: string | null;
  state: string | null;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  capacity: number;
  status: string;
}

export interface Application {
  id: number;
  event_id: number;
  event_title: string;
  organization_id: number;
  organization_name: string;
  status: string;
  applied_at: string;
  reviewed_at: string | null;
  rejection_reason: string | null;
}

export interface Certificate {
  id: number;
  certificate_number: string;
  event_id: number;
  event_title: string;
  organization_id: number;
  organization_name: string;
  hours: number;
  status: string;
  issued_at: string;
}