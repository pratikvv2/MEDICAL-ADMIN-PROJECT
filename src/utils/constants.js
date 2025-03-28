export const ROUTES = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Bookings",
        path: "/bookings"
    },
    {
        name: "Manage Nurses",
        path: "/manage-nurses"
    },
    {
        name: "All Users",
        path: "/all-users"
    }
];

export const COLLECTIONS = {
    bookings: "bookingDetails",
    users: "userDetails",
}

export const USER_STATUS = [
    "Pending",
    "Canceled"
]


export const ADMIN_STATUS = [
    "Approved",
    "Assigned Nurse",
    "Rejected",
    "Completed"
]