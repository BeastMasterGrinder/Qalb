 "use client";

 export const getBrowser = (): string | null => {
    if (typeof window !== "undefined") {
        return window.navigator.productSub;
    }
    return null;
 }