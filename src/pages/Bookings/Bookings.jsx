import './Bookings.scss';
import { COLLECTIONS } from "@/utils/constants";
import { getAllDocsFromCollection } from "@/utils/firebaseFunctions";
import { Fragment, useEffect, useState } from "react";
// import BorderColorIcon from '@mui/icons-material/BorderColor';
// import { IconButton } from '@mui/material';
import MainModal from '@/components/MainModal/MainModal';
import BookingCards from '@/components/BookingCards/BookingCards';


const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState({});
    useEffect(() => {
        getAllDocsFromCollection(COLLECTIONS.bookings)
            .then(data => setBookings(data))
            .catch(err => console.log(err))

        getAllDocsFromCollection(COLLECTIONS.users)
            .then(data => setUsersList(data))
            .catch(err => console.log(err))
    }, ['', isModalOpen]);



    return (
        <div className='container-fluid'>
            <h4 className='title mt-3'>All Booked Appointments</h4>
            {bookings.length == 0 ? (
                <img className="not-found" src="/notFound.jpg" alt="" />
            ) : (
                <Fragment>
                    <small>All dates are in (yyyy-mm-dd) format</small>
                    <p className='mt-2'><b>Upcoming</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => new Date(item?.bookingDate) > new Date()).map(item =>
                            <BookingCards
                                setItems={setItems}
                                setIsModalOpen={setIsModalOpen}
                                key={item.id}
                                item={item}
                                usersList={usersList}

                            />)}
                    </div>

                    <p className='mt-2'><b>Completed</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => item?.status == "Completed")
                            .map(item =>
                                <BookingCards
                                    setItems={setItems}
                                    setIsModalOpen={setIsModalOpen}
                                    key={item.id}
                                    item={item}
                                    usersList={usersList}
                                />)}
                    </div>

                    <p className='mt-2'><b>Expired</b></p>
                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        {bookings.filter(item => new Date(item?.bookingDate) < new Date()).map(item =>
                            <BookingCards
                                setItems={setItems}
                                setIsModalOpen={setIsModalOpen}
                                key={item.id}
                                item={item}
                                usersList={usersList}
                            />)}
                    </div>
                </Fragment>

            )}
            <MainModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                items={items}
            />

        </div>
    )
}

export default Bookings