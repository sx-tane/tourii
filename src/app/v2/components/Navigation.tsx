'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconHome, IconMap, IconBook } from './Icons';

const Navigation = () => {
    const pathname = usePathname();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/v2/dashboard',
            icon: IconHome,
            current: pathname === '/v2/dashboard',
        },
        {
            name: 'Quests',
            href: '/v2/quests',
            icon: IconMap,
            current: pathname.startsWith('/v2/quests'),
        },
        {
            name: 'Stories',
            href: '/v2/stories',
            icon: IconBook,
            current: pathname.startsWith('/v2/stories'),
        },
    ];

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/v2/dashboard" className="text-xl font-bold text-indigo-600">
                                Tourii
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`${item.current
                                        ? 'border-indigo-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    <item.icon
                                        className={`mr-2 h-5 w-5 ${item.current ? 'text-indigo-500' : 'text-gray-400'
                                            }`}
                                    />
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* Add user menu or other actions here */}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`${item.current
                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                        >
                            <div className="flex items-center">
                                <item.icon
                                    className={`mr-3 h-5 w-5 ${item.current ? 'text-indigo-500' : 'text-gray-400'
                                        }`}
                                />
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation; 