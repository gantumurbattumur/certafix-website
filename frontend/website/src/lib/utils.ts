export function formatPrice(cents: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents);
}

export function formatPriceRange(min: number, max: number | null): string {
    if (max) {
        return `${formatPrice(min)} – ${formatPrice(max)}`;
    }
    return formatPrice(min);
}

export function formatPriceDisplay(
    price: number,
    priceMax: number | null,
    priceType: string,
    unit?: string | null,
): string {
    switch (priceType) {
        case "FIXED":
            return `${formatPrice(price)}${unit ? ` ${unit}` : ""}`;
        case "HOURLY":
            return `${formatPrice(price)}${unit ? ` ${unit}` : "/hr"}`;
        case "STARTING_AT":
            return `From ${formatPrice(price)}`;
        case "RANGE":
            return formatPriceRange(price, priceMax);
        default:
            return formatPrice(price);
    }
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
}
