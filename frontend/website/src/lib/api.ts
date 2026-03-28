const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: "Request failed" }));
        throw new ApiError(res.status, error.detail || "Request failed");
    }

    if (res.status === 204) return undefined as T;
    return res.json();
}

// ── Public API ──────────────────────────────────────────

export const api = {
    services: {
        list: () => request<ServiceCategory[]>("/services"),
        getBySlug: (slug: string) => request<Service>(`/services/${encodeURIComponent(slug)}`),
    },
    bookings: {
        create: (data: CreateBookingRequest) =>
            request<Booking>("/bookings", {
                method: "POST",
                body: JSON.stringify(data),
            }),
    },
    quotes: {
        create: (data: CreateQuoteRequest) =>
            request<QuoteRequest>("/quotes", {
                method: "POST",
                body: JSON.stringify(data),
            }),
    },
    payments: {
        createIntent: (bookingId: string) =>
            request<PaymentIntentResponse>("/payments/create-intent", {
                method: "POST",
                body: JSON.stringify({ booking_id: bookingId }),
            }),
    },
};

// ── Types (mirrors backend schemas) ─────────────────────

export interface ServiceCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    is_active: boolean;
    sort_order: number;
    services: Service[];
}

export interface Service {
    id: string;
    category_id: string;
    name: string;
    slug: string;
    description: string;
    short_description: string | null;
    image_url: string | null;
    is_active: boolean;
    created_at: string;
    prices: ServicePrice[];
}

export interface ServicePrice {
    id: string;
    service_id: string;
    name: string;
    description: string | null;
    price_type: "FIXED" | "HOURLY" | "STARTING_AT" | "RANGE";
    price: number;
    price_max: number | null;
    unit: string | null;
    is_active: boolean;
}

export interface CreateBookingRequest {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    city: string;
    zip_code: string;
    preferred_date: string;
    preferred_time_slot: string;
    notes?: string;
    items: { service_id: string; service_price_id: string; quantity: number }[];
}

export interface Booking {
    id: string;
    customer_name: string;
    customer_email: string;
    status: string;
    total_estimate: number | null;
    created_at: string;
}

export interface CreateQuoteRequest {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    city: string;
    zip_code: string;
    description: string;
    items?: { service_id?: string; description: string }[];
}

export interface QuoteRequest {
    id: string;
    status: string;
    created_at: string;
}

export interface PaymentIntentResponse {
    client_secret: string;
    payment_intent_id: string;
    amount: number;
}
