const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("admin_token");
}

async function request<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
    });

    if (res.status === 401) {
        localStorage.removeItem("admin_token");
        window.location.href = "/login";
        throw new Error("Unauthorized");
    }

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `Request failed: ${res.status}`);
    }

    if (res.status === 204) return undefined as T;
    return res.json();
}

// --- Types ---

export interface BookingListItem {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    preferred_date: string;
    preferred_time_slot: string;
    status: string;
    total_estimate: number | null;
    created_at: string;
}

export interface BookingItem {
    id: string;
    service_price_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
}

export interface BookingDetail extends BookingListItem {
    address: string;
    city: string;
    zip_code: string;
    notes: string | null;
    items: BookingItem[];
    updated_at: string;
}

export interface QuoteListItem {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    description: string;
    status: string;
    quoted_amount: number | null;
    created_at: string;
}

export interface QuoteDetail extends QuoteListItem {
    address: string;
    city: string;
    zip_code: string;
    admin_notes: string | null;
    quoted_at: string | null;
    updated_at: string;
}

export interface ServicePrice {
    id: string;
    label: string;
    price_type: string;
    price: number;
    price_max: number | null;
}

export interface CatalogService {
    id: string;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    prices: ServicePrice[];
}

export interface CatalogCategory {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    services: CatalogService[];
}

export interface PaymentItem {
    id: string;
    booking_id: string;
    stripe_payment_intent_id: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
}

// --- API Client ---

export const adminApi = {
    auth: {
        login: (email: string, password: string) =>
            request<{ access_token: string; token_type: string }>(
                "/api/v1/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({ email, password }),
                }
            ),
    },

    dashboard: {
        getStats: () => request<{
            bookings: {
                total_bookings: number;
                pending: number;
                confirmed: number;
                completed: number;
                total_revenue: number;
            };
            quotes: {
                total_quotes: number;
                pending: number;
                quoted: number;
                accepted: number;
            };
        }>("/api/v1/admin/dashboard"),
    },

    bookings: {
        list: (status?: string) =>
            request<BookingListItem[]>(
                `/api/v1/admin/bookings${status ? `?status=${status}` : ""}`
            ),
        get: (id: string) =>
            request<BookingDetail>(`/api/v1/admin/bookings/${encodeURIComponent(id)}`),
        updateStatus: (id: string, status: string) =>
            request<BookingDetail>(`/api/v1/admin/bookings/${encodeURIComponent(id)}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            }),
    },

    quotes: {
        list: (status?: string) =>
            request<QuoteListItem[]>(
                `/api/v1/admin/quotes${status ? `?status=${status}` : ""}`
            ),
        get: (id: string) =>
            request<QuoteDetail>(`/api/v1/admin/quotes/${encodeURIComponent(id)}`),
        respond: (
            id: string,
            body: { status?: string; admin_notes?: string; quoted_amount?: number }
        ) =>
            request<QuoteDetail>(`/api/v1/admin/quotes/${encodeURIComponent(id)}`, {
                method: "PATCH",
                body: JSON.stringify(body),
            }),
    },

    catalog: {
        listCategories: () =>
            request<CatalogCategory[]>("/api/v1/services"),
        createCategory: (data: { name: string; slug: string; description?: string }) =>
            request<CatalogCategory>("/api/v1/admin/catalog/categories", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        createService: (data: {
            category_id: string;
            name: string;
            slug: string;
            description: string;
        }) =>
            request<CatalogService>("/api/v1/admin/catalog/services", {
                method: "POST",
                body: JSON.stringify(data),
            }),
    },

    payments: {
        list: () => request<PaymentItem[]>("/api/v1/admin/payments"),
    },
};
