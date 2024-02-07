"use client";

import { Bars3Icon, PowerIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useState } from "react";

import NavLinks from "./nav-links";
import { SidenavHeader } from "./sidenavHeader";

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <button
                onClick={() => {
                    setOpen((prevState) => !prevState);
                }}
                className="flex text-4xl text-white"
            >
                <Bars3Icon className="w-[24px]" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{
                            width: 0,
                        }}
                        animate={{
                            width: "50vw",
                        }}
                        exit={{
                            width: 0,
                        }}
                        className="pointer-events-auto fixed bottom-0 left-0 right-0 top-0 z-50 flex h-screen bg-black"
                    >
                        <div
                            onClick={() => {
                                setOpen((prevState) => !prevState);
                            }}
                            className="fixed bottom-0 left-0 right-0 top-0 z-[-1] bg-black  opacity-50"
                        />
                        <motion.nav
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                transition: {
                                    delay: 0.15,
                                },
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.1,
                                },
                            }}
                            className="z-50 flex h-full w-full flex-col justify-center bg-zinc-900 px-2"
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
