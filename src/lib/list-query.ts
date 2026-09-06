export type ListQuery = {
    page?: number;
    per_page?: number;
    search?: string;
    sort?: string;
};

export function toBackendSort(sort: string | undefined, aliases: Record<string, string> = {}) {
    if (!sort) return undefined;

    const direction = sort.startsWith("-") ? "-" : "";
    const field = sort.replace(/^-/, "");
    return `${direction}${aliases[field] ?? field}`;
}
