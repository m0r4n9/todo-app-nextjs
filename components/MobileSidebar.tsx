"use client";

import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useState } from "react";

import NavLinks from "./nav-links";
import { SidenavHeader } from "./sidenavHeader";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className="">
            <div className="flex">
                <button
                    onClick={toggleSidebar}
                    className="flex-none rounded p-1 text-4xl text-white transition hover:bg-gray-200"
                >
                    <Bars3Icon className="w-[24px] text-black dark:text-white" />
                </button>
                <div className="flex-1 text-center text-xl font-semibold">
                    TODO App
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.aside
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "55vw",
                        }}
                        exit={{
                            width: 0,
                        }}
                        className="pointer-events-auto fixed bottom-0 left-0 right-0 top-0 z-50 flex h-dvh bg-white dark:bg-zinc-900"
                    >
                        <motion.div
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.27,
                                },
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            onClick={toggleSidebar}
                            className="fixed bottom-0 left-0 right-0 top-0 z-[-1] bg-black/50"
                        />
                        <motion.nav
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.2,
                                    duration: 0.2,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.1,
                                },
                            }}
                            className="flex h-full w-full flex-col justify-center bg-inherit px-2"
                        >
                            <SidenavHeader />
                            <div className="flex grow flex-col justify-center">
                                <NavLinks
                                    toggleSidebar={() => setOpen(false)}
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <div>
                                    <button className="flex w-full gap-2 rounded-md p-3 transition duration-300 hover:bg-gray-200 dark:text-white dark:hover:bg-zinc-500">
                                        <PowerIcon className="w-6" />
                                        <button
                                            onClick={() =>
                                                signOut({
                                                    callbackUrl: "/login",
                                                })
                                            }
                                        >
                                            Выйти
                                        </button>
                                    </button>
                                </div>
                            </div>
                        </motion.nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};
