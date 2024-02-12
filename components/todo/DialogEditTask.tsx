"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/Drawer";
import { useIsMatch } from "@/hooks/useIsMatch";

import { Modal } from "../Modal";

export const DialogEditTask = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const { isMatch } = useIsMatch();

    if (!isMatch) {
        return (
            <Modal>
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                        },
                    }}
                >
                    {children}
                </motion.div>
            </Modal>
        );
    }

    return (
        <Drawer
            open={open}
            onOpenChange={setOpen}
            onClose={() => router.back()}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Редактирование задачи</DrawerTitle>
                </DrawerHeader>
                <div className="px-4">{children}</div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button
                            variant="outline"
                            className="text-xl md:text-base"
                        >
                            Закрыть
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
