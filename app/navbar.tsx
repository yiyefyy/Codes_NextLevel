'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Playground', href: '/playground' }
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="185"
                    height="41"
                    viewBox="0 0 185 41"
                    fill="none"
                  >
                    <path
                      d="M53.16 36V19.2H57.672L64.488 34.728V19.2H69V36H64.488L57.672 20.472V36H53.16ZM78.5243 36.24C77.2923 36.24 76.1803 35.976 75.1883 35.448C74.1963 34.92 73.4123 34.2 72.8363 33.288C72.2603 32.36 71.9723 31.304 71.9723 30.12C71.9723 28.888 72.2603 27.792 72.8363 26.832C73.4283 25.856 74.2203 25.104 75.2123 24.576C76.2203 24.032 77.3323 23.76 78.5483 23.76C79.7643 23.76 80.8603 24.024 81.8363 24.552C82.8123 25.08 83.5803 25.824 84.1403 26.784C84.7003 27.728 84.9803 28.808 84.9803 30.024C84.9803 30.056 84.9803 30.096 84.9803 30.144C84.9803 30.176 84.9803 30.208 84.9803 30.24H75.8363C75.8683 30.72 76.0043 31.152 76.2443 31.536C76.5003 31.92 76.8283 32.224 77.2283 32.448C77.6283 32.672 78.0683 32.784 78.5483 32.784C78.9803 32.784 79.3643 32.704 79.7003 32.544C80.0523 32.384 80.3083 32.176 80.4683 31.92H84.6443C84.5963 32.592 84.3163 33.264 83.8043 33.936C83.2923 34.592 82.5803 35.144 81.6683 35.592C80.7563 36.024 79.7083 36.24 78.5243 36.24ZM81.3083 29.76C81.2923 29.28 81.1563 28.848 80.9003 28.464C80.6603 28.08 80.3403 27.784 79.9403 27.576C79.5403 27.352 79.0923 27.24 78.5963 27.24C78.1003 27.24 77.6523 27.352 77.2523 27.576C76.8523 27.784 76.5243 28.08 76.2683 28.464C76.0283 28.848 75.8923 29.28 75.8603 29.76H81.3083ZM85.4799 36L90.0399 29.88L85.6719 24H90.2319L92.7279 27.336L95.1999 24H99.6159L95.2479 29.832L99.8079 36H95.2719L92.6079 32.256L89.8719 36H85.4799ZM107.641 36.216C106.025 36.216 104.825 35.88 104.041 35.208C103.273 34.536 102.889 33.536 102.889 32.208V27.504H100.273V24H101.617C102.177 24 102.609 23.848 102.913 23.544C103.217 23.24 103.369 22.808 103.369 22.248V21.12H106.801V24H110.785V27.504H106.801V31.2C106.801 31.712 106.937 32.08 107.209 32.304C107.481 32.512 107.937 32.616 108.577 32.616C109.201 32.616 109.937 32.56 110.785 32.448V35.952C110.289 36.032 109.745 36.096 109.153 36.144C108.577 36.192 108.073 36.216 107.641 36.216ZM119.91 36V19.2H124.422V31.656H132.558V36H119.91ZM140.493 36.24C139.261 36.24 138.149 35.976 137.157 35.448C136.165 34.92 135.381 34.2 134.805 33.288C134.229 32.36 133.941 31.304 133.941 30.12C133.941 28.888 134.229 27.792 134.805 26.832C135.397 25.856 136.189 25.104 137.181 24.576C138.189 24.032 139.301 23.76 140.517 23.76C141.733 23.76 142.829 24.024 143.805 24.552C144.781 25.08 145.549 25.824 146.109 26.784C146.669 27.728 146.949 28.808 146.949 30.024C146.949 30.056 146.949 30.096 146.949 30.144C146.949 30.176 146.949 30.208 146.949 30.24H137.805C137.837 30.72 137.973 31.152 138.213 31.536C138.469 31.92 138.797 32.224 139.197 32.448C139.597 32.672 140.037 32.784 140.517 32.784C140.949 32.784 141.333 32.704 141.669 32.544C142.021 32.384 142.277 32.176 142.437 31.92H146.613C146.565 32.592 146.285 33.264 145.773 33.936C145.261 34.592 144.549 35.144 143.637 35.592C142.725 36.024 141.677 36.24 140.493 36.24ZM143.277 29.76C143.261 29.28 143.125 28.848 142.869 28.464C142.629 28.08 142.309 27.784 141.909 27.576C141.509 27.352 141.061 27.24 140.565 27.24C140.069 27.24 139.621 27.352 139.221 27.576C138.821 27.784 138.493 28.08 138.237 28.464C137.997 28.848 137.861 29.28 137.829 29.76H143.277ZM152.125 36L147.589 24H151.693L154.717 32.616H154.957L157.957 24H161.989L157.453 36H152.125ZM169.274 36.24C168.042 36.24 166.93 35.976 165.938 35.448C164.946 34.92 164.162 34.2 163.586 33.288C163.01 32.36 162.722 31.304 162.722 30.12C162.722 28.888 163.01 27.792 163.586 26.832C164.178 25.856 164.97 25.104 165.962 24.576C166.97 24.032 168.082 23.76 169.298 23.76C170.514 23.76 171.61 24.024 172.586 24.552C173.562 25.08 174.33 25.824 174.89 26.784C175.45 27.728 175.73 28.808 175.73 30.024C175.73 30.056 175.73 30.096 175.73 30.144C175.73 30.176 175.73 30.208 175.73 30.24H166.586C166.618 30.72 166.754 31.152 166.994 31.536C167.25 31.92 167.578 32.224 167.978 32.448C168.378 32.672 168.818 32.784 169.298 32.784C169.73 32.784 170.114 32.704 170.45 32.544C170.802 32.384 171.058 32.176 171.218 31.92H175.394C175.346 32.592 175.066 33.264 174.554 33.936C174.042 34.592 173.33 35.144 172.418 35.592C171.506 36.024 170.458 36.24 169.274 36.24ZM172.058 29.76C172.042 29.28 171.906 28.848 171.65 28.464C171.41 28.08 171.09 27.784 170.69 27.576C170.29 27.352 169.842 27.24 169.346 27.24C168.85 27.24 168.402 27.352 168.002 27.576C167.602 27.784 167.274 28.08 167.018 28.464C166.778 28.848 166.642 29.28 166.61 29.76H172.058ZM178.285 36V18.96H182.197V36H178.285Z"
                      fill="#2B3D62"
                    />
                    <path
                      d="M51.4545 0L46 3.1875L55.0909 8.5L46 13.8125L51.4545 17L66 8.5L51.4545 0Z"
                      fill="#2B3D62"
                    />
                    <path
                      d="M39.4286 2V36H46V2H39.4286ZM26.2857 6.25V36H32.8571V6.25H26.2857ZM13.1429 14.75V36H19.7143V14.75H13.1429ZM0 23.25V36H6.57143V23.25H0Z"
                      fill="#2B3D62"
                    />
                  </svg>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user?.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user?.name || 'placeholder'} avatar`}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {user ? (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signOut()}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={() => signIn('github')}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
