'use client'
import { useState, useEffect } from "react";
import { getRandomVerse } from "@/app/actions/getVerse";

export default function Verse() {
    const [verse, setVerse] = useState({
        text: "",
        translation: "",
        key: ""
    });
    const fetchVerse = async () => {
        const verse = await getRandomVerse();
        setVerse(verse);
    }
    useEffect(() => {
        fetchVerse();
    }, []);
    return (
        <div style={{width:'100vw', height:'100vh'}} className={`flex flex-col min-h-screen min-w-screen transition-colors duration-300 `}>
            <h1 className="lg:text-5xl md:text-3xl font-bold text-center mt-10 mb-5 w-full">Verse Generated</h1>
            <div className="flex-grow flex flex-col justify-center items-center mt-3 px-4 w-full">
                <p className="Verse lg:text-5xl md:text-4xl text-center mb-2">
                    {verse.text}
                </p>
                <p className="text-xl text-center my-2" >
                    {verse.translation}
                </p>
                <p className="text-md text-center">
                    ({verse.key})
                </p>
            </div>
        </div>
    );
}