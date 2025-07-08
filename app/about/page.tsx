import { Lato } from "next/font/google";
import * as motion from "motion/react-client"
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: 'About Qalb',
    description: 'Learn more about Qalb and its creator Farjad. Discover the story behind your spiritual companion for Quranic learning and Islamic knowledge.',
    openGraph: {
        title: 'About Qalb',
        description: 'Learn more about Qalb and its creator Farjad. Discover the story behind your spiritual companion for Quranic learning and Islamic knowledge.',
        type: 'website',
        url: `https://www.qalbjournal.com/about`,
        siteName: 'Qalb',
        images: [
            {
                url: 'https://www.qalbjournal.com/images/aboutme.jpg',
                width: 500,
                height: 500,
                alt: 'About Qalb - Farjad',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Qalb',
        description: 'Learn more about Qalb and its creator Farjad. Discover the story behind your spiritual companion for Quranic learning and Islamic knowledge.',
        creator: '@QalbApp',
        images: ['https://www.qalbjournal.com/images/aboutme.jpg'],
    },
};

const lato = Lato({
    weight: ["400", "700"],
    subsets: ["latin"],
});

const LinksClass = "text-verse hover:text-primary transition-all duration-300";

export default function About() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
                duration: 0.8,
            }}
            className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 p-10 md:p-20 mt-20"
        >
            <div>
                <Image src={"/images/aboutme.jpg"} alt="About" width={500} height={500} />
            </div>
            <div className="flex flex-col gap-4">
                <h1 className={`${lato.className} text-5xl font-bold`}>Hi I'm Farjad</h1>
                <p className="leading-8">
                    Initially I made this app for my own personal use, but I thought it might be useful for others.<br/>
                    I would also learn from scalling this project, and do more.<br/>
                    If you have any feedback, please let me know. <span className="text-muted-foreground"> I have a lot of plans for this project. </span><br/>

                    The website might be scuffed or even sometimes slow, but I'm working on it.<br/>
                    Can't really help with the slow speed, as it is host on free stuff.
                    <br/>
                    You reach me out via  
                    <Link 
                        href="mailto:qalb@farjad.me" 
                        className={LinksClass}>
                            &nbsp;Email&nbsp;
                    </Link>
                    or 
                    <Link 
                        href="https://github.com/BeastMasterGrinder" 
                        className={LinksClass}>
                            &nbsp;Github&nbsp;
                    </Link>.

                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    P.S. If you can donate, it would be great :D but you don't have to.

                </p>
            </div>
        </motion.div>
    )
}