'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    zoomAndPan="magnify"
                    viewBox="0 0 362.25 103.5"
                    height="100"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.0"
                  >
                    <defs>
                      <g />
                      <clipPath id="f64b67a2be">
                        <path
                          d="M 9 0.558594 L 99.082031 0.558594 L 99.082031 44 L 9 44 Z M 9 0.558594 "
                          clipRule="nonzero"
                        />
                      </clipPath>
                      <clipPath id="9a2e051521">
                        <path
                          d="M 0.746094 45 L 99.082031 45 L 99.082031 102.828125 L 0.746094 102.828125 Z M 0.746094 45 "
                          clipRule="nonzero"
                        />
                      </clipPath>
                    </defs>
                    <g clipPath="url(#f64b67a2be)">
                      <path
                        fill="#45595a"
                        d="M 99.046875 43.535156 C 98.648438 25.230469 83.929688 10.109375 65.628906 8.914062 C 56.082031 8.515625 54.09375 8.914062 42.953125 8.914062 C 26.246094 8.914062 17.890625 8.914062 9.535156 0.558594 C 9.535156 14.882812 20.277344 35.175781 38.976562 35.175781 L 72.394531 35.175781 L 72.394531 28.015625 L 86.316406 36.371094 Z M 99.046875 43.535156 "
                        fillOpacity="1"
                        fillRule="evenodd"
                      />
                    </g>
                    <g clipPath="url(#9a2e051521)">
                      <path
                        fill="#adc1c2"
                        d="M 47.726562 53.484375 L 40.167969 53.484375 C 26.246094 53.484375 13.910156 62.238281 9.535156 75.765625 L 0.785156 102.828125 L 8.34375 102.828125 C 22.664062 102.828125 34.597656 94.074219 38.976562 80.542969 L 39.371094 79.746094 C 50.511719 79.746094 52.5 79.746094 64.039062 79.746094 C 83.132812 79.746094 98.648438 64.226562 99.046875 45.125 L 86.316406 52.6875 L 72.394531 60.644531 L 72.394531 53.484375 Z M 47.726562 53.484375 "
                        fillOpacity="1"
                        fillRule="evenodd"
                      />
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(121.420132, 63.36024)">
                        <g>
                          <path d="M 10.894531 -16.609375 C 9.082031 -16.609375 7.128906 -15.902344 5.5 -14.304688 L 5.132812 -15.71875 C 5.039062 -16.101562 4.792969 -16.273438 4.441406 -16.273438 L 2.734375 -16.273438 C 2.335938 -16.273438 2.105469 -16.042969 2.105469 -15.640625 L 2.105469 -0.628906 C 2.105469 -0.214844 2.335938 0 2.734375 0 L 5.4375 0 C 5.855469 0 6.070312 -0.214844 6.070312 -0.628906 L 6.070312 -9.386719 C 6.070312 -11.707031 7.683594 -13.121094 9.679688 -13.121094 C 11.722656 -13.121094 12.953125 -11.617188 12.953125 -9.480469 L 12.953125 -0.628906 C 12.953125 -0.214844 13.167969 0 13.582031 0 L 16.285156 0 C 16.6875 0 16.917969 -0.214844 16.917969 -0.628906 L 16.917969 -10.046875 C 16.917969 -13.246094 15.335938 -16.609375 10.894531 -16.609375 Z M 10.894531 -16.609375 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(138.982966, 63.36024)">
                        <g>
                          <path d="M 9.542969 -16.609375 C 4.902344 -16.609375 1.398438 -13.277344 1.398438 -8.128906 C 1.398438 -2.917969 5.148438 0.351562 9.710938 0.351562 C 12.183594 0.351562 14.597656 -0.691406 16.410156 -2.597656 C 16.734375 -2.917969 16.734375 -3.226562 16.425781 -3.457031 L 14.917969 -5.117188 C 14.628906 -5.347656 14.398438 -5.332031 14.105469 -5.054688 C 12.890625 -3.8125 11.324219 -3.148438 9.816406 -3.148438 C 7.453125 -3.148438 5.378906 -4.734375 5.269531 -7.574219 L 16.839844 -7.574219 C 17.285156 -7.574219 17.515625 -7.730469 17.515625 -8.28125 C 17.515625 -13.277344 14.183594 -16.609375 9.542969 -16.609375 Z M 9.617188 -13.335938 C 11.292969 -13.335938 12.921875 -12.429688 13.398438 -10.355469 L 5.546875 -10.355469 C 6.128906 -12.445312 7.988281 -13.335938 9.617188 -13.335938 Z M 9.617188 -13.335938 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(156.5458, 63.36024)">
                        <g>
                          <path d="M 4.808594 0 C 5.148438 0 5.394531 -0.152344 5.5625 -0.414062 L 9.34375 -5.746094 L 13.121094 -0.414062 C 13.304688 -0.121094 13.550781 0 13.875 0 L 17.332031 0 C 17.855469 0 18.054688 -0.339844 17.714844 -0.753906 L 11.894531 -8.328125 L 17.4375 -15.519531 C 17.761719 -15.933594 17.578125 -16.273438 17.054688 -16.273438 L 13.78125 -16.273438 C 13.476562 -16.273438 13.214844 -16.148438 13.03125 -15.871094 L 9.34375 -10.847656 L 5.683594 -15.871094 C 5.484375 -16.148438 5.238281 -16.273438 4.933594 -16.273438 L 1.628906 -16.273438 C 1.121094 -16.273438 0.921875 -15.949219 1.261719 -15.519531 L 6.808594 -8.328125 L 1 -0.753906 C 0.660156 -0.339844 0.84375 0 1.367188 0 Z M 4.808594 0 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(174.001079, 63.36024)">
                        <g>
                          <path d="M 8.144531 0.351562 C 8.925781 0.351562 9.742188 0.277344 10.632812 0 C 11.03125 -0.121094 11.15625 -0.445312 11.03125 -0.8125 L 10.496094 -2.75 C 10.371094 -3.132812 10.09375 -3.273438 9.695312 -3.148438 C 9.296875 -3.027344 8.925781 -2.980469 8.621094 -2.980469 C 7.636719 -2.980469 7.007812 -3.535156 7.007812 -4.839844 L 7.007812 -13.046875 L 10.035156 -13.046875 C 10.449219 -13.046875 10.664062 -13.261719 10.664062 -13.675781 L 10.664062 -15.640625 C 10.664062 -16.042969 10.449219 -16.273438 10.035156 -16.273438 L 7.007812 -16.273438 L 7.007812 -21.140625 C 7.007812 -21.558594 6.777344 -21.773438 6.375 -21.773438 L 3.671875 -21.773438 C 3.257812 -21.773438 3.042969 -21.558594 3.042969 -21.140625 L 3.042969 -16.273438 L 1.691406 -16.273438 C 1.273438 -16.273438 1.058594 -16.042969 1.058594 -15.640625 L 1.058594 -13.675781 C 1.058594 -13.261719 1.273438 -13.046875 1.691406 -13.046875 L 3.042969 -13.046875 L 3.042969 -4.378906 C 3.042969 -1.304688 5.148438 0.351562 8.144531 0.351562 Z M 8.144531 0.351562 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(184.895447, 63.36024)">
                        <g />
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(193.039458, 63.36024)">
                        <g>
                          <path d="M 7.097656 0.351562 C 7.867188 0.351562 8.695312 0.308594 9.585938 0 C 9.957031 -0.136719 10.09375 -0.445312 9.972656 -0.8125 L 9.433594 -2.75 C 9.3125 -3.132812 9.050781 -3.273438 8.636719 -3.148438 C 8.25 -3.027344 7.867188 -2.980469 7.574219 -2.980469 C 6.578125 -2.980469 5.945312 -3.535156 5.945312 -4.839844 L 5.945312 -22.972656 C 5.945312 -23.386719 5.730469 -23.601562 5.316406 -23.601562 L 2.613281 -23.601562 C 2.195312 -23.601562 1.980469 -23.386719 1.980469 -22.972656 L 1.980469 -4.378906 C 1.980469 -1.304688 4.085938 0.351562 7.097656 0.351562 Z M 7.097656 0.351562 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(202.489504, 63.36024)">
                        <g>
                          <path d="M 9.542969 -16.609375 C 4.902344 -16.609375 1.398438 -13.277344 1.398438 -8.128906 C 1.398438 -2.917969 5.148438 0.351562 9.710938 0.351562 C 12.183594 0.351562 14.597656 -0.691406 16.410156 -2.597656 C 16.734375 -2.917969 16.734375 -3.226562 16.425781 -3.457031 L 14.917969 -5.117188 C 14.628906 -5.347656 14.398438 -5.332031 14.105469 -5.054688 C 12.890625 -3.8125 11.324219 -3.148438 9.816406 -3.148438 C 7.453125 -3.148438 5.378906 -4.734375 5.269531 -7.574219 L 16.839844 -7.574219 C 17.285156 -7.574219 17.515625 -7.730469 17.515625 -8.28125 C 17.515625 -13.277344 14.183594 -16.609375 9.542969 -16.609375 Z M 9.617188 -13.335938 C 11.292969 -13.335938 12.921875 -12.429688 13.398438 -10.355469 L 5.546875 -10.355469 C 6.128906 -12.445312 7.988281 -13.335938 9.617188 -13.335938 Z M 9.617188 -13.335938 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(220.052338, 63.36024)">
                        <g>
                          <path d="M 7.972656 0.015625 C 8.433594 0.96875 9.234375 0.953125 9.679688 0 L 16.855469 -15.535156 C 17.054688 -15.964844 16.855469 -16.273438 16.378906 -16.273438 L 13.550781 -16.273438 C 13.199219 -16.273438 12.96875 -16.148438 12.828125 -15.796875 L 8.835938 -5.839844 L 4.746094 -15.796875 C 4.609375 -16.132812 4.363281 -16.273438 4.011719 -16.273438 L 1.214844 -16.273438 C 0.738281 -16.273438 0.554688 -15.964844 0.753906 -15.535156 Z M 7.972656 0.015625 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(236.385962, 63.36024)">
                        <g>
                          <path d="M 9.542969 -16.609375 C 4.902344 -16.609375 1.398438 -13.277344 1.398438 -8.128906 C 1.398438 -2.917969 5.148438 0.351562 9.710938 0.351562 C 12.183594 0.351562 14.597656 -0.691406 16.410156 -2.597656 C 16.734375 -2.917969 16.734375 -3.226562 16.425781 -3.457031 L 14.917969 -5.117188 C 14.628906 -5.347656 14.398438 -5.332031 14.105469 -5.054688 C 12.890625 -3.8125 11.324219 -3.148438 9.816406 -3.148438 C 7.453125 -3.148438 5.378906 -4.734375 5.269531 -7.574219 L 16.839844 -7.574219 C 17.285156 -7.574219 17.515625 -7.730469 17.515625 -8.28125 C 17.515625 -13.277344 14.183594 -16.609375 9.542969 -16.609375 Z M 9.617188 -13.335938 C 11.292969 -13.335938 12.921875 -12.429688 13.398438 -10.355469 L 5.546875 -10.355469 C 6.128906 -12.445312 7.988281 -13.335938 9.617188 -13.335938 Z M 9.617188 -13.335938 " />
                        </g>
                      </g>
                    </g>
                    <g fill="#000000" fillOpacity="1">
                      <g transform="translate(253.948796, 63.36024)">
                        <g>
                          <path d="M 7.097656 0.351562 C 7.867188 0.351562 8.695312 0.308594 9.585938 0 C 9.957031 -0.136719 10.09375 -0.445312 9.972656 -0.8125 L 9.433594 -2.75 C 9.3125 -3.132812 9.050781 -3.273438 8.636719 -3.148438 C 8.25 -3.027344 7.867188 -2.980469 7.574219 -2.980469 C 6.578125 -2.980469 5.945312 -3.535156 5.945312 -4.839844 L 5.945312 -22.972656 C 5.945312 -23.386719 5.730469 -23.601562 5.316406 -23.601562 L 2.613281 -23.601562 C 2.195312 -23.601562 1.980469 -23.386719 1.980469 -22.972656 L 1.980469 -4.378906 C 1.980469 -1.304688 4.085938 0.351562 7.097656 0.351562 Z M 7.097656 0.351562 " />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="ml-6 flex items-center">
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
                              onClick={() => signOut({
                                callbackUrl: `${window.location.origin}/`
                              })}
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
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
