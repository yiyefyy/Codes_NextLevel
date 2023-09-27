'use client';
import { usePathname } from 'next/navigation';
import { Disclosure } from '@headlessui/react';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-slate-500 h-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="space-y-1 pt-2 pb-3">
            {navigation.map((item) => (
              <Disclosure.Button
                key={item.name}
                as="a"
                href={item.href}
                className={classNames(
                  pathname === item.href
                    ? 'border-slate-500 text-slate-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800',
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
