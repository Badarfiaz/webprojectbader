"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ShoppingBagIcon,
  HomeIcon,
  EnvelopeIcon,
  UserCircleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

const products = [
  {
    name: "Watches",
    description: "Elegant timepieces for every occasion",
    to: "/item/watches",
    icon: ClockIcon,
  },
  {
    name: "Shoes",
    description: "Stylish footwear for all lifestyles",
    to: "/item/shoes",
    icon: ShoppingBagIcon,
  },
  {
    name: "Phones",
    description: "Cutting-edge mobile technology",
    to: "/item/phones",
    icon: DevicePhoneMobileIcon,
  },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("Guest");
  const { cartCount = 0 } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        const firstName = currentUser.displayName.split(" ")[0];
        setDisplayName(firstName);
      } else {
        setDisplayName("Guest");
      }
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setDisplayName("Guest");
    navigate("/");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">Pk</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
               Pk wear
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 ml-10">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-600 font-medium text-sm hover:bg-gray-50 transition-all flex items-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>

            <Popover className="relative">
              <PopoverButton className="px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-600 font-medium text-sm hover:bg-gray-50 transition-all flex items-center">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Shop
                <ChevronDownIcon className="ml-1 h-4 w-4" />
              </PopoverButton>
              <PopoverPanel className="absolute z-10 mt-2 w-64 rounded-xl shadow-lg bg-white p-2 border border-gray-100">
                {products.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className="group relative flex items-center gap-x-3 rounded-lg p-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-600">
                        {item.name}
                      </div>
                      <p className="mt-1 text-gray-500">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </PopoverPanel>
            </Popover>

            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-indigo-600 font-medium text-sm hover:bg-gray-50 transition-all flex items-center"
            >
              <EnvelopeIcon className="h-5 w-5 mr-2" />
              Contact
            </Link>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingCartIcon className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative">
                <Popover>
                  <PopoverButton className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <UserCircleIcon className="h-5 w-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">
                      {displayName}
                    </span>
                  </PopoverButton>
                  <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 border border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
                    >
                      Sign out
                    </button>
                  </PopoverPanel>
                </Popover>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:shadow-md transition-all flex items-center"
              >
                <UserCircleIcon className="h-5 w-5 mr-2" />
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5 flex items-center">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">EH</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Elite Horizon
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-200">
              <div className="space-y-2 py-6">
                <Disclosure>
                  <DisclosureButton className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <ShoppingBagIcon className="h-5 w-5 mr-2 text-indigo-600" />
                      Shop
                    </div>
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {products.map((item) => (
                      <Link
                        onClick={() => setMobileMenuOpen(false)}
                        key={item.name}
                        to={item.to}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 flex gap-2 items-center transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-indigo-600" />
                        {item.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <HomeIcon className="h-5 w-5 text-indigo-600" />
                  Home
                </Link>
                <Link
                  onClick={() => setMobileMenuOpen(false)}
                  to="/contact"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                  Contact
                </Link>
              </div>

              <div className="py-6">
                {user ? (
                  <>
                    <div className="px-3 py-2.5 text-sm text-gray-500">
                      Signed in as {displayName}
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left rounded-lg px-3 py-2.5 mt-2 text-base font-semibold text-gray-900 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                    >
                      <UserCircleIcon className="h-5 w-5 text-indigo-600" />
                      Sign out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-md transition-all flex items-center gap-2 justify-center"
                  >
                    <UserCircleIcon className="h-5 w-5" />
                    Sign in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}