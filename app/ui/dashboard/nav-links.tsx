'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { HomeIcon, Cog6ToothIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'My todo list', href: '/dashboard/todo', icon: CheckCircleIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon }
]

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <>
            {links.map(link => {
                const LinkIcon = link.icon;
                return (
                    <Link key={link.name} href={link.href} 
                    className={clsx(
                        'flex items-center justify-start p-4 text-start rounded mt-2 first:mt-0 gap-1',
                        {'bg-black text-white': pathname === link.href},
                        {'transition duration-300 hover:bg-gray-300': pathname !== link.href }
                        )}>
                        {LinkIcon && <LinkIcon className="w-4"/>}
                        <p className='text-base'>{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}