"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', user: true, admin: true },
  { name: 'My Schedule', href: '/mySchedule', user: true, admin: false },
  { name: 'Manage Events', href: '/manageEvents', user: false, admin:true },
  { name: 'Manage Employees', href: '/manageEmployees', user: false, admin: true}
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default async function Sidebar({ isAdmin }: { isAdmin: Boolean }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-slate-500 h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="space-y-1 pt-2 pb-3">
            {navigation
            .filter((item) => (isAdmin && item.admin) || (!isAdmin && item.user) )
            .map((item) => (
              <Link key={item.name} href={item.href} passHref legacyBehavior>
                <a
                  className={classNames(
                    pathname === item.href
                      ? 'border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
