"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '@/app/Cards/ProductCard/page'
import { useQuery } from '@tanstack/react-query'

const Products = ({ params }) => {
    const unwrapped = React.use(params);
    const vendorId = unwrapped.vendorId;

    const [vendor, setvendor] = useState()


    const ReviewCard = ({ name, text }) => {
        return (
            <div className="bg-white px-4 mx-2 py-3 rounded-xl shadow-lg min-w-[220px]">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-600">{text}</p>
            </div>
        );
    };

    const CarouselRow = ({ direction, children, speed = 30 }) => {
        const ref = React.useRef(null);

        useEffect(() => {
            const el = ref.current;
            if (!el) return;

            const totalWidth = el.scrollWidth;
            el.style.setProperty("--half-width", `${totalWidth / 2}px`);
            el.style.setProperty("--duration", `${speed}s`);
        }, []);

        return (
            <div className="w-full overflow-hidden">
                <div
                    ref={ref}
                    className="carousel-track"
                    style={{
                        animationDirection: direction === "right" ? "reverse" : "normal",
                    }}
                >
                    {children}
                    {children}
                </div>
            </div>
        );
    };



    const getvendor = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/vendor/${vendorId}`, { credentials: 'include' })
            if (!res.ok) {
                console.log(res)
                throw new Error("Response error")
            }
            const { vendor } = await res.json();
            setvendor(vendor)
            // console.log(vendor)
        }
        catch (err) {
            console.log(err)
            alert("Error while fetching vendor")
        }
    }



    const getproducts = async () => {
        console.log(vendorId)
        let res = await fetch(`${process.env.NEXT_PUBLIC_BACKENDURL}/api/product/${vendorId}`)
        if (!res.ok) {
            throw new Error("Products fetching error")
        }
        const data = await res.json();
        // console.log(data.pro, data, res)
        return data.pro || [];
    }

    useEffect(() => {
        getvendor()
    }, [])

    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products", vendorId],
        queryFn: getproducts,
        staleTime: 1000 * 60 * 2, // (2 min) refresh time
        cacheTime: 1000 * 60 * 15 // keep cache in memory
    });

    if (isLoading) {
        return <div role="status">
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
    if (isError) { return <p>Error: {error.message}</p> }

    const reviews = [
        { name: "Ramesh", text: "Best idli ever 😋" },
        { name: "Pooja", text: "Sambar is fire 🔥" },
        { name: "Amit", text: "Super hygienic" },
        { name: "Neha", text: "Fast delivery 🚀" },
        { name: "Rahul", text: "Worth every rupee" },
    ];


    return (
        <div>
            <div className="relative w-full h-[420px] overflow-hidden">

                <img
                    src={vendor?.imageUrl || "/restaurent-placeholder.jpg"}
                    className="absolute w-full h-full object-cover"
                />

                {/* dark overlay */}
                <div className="absolute inset-0 bg-black/50" />
                {/* ROW 1 */}
                <div className="absolute top-22 w-full mx-3">
                    <CarouselRow speed={15} direction="right">
                        {reviews.map((r, i) => <ReviewCard key={i} {...r}/>)}
                    </CarouselRow>
                </div>

                {/* ROW 2 */}
                <div className="absolute top-42 w-full mx-3">
                    <CarouselRow speed={10} direction="left">
                        {reviews.map((r, i) => <ReviewCard key={i} {...r} />)}
                    </CarouselRow>
                </div>

                {/* ROW 3 */}
                <div className="absolute top-62 w-full mx-3">
                    <CarouselRow speed={15} direction="right">
                        {reviews.map((r, i) => <ReviewCard key={i} {...r} />)}
                    </CarouselRow>
                </div>



                {/* Rating box */}
                <div className="absolute bottom-2 left-6 bg-white px-4 py-3 rounded-xl shadow-xl font-bold">
                    ⭐ {vendor.averagerating ? vendor.averagerating : "NEW"}<br />
                    {vendor.totalratings ? vendor.totalratings : "No"} reviews
                </div>

            </div>

            <hr className='bg-black w-full h-1' />
            <div className='text-5xl font-bold text-black ml-12 mt-10 font-sans'>Our Menu-</div>
            <div className='grid grid-cols-2 items-center justify-center gap-y-10 mx-auto mt-44 mb-30 w-422'>
                {products && products.map((product) => {
                    return <ProductCard product={product} key={product._id} />
                })}
            </div>
        </div>
    )
}

export default Products