'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  addDays,
  differenceInCalendarDays,
  isWithinInterval,
  parseISO,
  format,
  differenceInDays,
} from 'date-fns';
import ImageGalleryMedium from './ImageGalleryMedium';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Share,
  Heart,
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MarkdownViewer from './MarkdownViewer';
import LikeButton from '../likeButton';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
export default function PlacePageDesktop({ place, onClick, isFavoritePlace }) {
  const {
    id,
    title,
    address,
    description,
    photos,
    price,
    owner,
    maxGuests,
    minimumStay,
    bookingWindows,
  } = place;
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [bookingdays, setBookingDays] = useState(Number(minimumStay));
  // const [isvaidBookingdates, setIsVaidBookingdates] = useState();
  const [isErrorDates, setIsErrorDates] = useState(false);
  const initialFrom = new Date();
  const initialTo = addDays(new Date(), Number(minimumStay));
  let from = initialFrom;
  let to = initialTo;
  const [date, setDate] = useState({
    from: from,
    to: to,
  });
  let totalGuest = 0;
  const placeId = useParams().id;

  function totalNumberOfGuest() {
    totalGuest = adults + children + infants + pets;
    return totalGuest;
  }

  useEffect(() => {
    totalNumberOfGuest();
  }, [adults, children, infants, pets]);

  useEffect(() => {
    if (date?.from instanceof Date && date?.to instanceof Date) {
      // Strip the time part from the dates
      const fromDate = new Date(
        date.from.getFullYear(),
        date.from.getMonth(),
        date.from.getDate(),
      );
      const toDate = new Date(
        date.to.getFullYear(),
        date.to.getMonth(),
        date.to.getDate(),
      );
      // Use differenceInCalendarDays instead of differenceInDays
      const days = differenceInCalendarDays(toDate, fromDate);
      setBookingDays(days);
      if (days < Number(minimumStay)) {
        setIsErrorDates(true);
      } else {
        setIsErrorDates(false);
      }
    }
  }, [date]);

  // add a check that the "from" and "to" cant be the same check the "from" is not less than the current date and the "to" is not less than the "from" . and dont set the dates  if those conditions are met and "from" and "to" dates indivisually

  const handleBooking = async (e) => {
    e.preventDefault();

    const reserve = {
      placeId,
      checkIn: date.from,
      checkOut: date.to,
      guests: totalGuest,
      totalPrice: price * bookingdays,
    };

    try {
      const res = await axios.post('/api/booking', reserve);

      if (res.status === 200) {
        toast('Booking created successfully');
      } else {
        toast('Booking Unsuccessful');
      }

      console.log(res);
    } catch (error) {
      console.log('Error creating booking: ' + error.response.data.message);
    }
  };

  return (
    <section className="max-w-6xl px-10">
      <div className="flex items-center justify-between">
        <h1 className="pt-1 pb-5 text-lg font-semibold lg:text-xl xl:text-2xl">
          {title}
        </h1>
        <div className="flex items-center space-x-8 ">
          <div
            className="  flex cursor-pointer items-center  gap-1.5 text-center"
            onClick={onClick}
          >
            <Heart
              width={20}
              height={20}
              className={`m-2  text-white transition-all duration-200  active:scale-[.8] md:h-7 md:w-7`}
              fill={
                isFavoritePlace === true ? 'rgb(255,56,92)' : 'rgb(0 0 0 / 0.6)'
              }
              focusable="true"
              strokeWidth={1}
            />

            <span className="font-semibold underline ">
              {isFavoritePlace === true ? 'Saved' : 'Save'}
            </span>
          </div>
          <button
            className=" text-centerr flex items-center  gap-1.5 "
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    url: window.location.href,
                  })
                  .catch((error) => alert('Something went wrong '));
              } else {
                alert('Web Share API is not supported in your browser');
              }
            }}
          >
            <Share size={20} />

            <span className="font-semibold underline ">Share</span>
          </button>
        </div>
      </div>
      <ImageGalleryMedium
        images={photos}
        id={id}
        isFavoritePlace={isFavoritePlace}
        onClick={onClick}
      />
      <div className="py-5">
        <div className="flex flex-col space-y-1">
          <span className="text-base font-medium xl:text-lg">{address}</span>
          <span className="text-sm font-medium">
            <span>{maxGuests} guests</span> &#183; 2 bedrooms &#183; 2 beds
            &#183; 2 bathrooms
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-10 xl:gap-16">
        <div className="w-full col-span-3 ">
          <Separator className="w-full " />
          <div className="flex items-center py-3 space-x-5">
            <Avatar>
              <AvatarImage
                src={owner?.image}
                className="object-cover w-full h-full"
              />
              <AvatarFallback>
                {owner?.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-medium">
              Hosted By {owner?.name.split(' ', 1)}
            </span>
          </div>
          <Separator className="" />
          <div className="pt-3">
            <span className="pb-1 text-xl font-semibold">
              What this place offers
            </span>
            <div className="grid grid-cols-2 gap-2 pt-2 ">
              <span className="flex items-center gap-2 line-through text-light">
                <img src="/pictures/amanities/wifi.svg" alt="" width={32} />
                Wifi
              </span>
              <span className="flex items-center gap-2 text-light">
                <img src="/pictures/amanities/kitchen.svg" alt="" width={32} />
                Kitchen
              </span>
              <span className="flex items-center gap-2 text-light">
                <img
                  src="/pictures/amanities/free-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Free parking on premises
              </span>
              <span className="flex items-center gap-2 line-through text-light">
                <img
                  src="/pictures/amanities/paid-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Paid parking on premises
              </span>
              <span className="flex items-center gap-2 text-light">
                <img
                  src="/pictures/amanities/air-conditioning.svg"
                  alt=""
                  width={32}
                />
                Air conditioning
              </span>
              <span className="flex items-center gap-2 text-light">
                <img src="/pictures/amanities/kitchen.svg" alt="" width={32} />
                Kitchen
              </span>
              <span className="flex items-center gap-2 text-light">
                <img
                  src="/pictures/amanities/free-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Free parking on premises
              </span>
              <span className="flex items-center gap-2 line-through text-light">
                <img
                  src="/pictures/amanities/paid-parking-on-premises.svg"
                  alt=""
                  width={32}
                />
                Paid parking on premises
              </span>
            </div>
            <Dialog>
              <DialogTrigger className="w-full">
                <div className="mt-5 w-max rounded-lg border border-black bg-background px-5 py-2 text-base duration-200 hover:bg-accent hover:text-accent-foreground active:scale-[99%]">
                  Show all amenities
                </div>
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> What this place offers</DialogTitle>
                  <DialogDescription className="p-5 ">
                    <div className="flex flex-col gap-2 pt-2 ">
                      <span className="flex items-center gap-2 line-through text-light">
                        <img
                          src="/pictures/amanities/wifi.svg"
                          alt=""
                          width={40}
                        />
                        Wifi
                      </span>
                      <span className="flex items-center gap-2 text-light">
                        <img
                          src="/pictures/amanities/kitchen.svg"
                          alt=""
                          width={40}
                        />
                        Kitchen
                      </span>
                      <span className="flex items-center gap-2 text-light">
                        <img
                          src="/pictures/amanities/free-parking-on-premises.svg"
                          alt=""
                          width={40}
                        />
                        Free parking on premises
                      </span>
                      <span className="flex items-center gap-2 line-through text-light">
                        <img
                          src="/pictures/amanities/paid-parking-on-premises.svg"
                          alt=""
                          width={40}
                        />
                        Paid parking on premises
                      </span>
                      <span className="flex items-center gap-2 text-light">
                        <img
                          src="/pictures/amanities/air-conditioning.svg"
                          alt=""
                          width={40}
                        />
                        Air conditioning
                      </span>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <Separator className="my-4 py-[1px]" />
          <div className="">
            <span className="pb-1 text-xl font-semibold">About this Place</span>
            <div className="text-light">
              <MarkdownViewer
                markdown={
                  description && description.length > 300
                    ? `${description.slice(0, 300)}...`
                    : description
                }
              />
            </div>

            <Dialog>
              <DialogTrigger className="w-full text-light">
                {description && description.length > 300 ? (
                  <div className="gap-.5 mt-2 flex items-center font-medium underline">
                    Shoe More <ChevronRight strokeWidth={1.25} size={20} />
                  </div>
                ) : null}
              </DialogTrigger>
              <DialogContent className=" h-full max-h-[80vh] w-fit min-w-[70vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> About this place</DialogTitle>
                  <DialogDescription className="p-5 ">
                    <ScrollArea className="h-[65vh] w-full text-pretty text-base leading-7 text-black ">
                      <MarkdownViewer markdown={description} />
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="w-full col-span-2">
          <div className="p-5 border border-gray-200 shadow-md rounded-xl">
            <div className="py-3 text-xl font-semibold tabular-nums">
              ₹ {price} night
            </div>
            <div className="my-5  rounded-xl border-[2px] border-gray-400">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full rounded-xl">
                  <div className="flex justify-between">
                    <div className="flex flex-col w-full p-3 text-sm text-left border-r-2 border-gray-200">
                      <span className="font-bold capitalize">Check-in</span>
                      <span>
                        {date?.from instanceof Date && !isNaN(date.from)
                          ? format(date.from, 'dd/MM/yyyy')
                          : 'Add Dates '}
                      </span>
                    </div>

                    <Separator
                      orientation="vertical"
                      className="h-[1px]  bg-gray-400"
                    />

                    <div className="flex flex-col w-full p-3 text-sm text-left">
                      <span className="font-bold capitalize">Checkout</span>
                      <span>
                        {date?.to instanceof Date && !isNaN(date.to)
                          ? format(date.to, 'dd/MM/yyyy')
                          : 'Add Dates'}
                      </span>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-3 mr-5 space-y-3 ">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </DropdownMenuContent>
              </DropdownMenu>

              <Separator className="h-[1px]  bg-gray-400" />
              <div className="flex justify-between ">
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full rounded-xl">
                    <div className="flex flex-col w-full p-3 text-sm text-left">
                      <span className="font-bold capitalize">Guests</span>
                      <span>{adults + children + infants + pets} Guest</span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-5 w-[25vw] space-y-3 p-3 ">
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Adults</span>
                          <span className="text-sm font-light">Age 13+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            className="p-2 border rounded-full border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (adults + children < maxGuests) {
                                setAdults(adults + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">
                            {adults}
                          </span>
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (adults > 0) {
                                setAdults(adults - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">
                            Children
                          </span>
                          <span className="text-sm font-light">Ages 2-12</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (adults + children < maxGuests) {
                                setChildren(children + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">
                            {children}
                          </span>
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (children > 0) {
                                setChildren(children - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Infants</span>
                          <span className="text-sm font-light">Under 2</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (infants < 5) {
                                setInfants(infants + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">
                            {infants}
                          </span>
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (infants > 0) {
                                setInfants(infants - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between w-full">
                        <div className="flex flex-col ">
                          <span className="text-base font-medium">Pets</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (pets < 5) {
                                setPets(pets + 1);
                              }
                            }}
                          >
                            <Plus size={14} />
                          </button>
                          <span className="text-base font-light tabular-nums">
                            {pets}
                          </span>
                          <button
                            class="rounded-full border border-input bg-background  p-2 hover:bg-accent hover:text-accent-foreground"
                            onClick={() => {
                              if (pets > 0) {
                                setPets(pets - 1);
                              }
                            }}
                          >
                            <Minus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] font-light">
                      This place has a maximum of 6 guests, not including
                      infants. If you're bringing more than 2 pets, please let
                      your Host know.
                    </div>
                    <DropdownMenuItem className="items-center px-5 text-base text-center border cursor-pointer w-fit border-input">
                      Close
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {!isErrorDates ? (
              <>
                <button
                  className=" w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-lg font-bold text-white shadow-md duration-200 active:scale-[99%] "
                  onClick={handleBooking}
                >
                  Reserve
                </button>
                <div className="pt-2 text-sm font-light text-center">
                  You won't be charged yet
                </div>
              </>
            ) : null}

            <Separator className="my-3 mb-5 h-[1px] bg-gray-400" />
            <div className="flex items-center justify-between pt-2 text-base">
              <span className="font-light underline underline-offset-4">
                {bookingdays < 30
                  ? `₹${price} x ${bookingdays} ${bookingdays > 1 ? 'nights' : 'night'}`
                  : `Total for ${bookingdays} nights`}
              </span>
              <span className="font-medium ">₹{price * bookingdays}</span>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4  h-[1px] bg-gray-400" />

      <div>
        <span className="pb-5 text-2xl font-semibold">Things to know</span>
        <div className="flex justify-between gap-5 mt-5">
          <div className="">
            <span className="text-lg font-medium ">Cancellation policy</span>

            <Dialog>
              <div className="flex items-center justify-between">
                <div className="flex max-w-md flex-col text-left text-[13px]">
                  <span>Free cancellation for 48 hours.</span>
                  <span className="pt-3 text-wrap">
                    Review the full cancellation policy which applies even if
                    you cancel for illness or disruptions caused by COVID-19.
                  </span>
                </div>
              </div>
              <DialogTrigger className="w-full pt-3 text-sm font-semibold text-left underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Cancellation policy</DialogTitle>
                  <span className="pt-1 pb-5 text-sm font-light">
                    Before you book, make sure you're comfortable with this
                    Host's cancellation policy. Keep in mind that Airbnb's
                    Extenuating Circumstances policy doesn't cover cancellations
                    due to illness or travel disruptions caused by COVID-19.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="h-full">
            <span className="text-lg font-medium">House Rules</span>

            <Dialog>
              <div className="flex flex-col space-y-2 text-left text-[13px] ">
                <span>Check-in: 2:00 pm – 10:00 pm</span>
                <span>Checkout before 11:00 am</span>
                <span>6 guests maximum</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-sm font-semibold text-left underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> House rules</DialogTitle>
                  <span className="pt-1 pb-5 text-sm font-light">
                    You'll be staying in someone's home, so please treat it with
                    care and respect.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full  ">
                      Cancellation policy here
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="">
            <span className="text-lg font-medium ">Safety & property</span>
            <Dialog>
              <div className="flex flex-col space-y-2 text-sm text-left ">
                <span>No carbon monoxide alarm</span>
                <span>No smoke alarm</span>
                <span>Security camera/recording device</span>
              </div>
              <DialogTrigger className="w-full pt-3 text-sm font-semibold text-left underline underline-offset-2">
                Show more
              </DialogTrigger>
              <DialogContent className=" w-fit min-w-[50vw] max-w-[80vw] ">
                <DialogHeader>
                  <DialogTitle> Safety & property</DialogTitle>
                  <span className="pt-1 pb-5 text-sm font-light">
                    Avoid surprises by looking over these important details
                    about your Host's property.
                  </span>
                  <DialogDescription className="">
                    <ScrollArea className="h-[30vh] w-full text-black  ">
                      <span className="text-base font-semibold">
                        Safety devices
                      </span>
                    </ScrollArea>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
