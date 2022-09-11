import { Link } from "@inertiajs/inertia-react";

export default function MenuItem({
    link,
    icon,
    text,
    isActive,
    method = "GET",
}) {
    return (
        <Link
            href={link ? route(link) : "#"}
            className={`side-link ${isActive && "active"}`}
            method={method}
        >
            {icon}
            {text}
        </Link>
    );
}
