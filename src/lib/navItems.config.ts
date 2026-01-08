/* eslint-disable @typescript-eslint/no-unused-expressions */
("");
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

/**
 * COMMON NAV (ALL ROLES)
 */
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Key",
          roles: ["TOURIST"],
        },
      ],
    },
  ];
};

/**
 * GUIDE NAV
 */
export const guideNavItems: NavSection[] = [
  {
    title: "Tour Management",
    items: [
      {
        title: "Bookings",
        href: "/guide/dashboard/bookings",
        icon: "Calendar",
        badge: "3",
        roles: ["GUIDE"],
      },
      {
        title: "My Listings",
        href: "/guide/dashboard/listings",
        icon: "List",
        roles: ["GUIDE"],
      },
      // {
      //   title: "My Tours",
      //   href: "/guide/dashboard/tours",
      //   icon: "Map",
      //   roles: ["GUIDE"],
      // },
    ],
  },
];

/**
 * TOURIST NAV
 */
export const touristNavItems: NavSection[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "Calendar",
        roles: ["TOURIST"],
      },
      {
        title: "Book a Tour",
        href: "/explore-tours",
        icon: "Search",
        roles: ["TOURIST"],
      },
    ],
  },
  {
    title: "My Activity",
    items: [
      // {
      //   title: "Saved Tours",
      //   href: "/dashboard/saved-tours",
      //   icon: "Heart",
      //   roles: ["TOURIST"],
      // },
      {
        title: "Reviews",
        href: "/dashboard/reviews",
        icon: "Star",
        roles: ["TOURIST"],
      },
    ],
  },
];

/**
 * ADMIN NAV
 */
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Admins",
        href: "/admin/dashboard/admins-management",
        icon: "Shield",
        roles: ["ADMIN"],
      },
      {
        title: "Guides",
        href: "/admin/dashboard/guides-management",
        icon: "UserCheck",
        roles: ["ADMIN"],
      },
      {
        title: "Tourists",
        href: "/admin/dashboard/tourists-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Listings Management",
    items: [
      // {
      //   title: "Bookings",
      //   href: "/admin/dashboard/bookings-management",
      //   icon: "CalendarDays",
      //   roles: ["ADMIN"],
      // },
      {
        title: "Listings",
        href: "/admin/dashboard/listings-management",
        icon: "CalendarDays",
        roles: ["ADMIN"],
      },
      // {
      //   title: "Payments",
      //   href: "/admin/dashboard/payments-management",
      //   icon: "CreditCard",
      //   roles: ["ADMIN"],
      // },
      {
        title: "Categories",
        href: "/admin/dashboard/categories-management",
        icon: "Layers",
        roles: ["ADMIN"],
      },
    ],
  },
];

/**
 * ROLE SWITCHER
 */
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "GUIDE":
      return [...commonNavItems, ...guideNavItems];
    case "TOURIST":
      return [...commonNavItems, ...touristNavItems];
    default:
      return [];
  }
};
