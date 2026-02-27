const ReviewChecker = async (orderid) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/review/checkreview/${orderid}`, { credentials: "include" })

        if (!res.ok) {
            throw new Error("Unable to fetch in reviewchecker utility")
        }
        return await res.json();
    }
    catch (err) {
        console.log(err, "Error in reviewchecker utility")
        return null;
    }
}

export default ReviewChecker;