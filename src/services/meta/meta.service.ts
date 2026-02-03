import { serverFetch } from "@/lib/server-fetch";

export const getMetaData = async () => {
    try {
        const res = await serverFetch.get("/metadata", {
            cache: "no-store",
        });
        const data = await res.json();
        console.log("Metadata response:", data);
        return data?.data;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return null;
    }
};
