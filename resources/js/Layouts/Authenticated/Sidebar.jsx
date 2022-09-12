import MenuItem from "@/Components/MenuItem";
import { Link } from "@inertiajs/inertia-react";
import { adminMenu, userMenu, userOtherMenu } from "./MenuList";
import SubscriptionDetail from "./SubscriptionDetail";

export default function Sidebar({ auth }) {
    return (
        <aside className="fixed z-50 w-[300px] h-full">
            <div className="flex flex-col p-[30px] pr-0 border-r border-gray-[#F1F1F1] overflow-y-auto h-full">
                <Link href={route("user.dashboard.index")}>
                    <img src="/images/moonton.svg" alt="" />
                </Link>
                <div className="links flex flex-col mt-[60px] h-full gap-[50px]">
                    {/* User Role Menu */}
                    {!auth.isAdmin && (
                        <>
                            <div>
                                <div className="text-gray-1 text-sm mb-4">
                                    Menu
                                </div>
                                {userMenu.map((menu, index) => (
                                    <MenuItem
                                        key={`${index}-${menu.text}`}
                                        link={menu.link}
                                        icon={menu.icon}
                                        text={menu.text}
                                        isActive={
                                            menu.link &&
                                            route().current(menu.link)
                                        }
                                    />
                                ))}
                            </div>

                            <div>
                                <div className="text-gray-1 side-link mb-4">
                                    Others
                                </div>
                                {userOtherMenu.map((otherMenu, index) => (
                                    <MenuItem
                                        key={`${index}-${otherMenu.name}`}
                                        link={otherMenu.link}
                                        icon={otherMenu.icon}
                                        text={otherMenu.text}
                                        isActive={
                                            otherMenu.link &&
                                            route().current(otherMenu.link)
                                        }
                                        method={otherMenu.method}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    {/* End User Role Menu */}

                    {/* Admin Role Menu  */}
                    {auth.isAdmin && (
                        <div>
                            <div className="text-gray-1 side-link mb-4">
                                Menu
                            </div>
                            {adminMenu.map((otherMenu, index) => (
                                <MenuItem
                                    key={`${index}-${otherMenu.name}`}
                                    link={otherMenu.link}
                                    icon={otherMenu.icon}
                                    text={otherMenu.text}
                                    isActive={
                                        otherMenu.link &&
                                        route().current(otherMenu.link)
                                    }
                                    method={otherMenu.method}
                                />
                            ))}
                        </div>
                    )}
                    {/* End Admin Role Menu */}

                    {/* <SubscriptionDetail isPremium /> */}
                    {auth.activePlan && (
                        <SubscriptionDetail
                            name={auth.activePlan.name}
                            isPremium={auth.activePlan.name === "Premium"}
                            remainingActiveDays={
                                auth.activePlan.remainingActiveDays
                            }
                            activeDays={auth.activePlan.activeDays}
                        />
                    )}
                </div>
            </div>
        </aside>
    );
}
