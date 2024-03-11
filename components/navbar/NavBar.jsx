import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from '../ModeToggle';
import Sort from '../sort/Sort';
import UserMenu from '../usermenu/UserMenu';
import SearchBarTriggerDesktop from '../searchbar/SearchBarTriggerDesktop';
import SearchBarMobile from '../searchbar/SearchBarMobile';
import CatagoryWithSort from '../places/placecard/catagory/CatagoryWithSort';
export default function NavBar() {
  return (
    <>
      <header className="sticky top-0 mx-auto flex  w-full flex-col items-center bg-white dark:bg-black">
        <nav className="max-w-screen-xl items-center flex h-full w-full justify-between px-2 py-5">
          <Link
            href="/"
            className="hidden items-center space-x-2 text-xl font-bold md:flex  "
          >
            <Image src="/logo_small.svg" alt="Nestly" width={40} height={20} />
            <h1>Nestly</h1>
          </Link>
          <div className="w-full md:w-auto">
            <div className="hidden md:flex">
              <SearchBarTriggerDesktop />
            </div>
            <div className="ml-2 md:hidden">
              <SearchBarMobile />
            </div>
          </div>
          {/* <ModeToggle /> */}
          <div className="ml-2 md:hidden">
            <Sort />
          </div>
          <div className="hidden md:flex">
            <UserMenu />
          </div>
        </nav>
        {/* <div class="visible px-4">
          <div class="false mx-auto mt-2 hidden max-w-[850px] rounded-full border border-gray-200 bg-white duration-300 md:flex">
            <form
              action="/search"
              class="grid flex-grow grid-cols-[0.8fr,0.7fr,0.7fr,auto] lg:grid-cols-[1fr,0.7fr,0.7fr,auto]"
            >
              <span
                role="button"
                tabindex="0"
                class="relative flex items-center rounded-full hover:bg-gray-200 hover:bg-opacity-40"
              >
                <div class="undefined flex flex-grow flex-col pl-7 pr-3 text-left">
                  <span class="text-xs font-bold tracking-wider text-gray-500">
                    Location
                  </span>
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    class="w-full truncate bg-transparent text-sm text-gray-500 placeholder-gray-300 outline-none"
                    value="india"
                  />
                </div>
                <div class="flex h-8 items-center border-r border-gray-200">
                  <div
                    role="button"
                    tabindex="0"
                    class="flex items-center pr-3 opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 rounded-full bg-gray-200 bg-opacity-60 p-1 hover:bg-opacity-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="mt-16 hidden">
                  <div class="shadow-arround-bold absolute left-0 mt-3 rounded-3xl bg-white px-8 py-4">
                    <div class="py-4">
                      <h2 class="mb-4 text-xs font-bold">
                        GO ANYWHERE, ANYTIME
                      </h2>
                      <button class="flex w-[436px] justify-between rounded-full border border-gray-200 px-6 py-4 text-primary shadow-md">
                        <span class="font-bold">I'm flexible</span>{' '}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          class="h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </span>
              <span
                role="button"
                tabindex="0"
                class="undefined flex items-center rounded-full hover:bg-gray-200 hover:bg-opacity-40"
              >
                <div class="undefined flex flex-grow flex-col pl-7 pr-3 text-left">
                  <span class="text-xs font-bold tracking-wider text-gray-500">
                    Check in
                  </span>
                  <span class="max-w-[105px] truncate text-sm text-gray-300 lg:max-w-none">
                    Mar 16
                  </span>
                </div>
                <div class="flex h-8 items-center border-r border-gray-200">
                  <div
                    role="button"
                    tabindex="0"
                    class="flex items-center pr-3 opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 rounded-full bg-gray-200 bg-opacity-60 p-1 hover:bg-opacity-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="mt-16 hidden">
                  <div class="searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] shadow-arround-bold absolute left-4 right-4 mt-3 rounded-3xl bg-white px-8 py-4"></div>
                </div>
              </span>
              <span
                role="button"
                tabindex="0"
                class="undefined flex items-center rounded-full hover:bg-gray-200 hover:bg-opacity-40"
              >
                <div class="undefined flex flex-grow flex-col pl-7 pr-3 text-left">
                  <span class="text-xs font-bold tracking-wider text-gray-500">
                    Check out
                  </span>
                  <span class="max-w-[105px] truncate text-sm text-gray-300 lg:max-w-none">
                    Apr 23
                  </span>
                </div>
                <div class="flex h-8 items-center border-r border-gray-200">
                  <div
                    role="button"
                    tabindex="0"
                    class="flex items-center pr-3 opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 rounded-full bg-gray-200 bg-opacity-60 p-1 hover:bg-opacity-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div class="mt-16 hidden">
                  <div class="searchbar:left-auto searchbar:right-1/2 searchbar:translate-x-1/2 searchbar:w-[850px] shadow-arround-bold absolute left-4 right-4 mt-3 rounded-3xl bg-white px-8 py-4"></div>
                </div>
              </span>
              <span
                role="button"
                tabindex="0"
                class="relative flex items-center rounded-full hover:bg-gray-200 hover:bg-opacity-40"
              >
                <div class="flex min-w-[120px] flex-grow flex-col pl-7 pr-3 text-left">
                  <span class="text-xs font-bold tracking-wider text-gray-500">
                    Guests
                  </span>
                  <span class="max-w-[105px] truncate text-sm text-gray-300 lg:max-w-none">
                    1 guest
                  </span>
                </div>
                <div class="false flex h-8 items-center">
                  <div
                    role="button"
                    tabindex="0"
                    class="flex items-center pr-3 opacity-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="h-6 rounded-full bg-gray-200 bg-opacity-60 p-1 hover:bg-opacity-100"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  class="m-2 ml-0 flex h-12 w-12 items-center justify-center rounded-full  bg-primary px-3  hover:saturate-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-5 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span class="ml-2 hidden font-medium text-white">Search</span>
                </button>
                <div class="mt-16 hidden">
                  <div class="shadow-arround-bold absolute right-0 mt-3 w-96 rounded-3xl bg-white px-8 py-4">
                    <div>
                      <div class="flex border-b border-gray-200 border-opacity-70 py-4">
                        <div class="flex-grow">
                          <h2 class="font-medium">Adults</h2>
                          <p class="text-sm leading-4 text-gray-300">
                            Ages 13 or above
                          </p>
                        </div>
                        <div class="flex items-center">
                          <span
                            role="button"
                            tabindex="0"
                            class="false btnDecrease inline-block rounded-full border border-gray-300 border-opacity-70 p-[7px] outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </span>
                          <span class="inline-block w-9 text-center">1</span>
                          <span
                            role="button"
                            tabindex="0"
                            class="false btnIncrease inline-block rounded-full border border-gray-300 border-opacity-70 p-[7px] outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex border-b border-gray-200 border-opacity-70 py-4">
                        <div class="flex-grow">
                          <h2 class="font-medium">Children</h2>
                          <p class="text-sm leading-4 text-gray-300">
                            Ages 2-12
                          </p>
                        </div>
                        <div class="flex items-center">
                          <span
                            role="button"
                            tabindex="0"
                            class="btnDecrease inline-block cursor-not-allowed rounded-full border border-gray-300 border-opacity-70 p-[7px] opacity-40 outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </span>
                          <span class="inline-block w-9 text-center">0</span>
                          <span
                            role="button"
                            tabindex="0"
                            class="false btnIncrease inline-block rounded-full border border-gray-300 border-opacity-70 p-[7px] outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="flex py-4">
                        <div class="flex-grow">
                          <h2 class="font-medium">Infants</h2>
                          <p class="text-sm leading-4 text-gray-300">Under 2</p>
                        </div>
                        <div class="flex items-center">
                          <span
                            role="button"
                            tabindex="0"
                            class="btnDecrease inline-block cursor-not-allowed rounded-full border border-gray-300 border-opacity-70 p-[7px] opacity-40 outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </span>
                          <span class="inline-block w-9 text-center">0</span>
                          <span
                            role="button"
                            tabindex="0"
                            class="false btnIncrease inline-block rounded-full border border-gray-300 border-opacity-70 p-[7px] outline-none duration-300 active:scale-90"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              class="h-4 text-gray-300"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 4v16m8-8H4"
                              ></path>
                            </svg>
                            <span>Search</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </form>
          </div>
        </div> */}
        <div className="max-w-[100vw]  ">
          <CatagoryWithSort />
        </div>
      </header>
    </>
  );
}
