import Button from "@/Components/Button";
import "../../../../css/button.css";
import Authenticated from "@/Layouts/Authenticated/index";
import { Head, Link } from "@inertiajs/inertia-react";
import FlashMessage from "@/Components/FlashMessage";

export default function Index({ auth, flashMessage, users }) {
    return (
        <Authenticated auth={auth}>
            <Head title="User List" />

            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}

            <table className="table-fixed w-full text-center">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Last Subscription</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                    user.last_active_user_subscription
                                        ?.subscription_plan.name
                                }
                            </td>
                            <td>
                                <Link
                                    href={route(
                                        "admin.dashboard.user.show",
                                        user.id
                                    )}
                                >
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="w-28 mr-3"
                                    >
                                        Detail
                                    </Button>
                                </Link>
                                <Button
                                    type="button"
                                    variant="danger"
                                    className="w-28"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
