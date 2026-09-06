type BackendCollectionResponse = {
    status: string;
    results?: number;
    data: Record<string, unknown[]>;
};

type BackendSingleResponse = {
    status: string;
    data: Record<string, unknown> | null;
};

export function mapId<T extends { _id?: string }>(item: T): T & { id: string } {
    return { ...item, id: String(item._id) };
}

export function extractList<T>(
    response: BackendCollectionResponse,
    resource: string,
): { items: T[]; total: number } {
    const raw = (response.data?.[resource] ?? []) as Array<T & { _id?: string }>;
    const items = raw.map((item) => mapId(item));
    return { items, total: response.results ?? items.length };
}

export function extractOne<T>(
    response: BackendSingleResponse,
    resource: string,
): T | undefined {
    const raw = response.data?.[resource] as T & { _id?: string } | undefined;
    return raw ? mapId(raw) : undefined;
}