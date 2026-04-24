export const fetchCoupons = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/api/coupon/getcoupons`);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch coupons");
    }
    return data.coupons;
};