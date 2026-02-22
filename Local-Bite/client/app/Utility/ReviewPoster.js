import React from 'react'

const submitreview = async (selectedRating, orderid, tags, Review, vendor) => {
    if (!vendor || !selectedRating || !orderid) {
        alert("Please fill Required fields before submitting")
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/review/submit`, {
        credentials: "include",
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            vendor: vendor,
            stars: selectedRating,
            review: Review,
            orderid: orderid,
            tags: tags
        })
    })

    if (!res.ok) {
        throw new Error("Error while fetching")
    }
    const { data } = await res.json();
    console.log(`Review Added - ${data?.rating}`)
    alert("Review Added")
}

export default submitreview;