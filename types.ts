export interface PageProps {
    params: Promise<{
        notebookId: string;
    }>;
}

export interface ApiRouteContext {
    params: Promise<{ id: string}>;
}