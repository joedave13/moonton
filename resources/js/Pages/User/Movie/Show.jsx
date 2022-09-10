import { Head, Link } from "@inertiajs/inertia-react";
import ReactPlayer from "react-player";

export default function Show({ movie }) {
    return (
        <>
            <Head>
                <title>{movie.title}</title>
            </Head>
            <section
                className="mx-auto w-screen h-screen relative watching-page font-poppins bg-form-bg"
                id="stream"
            >
                <div className="pt-[100px]">
                    <ReactPlayer
                        url={movie.video_url}
                        controls
                        width={"100%"}
                        height={"850px"}
                    />
                </div>

                {/* Back to Dashboard */}
                <div className="absolute top-5 left-5 z-20">
                    <Link href={route("user.dashboard.index")}>
                        <img
                            src="/icons/ic_arrow-left.svg"
                            className="transition-all btn-back w-[46px]"
                            alt="stream"
                        />
                    </Link>
                </div>
                {/* End Back to Dashboard */}

                {/* Video Title */}
                <div className="absolute title-video top-7 left-1/2 -translate-x-1/2 max-w-[310px] md:max-w-[620px] text-center">
                    <span className="font-medium text-2xl transition-all text-white drop-shadow-md select-none">
                        {movie.title}
                    </span>
                </div>
                {/* Video Title */}
            </section>
        </>
    );
}
