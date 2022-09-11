import Button from "@/Components/Button";
import "../../../../css/button.css";
import Authenticated from "@/Layouts/Authenticated/index";
import { Head, Link } from "@inertiajs/inertia-react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flashMessage }) {
    return (
        <Authenticated auth={auth}>
            <Head>
                <title>Movie List</title>
            </Head>
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-44 mb-8">
                    Create New Movie
                </Button>
            </Link>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}
        </Authenticated>
    );
}
