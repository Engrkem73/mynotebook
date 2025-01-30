export interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export interface ApiRouteContext {
    params: Promise<{ id: string}>;
}