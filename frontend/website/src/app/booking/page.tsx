"use client";

import { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MapPin, Wrench, Clock, Phone, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { ServiceCategory } from "@/lib/api";

// ── Per-category additional questions (multi-select) ─────────────────────────
const CATEGORY_QUESTIONS: Record<
    string,
    Array<{ id: string; question: string; options: string[] }>
> = {
    hvac: [
        {
            id: "hvac_system_type",
            question: "What type of HVAC system do you have?",
            options: ["Central Air / Furnace", "Heat Pump", "Mini-Split / Ductless", "Window Unit", "Boiler / Radiant", "Not sure"],
        },
        {
            id: "hvac_symptoms",
            question: "What issues are you experiencing? (select all that apply)",
            options: ["Not cooling", "Not heating", "Strange noises", "Water / refrigerant leak", "Ice forming on unit", "Won't turn on", "High energy bills", "Weak airflow"],
        },
    ],
    electrical: [
        {
            id: "elec_work_type",
            question: "What type of electrical work is needed? (select all that apply)",
            options: ["New outlets / switches", "Panel upgrade / replacement", "Lighting installation", "Wiring repair", "EV charger installation", "Circuit breaker issue", "Ceiling fan", "Other"],
        },
        {
            id: "elec_panel_age",
            question: "Approximate age of your electrical panel?",
            options: ["Less than 10 years", "10–25 years", "25+ years", "Not sure"],
        },
    ],
    plumbing: [
        {
            id: "plumb_issue",
            question: "What is the plumbing issue? (select all that apply)",
            options: ["Clogged drain / sewer", "Leaking pipe", "Water heater", "Toilet repair", "Faucet / fixture replacement", "Low water pressure", "Running toilet", "Garbage disposal", "Other"],
        },
        {
            id: "plumb_urgency",
            question: "How urgent is the issue?",
            options: ["Emergency — risk of water damage", "Urgent — needs fix this week", "Routine — schedule is flexible"],
        },
    ],
    bathroom: [
        {
            id: "bath_scope",
            question: "What is the scope of your bathroom project? (select all that apply)",
            options: ["Full remodel", "Partial remodel", "Tile installation / replacement", "Vanity / sink replacement", "Shower / tub replacement", "Toilet replacement", "Other"],
        },
        {
            id: "bath_size",
            question: "What is the bathroom size?",
            options: ["Small (under 50 sq ft)", "Medium (50–100 sq ft)", "Large (100+ sq ft)"],
        },
    ],
    "general-maintenance": [
        {
            id: "maint_tasks",
            question: "What tasks do you need done? (select all that apply)",
            options: ["Drywall repair / patching", "Interior painting", "Door / window repair", "Flooring", "Deck / fence repair", "Gutter cleaning", "Pressure washing", "Other"],
        },
    ],
};

const TIME_SLOTS = [
    { label: "08:00 AM", value: "morning" },
    { label: "09:00 AM", value: "morning" },
    { label: "10:00 AM", value: "morning" },
    { label: "11:00 AM", value: "morning" },
    { label: "01:00 PM", value: "afternoon" },
    { label: "02:00 PM", value: "afternoon" },
    { label: "03:00 PM", value: "afternoon" },
    { label: "04:00 PM", value: "afternoon" },
    { label: "05:00 PM", value: "evening" },
    { label: "06:00 PM", value: "evening" },
];

interface SelectedItem {
    serviceId: string;
    servicePriceId: string;
    quantity: number;
    serviceName: string;
    priceName: string;
    unitPrice: number;
    priceDisplay: string;
}

export default function BookingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // API data
    const [categories, setCategories] = useState<ServiceCategory[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);

    // Step 1 — location
    const [zipCode, setZipCode] = useState("");

    // Step 2 — service selection (multi-select price options from API)
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

    // Step 2 — additional questions (multi-select chips)
    // questionId → Set of selected option strings
    const [answers, setAnswers] = useState<Record<string, Set<string>>>({});

    // Step 3 — schedule
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

    // Step 4 — contact & address
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");

    // Step 5 — details & submit
    const [details, setDetails] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        api.services
            .list()
            .then(setCategories)
            .catch(() => setLoadError("Failed to load services."))
            .finally(() => setLoadingServices(false));
    }, []);

    // Relevant questions for currently selected service categories
    const relevantQuestions = useMemo(() => {
        const seen = new Set<string>();
        const result: {
            catSlug: string;
            catName: string;
            qs: (typeof CATEGORY_QUESTIONS)[string];
        }[] = [];
        for (const item of selectedItems) {
            const cat = categories.find((c) => c.services.some((s) => s.id === item.serviceId));
            if (!cat || seen.has(cat.slug)) continue;
            seen.add(cat.slug);
            const qs = CATEGORY_QUESTIONS[cat.slug];
            if (qs) result.push({ catSlug: cat.slug, catName: cat.name, qs });
        }
        return result;
    }, [selectedItems, categories]);

    const totalEstimate = selectedItems.reduce((s, i) => s + i.unitPrice, 0);

    const steps = [
        { number: 1, label: "Location", icon: MapPin },
        { number: 2, label: "Service", icon: Wrench },
        { number: 3, label: "Schedule", icon: Clock },
        { number: 4, label: "Contact", icon: Phone },
        { number: 5, label: "Summary", icon: FileText },
    ];

    function toggleItem(
        serviceId: string,
        price: ServiceCategory["services"][0]["prices"][0],
        serviceName: string
    ) {
        setSelectedItems((prev) => {
            if (prev.find((i) => i.servicePriceId === price.id))
                return prev.filter((i) => i.servicePriceId !== price.id);
            let display = `$${Number(price.price).toFixed(0)}`;
            if (price.price_type === "RANGE" && price.price_max)
                display = `$${Number(price.price).toFixed(0)}–$${Number(price.price_max).toFixed(0)}`;
            else if (price.price_type === "STARTING_AT") display = `From $${Number(price.price).toFixed(0)}`;
            else if (price.price_type === "HOURLY") display = `$${Number(price.price).toFixed(0)}/hr`;
            return [...prev, { serviceId, servicePriceId: price.id, quantity: 1, serviceName, priceName: price.name, unitPrice: Number(price.price), priceDisplay: display }];
        });
        setErrors((e) => ({ ...e, services: "" }));
    }

    function toggleAnswer(questionId: string, option: string) {
        setAnswers((prev) => {
            const cur = new Set(prev[questionId] ?? []);
            if (cur.has(option)) cur.delete(option);
            else cur.add(option);
            return { ...prev, [questionId]: new Set(cur) };
        });
    }

    function buildNotesSummary(): string {
        const parts: string[] = [];
        for (const { catName, qs } of relevantQuestions) {
            for (const q of qs) {
                const chosen = [...(answers[q.id] ?? [])];
                if (chosen.length > 0)
                    parts.push(`[${catName}] ${q.question}\n  → ${chosen.join(", ")}`);
            }
        }
        if (details.trim()) parts.push(`Additional notes: ${details.trim()}`);
        return parts.join("\n\n");
    }

    const validateStep = (currentStep: number) => {
        const newErrors: Record<string, string> = {};
        switch (currentStep) {
            case 1:
                if (!zipCode) newErrors.zipCode = "Zip code is required";
                else if (!/^\d{5}$/.test(zipCode)) newErrors.zipCode = "Please enter a valid 5-digit zip code";
                break;
            case 2:
                if (selectedItems.length === 0) newErrors.services = "Please select at least one service";
                break;
            case 3:
                if (!selectedDate) newErrors.selectedDate = "Please select a date";
                if (!selectedTimeSlot) newErrors.selectedTime = "Please select a time slot";
                break;
            case 4:
                if (!firstName) newErrors.firstName = "First name is required";
                if (!lastName) newErrors.lastName = "Last name is required";
                if (!email) newErrors.email = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email";
                if (!phone) newErrors.phone = "Phone number is required";
                if (!address) newErrors.address = "Address is required";
                if (!city) newErrors.city = "City is required";
                break;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
        setSubmitError(null);
    };

    const handleSubmit = async () => {
        if (!selectedDate) return;
        setSubmitting(true);
        setSubmitError(null);
        try {
            await api.bookings.create({
                customer_name: `${firstName} ${lastName}`.trim(),
                customer_email: email,
                customer_phone: phone,
                address,
                city,
                zip_code: zipCode,
                preferred_date: selectedDate.toISOString(),
                preferred_time_slot: selectedTimeSlot,
                notes: buildNotesSummary() || undefined,
                items: selectedItems.map((i) => ({
                    service_id: i.serviceId,
                    service_price_id: i.servicePriceId,
                    quantity: i.quantity,
                })),
            });
            router.push("/");
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : "Booking failed. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <div className="bg-forest py-6 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-serif font-bold text-charcoal">Book Your Service</h1>
                    <p className="mt-1 text-charcoal/70">Quick and easy booking in 5 steps</p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Step Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        {steps.map((s, idx) => (
                            <div key={s.number} className="flex flex-col items-center flex-1">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full font-semibold transition-all ${step >= s.number ? "bg-forest text-charcoal" : "bg-gray-200 text-gray-500"}`}>
                                    {step > s.number ? "✓" : s.number}
                                </div>
                                <span className="mt-2 text-xs font-medium text-gray-600 text-center">{s.label}</span>
                                {idx < steps.length - 1 && (
                                    <div className={`h-1 w-full mt-6 -mb-14 transition-all ${step > s.number ? "bg-forest" : "bg-gray-200"}`} style={{ marginLeft: "50%", width: "50%" }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl shadow-sm p-8 min-h-96">
                    {/* ── Step 1: Location ── */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <div className="text-5xl mb-4">📍🚚</div>
                                <h2 className="text-2xl font-serif font-bold text-charcoal">Are you in our comfort zone?</h2>
                                <p className="mt-2 text-charcoal-light">We are happy to serve many areas. Let us double check that you are in our service area!</p>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Zip Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={5}
                                    value={zipCode}
                                    onChange={(e) => { setZipCode(e.target.value); setErrors((p) => ({ ...p, zipCode: "" })); }}
                                    placeholder="Enter your zip code"
                                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition ${errors.zipCode ? "border-red-500" : "border-gray-200 focus:border-forest"}`}
                                />
                                {errors.zipCode && <p className="mt-2 text-sm text-red-500">{errors.zipCode}</p>}
                            </div>
                        </div>
                    )}

                    {/* ── Step 2: Service Selection + Additional Questions ── */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-charcoal">What do you need help with?</h2>
                            <p className="text-sm text-gray-500">Select one or more pricing options below.</p>

                            {loadingServices && <p className="text-gray-400">Loading services…</p>}
                            {loadError && <p className="text-red-500">{loadError}</p>}

                            {!loadingServices && !loadError && categories
                                .filter((c) => c.is_active && c.services.some((s) => s.is_active))
                                .map((cat) => (
                                    <div key={cat.id} className="mb-6">
                                        <h3 className="text-base font-serif font-bold text-charcoal border-b border-forest/20 pb-2 mb-3">{cat.name}</h3>
                                        {cat.services.filter((s) => s.is_active).map((svc) => (
                                            <div key={svc.id} className="mb-4 rounded-lg border border-gray-100 p-3">
                                                <p className="font-semibold text-gray-900 text-sm">{svc.name}</p>
                                                {svc.short_description && <p className="text-xs text-gray-500 mt-0.5">{svc.short_description}</p>}
                                                <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                                    {svc.prices.filter((p) => p.is_active).map((price) => {
                                                        const isSel = selectedItems.some((i) => i.servicePriceId === price.id);
                                                        let priceText = `$${Number(price.price).toFixed(0)}`;
                                                        if (price.price_type === "RANGE" && price.price_max) priceText = `$${Number(price.price).toFixed(0)}–$${Number(price.price_max).toFixed(0)}`;
                                                        else if (price.price_type === "STARTING_AT") priceText = `From $${Number(price.price).toFixed(0)}`;
                                                        else if (price.price_type === "HOURLY") priceText = `$${Number(price.price).toFixed(0)}/hr`;
                                                        return (
                                                            <button key={price.id} type="button" onClick={() => toggleItem(svc.id, price, svc.name)}
                                                                className={`flex items-center justify-between rounded-lg border-2 px-3 py-2 text-left text-sm transition ${isSel ? "border-forest bg-forest/10 text-charcoal" : "border-gray-200 hover:border-forest hover:bg-forest/5 text-gray-700"}`}>
                                                                <span>
                                                                    <span className="font-medium">{price.name}</span>
                                                                    {price.description && <span className="block text-xs text-gray-400">{price.description}</span>}
                                                                </span>
                                                                <span className="ml-3 shrink-0 font-semibold">{priceText}{isSel && <span className="ml-1.5 text-green-700">✓</span>}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}

                            {errors.services && <p className="text-sm text-red-500">{errors.services}</p>}

                            {/* Additional Questions — multi-select chips */}
                            {relevantQuestions.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                                    <h3 className="text-lg font-serif font-semibold text-charcoal">
                                        A few quick questions
                                        <span className="ml-2 text-sm font-normal text-gray-500">(select all that apply)</span>
                                    </h3>
                                    {relevantQuestions.map(({ catSlug, catName, qs }) => (
                                        <div key={catSlug}>
                                            <p className="text-sm font-bold text-gray-700 mb-3">{catName}</p>
                                            {qs.map((q) => (
                                                <div key={q.id} className="mb-5">
                                                    <p className="text-sm font-semibold text-gray-800 mb-2">{q.question}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {q.options.map((opt) => {
                                                            const sel = answers[q.id]?.has(opt) ?? false;
                                                            return (
                                                                <button key={opt} type="button" onClick={() => toggleAnswer(q.id, opt)}
                                                                    className={`rounded-full border-2 px-3 py-1.5 text-sm font-medium transition ${sel ? "border-green-700 bg-green-700 text-white" : "border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-700"}`}>
                                                                    {opt}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {selectedItems.length > 0 && (
                                <div className="rounded-lg bg-forest/10 border border-forest/30 px-4 py-3 text-sm text-charcoal">
                                    <span className="font-semibold">{selectedItems.length} option{selectedItems.length !== 1 ? "s" : ""} selected</span>
                                    <span className="ml-3">· Est. ${totalEstimate.toFixed(2)}</span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Step 3: Schedule ── */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-charcoal">When would you like service?</h2>
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-4">
                                    Select a Date <span className="text-red-500">*</span>
                                </label>
                                <div className="flex justify-center">
                                    <Calendar
                                        value={selectedDate}
                                        onChange={(date) => { setSelectedDate(date as Date); setErrors((p) => ({ ...p, selectedDate: "" })); }}
                                        minDate={new Date()}
                                        className="border border-gray-200 rounded-lg"
                                    />
                                </div>
                                {errors.selectedDate && <p className="mt-2 text-sm text-red-500">{errors.selectedDate}</p>}
                            </div>
                            {selectedDate && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                                        Select Time <span className="text-red-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {TIME_SLOTS.map((slot) => (
                                            <button key={slot.label} type="button"
                                                onClick={() => { setSelectedTimeSlot(slot.value); setErrors((p) => ({ ...p, selectedTime: "" })); }}
                                                className={`py-2 px-3 rounded-lg border-2 text-sm font-medium transition ${selectedTimeSlot === slot.value && selectedDate ? "border-forest bg-forest/10 text-charcoal font-semibold" : "border-gray-200 hover:border-forest/50"}`}>
                                                {slot.label}
                                            </button>
                                        ))}
                                    </div>
                                    {errors.selectedTime && <p className="mt-2 text-sm text-red-500">{errors.selectedTime}</p>}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ── Step 4: Contact + Address ── */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-charcoal">Contact Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">First Name <span className="text-red-500">*</span></label>
                                    <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.firstName ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name <span className="text-red-500">*</span></label>
                                    <input type="text" value={lastName} onChange={(e) => { setLastName(e.target.value); setErrors((p) => ({ ...p, lastName: "" })); }}
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.lastName ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email <span className="text-red-500">*</span></label>
                                    <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.email ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone <span className="text-red-500">*</span></label>
                                    <input type="tel" value={phone}
                                        onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.phone ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address <span className="text-red-500">*</span></label>
                                    <input type="text" value={address}
                                        onChange={(e) => { setAddress(e.target.value); setErrors((p) => ({ ...p, address: "" })); }}
                                        placeholder="123 Main St"
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.address ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">City <span className="text-red-500">*</span></label>
                                    <input type="text" value={city}
                                        onChange={(e) => { setCity(e.target.value); setErrors((p) => ({ ...p, city: "" })); }}
                                        placeholder="Your City"
                                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${errors.city ? "border-red-500" : "border-gray-200 focus:border-forest"}`} />
                                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ── Step 5: Summary + Submit ── */}
                    {step === 5 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-serif font-bold text-charcoal">Review & Confirm</h2>

                            <div className="bg-gray-50 rounded-lg p-5 space-y-3 text-sm">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                    <div><span className="font-medium text-gray-600">Name:</span> <span className="text-gray-900">{firstName} {lastName}</span></div>
                                    <div><span className="font-medium text-gray-600">Phone:</span> <span className="text-gray-900">{phone}</span></div>
                                    <div className="col-span-2"><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-900">{email}</span></div>
                                    <div className="col-span-2"><span className="font-medium text-gray-600">Address:</span> <span className="text-gray-900">{address}, {city} {zipCode}</span></div>
                                    <div><span className="font-medium text-gray-600">Date:</span> <span className="text-gray-900">{selectedDate?.toLocaleDateString()}</span></div>
                                    <div><span className="font-medium text-gray-600">Time:</span> <span className="text-gray-900 capitalize">{selectedTimeSlot}</span></div>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Selected Services</h3>
                                <ul className="space-y-1.5">
                                    {selectedItems.map((item) => (
                                        <li key={item.servicePriceId} className="flex justify-between text-sm text-gray-700">
                                            <span>{item.serviceName} — {item.priceName}</span>
                                            <span className="font-medium">{item.priceDisplay}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-3 flex justify-between text-sm font-semibold text-gray-900 border-t pt-2">
                                    <span>Estimated Total</span>
                                    <span>${totalEstimate.toFixed(2)}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Additional Notes (optional)</label>
                                <textarea value={details} onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Anything else we should know before arriving..."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-forest transition" />
                            </div>

                            {submitError && (
                                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between gap-4">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${step === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                        <ChevronLeft size={20} />
                        Back
                    </button>

                    {step < 5 ? (
                        <button onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition ml-auto"
                        >
                            Continue
                            <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} disabled={submitting}
                            className="px-8 py-3 bg-forest text-charcoal rounded-lg font-semibold hover:bg-forest-dark transition disabled:opacity-60 ml-auto"
                        >
                            {submitting ? "Confirming…" : "Confirm Booking"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
