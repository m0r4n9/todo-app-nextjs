"use client";

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
        return <Modal>{children}</Modal>;
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
                {children}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Закрыть</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
