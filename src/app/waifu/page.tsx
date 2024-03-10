import React from "react";
import Link from "next/link";
const waifus = [
    {
        name: "Hinata",
        picture: "https://i.pinimg.com/564x/38/d4/97/38d4976a7bf28851320a8e1f2f8ad89f.jpg",
        anime: "Naruto",
    },
    {
        name: "Maki",
        picture: "https://i.pinimg.com/564x/4b/96/dc/4b96dcc46a995c565a5157ca04f1e377.jpg",
        anime: "Jujutsu Kaisen",
    },
];
const page = () => {
    return (
        <section className="min-h-screen p-4 flex flex-col gap-2 ">
            <h1 className=" font-bold text-3xl">Select Your Waifu</h1>
            <p className=" opacity-70 font-medium text-lg">More coming soon...</p>
            <div className="flex gap-2 mt-4 flex-wrap">
                {waifus.map((value, index) => (
                    <Link href={`/waifu/${value?.name || ""}/${value.anime || " "}`} key={index} className="flex justify-center items-center flex-col group duration-200">
                        <img src={value.picture} alt={value?.name || "Unknown"} className="lg:w-32 border-2 group-hover:scale-75 duration-100 lg:h-32 w-24 h-24 rounded-full" />
                        <span className=" font-bold mt-2 tracking-wide uppercase">{value?.name || "Unknown"}</span>
                        <span className="text-sm opacity-70 font-medium">{value?.anime || "Unknown"}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default page;
