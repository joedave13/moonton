import Button from "@/Components/Button";
import "../../../../css/button.css";
import Authenticated from "@/Layouts/Authenticated/index";
import { Link } from "@inertiajs/inertia-react";

export default function Index({ auth }) {
    return (
        <Authenticated auth={auth}>
            <Link href={route("admin.dashboard.movie.create")}>
                <Button type="button" className="w-44 mb-8">
                    Create New Movie
                </Button>
            </Link>
        </Authenticated>
    );
}
