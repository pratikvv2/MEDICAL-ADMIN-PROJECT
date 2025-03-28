import './Bookings.scss';
import { COLLECTIONS } from "@/utils/constants";
import { getAllDocsFromCollection } from "@/utils/firebaseFunctions";
import { useEffect, useState } from "react";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import MainModal from '@/components/MainModal/MainModal';


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

    const handleUpdateModal = (item) => {
        setItems(item);
        setIsModalOpen(true);

    }

    return (
        <div className='container-fluid'>
            <h4 className='title mt-3'>All Booked Appointments</h4>
            {bookings.length == 0 ? (
                <img className="not-found" src="/notFound.jpg" alt="" />
            ) : (
                <div className="d-flex my-3 gap-3 flex-wrap">
                    {bookings.map(item => {
                        let user = usersList.filter(user => user.uid === item.uid)[0];
                        let active = new Date(item?.bookingDate) > new Date();

                        let data = {
                            ...item,
                            username: user?.username
                        }

                        return (
                            <div key={item.id} className="card p-2 card-wrapper">
                                <div className="card-body">

                                    <p className="card-text">
                                        <i className="bi bi-file-person-fill me-3 text-primary"></i>
                                        {user?.username}
                                    </p>
                                    <p className="card-text">
                                        <i className="bi bi-calendar3 text-primary me-3"></i>
                                        <span>{item?.bookingDate} <small className='ms-3'>(yyyy-mm-dd)</small></span>
                                    </p>
                                    <p className="card-text">
                                        <i className="bi bi-clock-fill text-info me-3"></i>
                                        <span>{item?.bookingTime}</span>
                                    </p>
                                    <div title={active && item.status !== "Completed" ? "Update Appointment" : "Date is now expired with time"} className={`d-flex justify-content-between ${active ? "" : "text-danger mb-3"}`}>
                                        <span><b>Status:</b> {item?.status}</span>
                                        {active ? (
                                            <IconButton onClick={() => handleUpdateModal(data)}>
                                                <BorderColorIcon sx={{ color: "dodgerblue", cursor: "pointer" }} />
                                            </IconButton>
                                        ) : (
                                            <small>Expired</small>
                                        )}
                                    </div>
                                    <p className="card-text">
                                        <span><b className='me-3'>Contact:</b>{item.contact}</span>
                                    </p>
                                    <div className="addr">
                                        <span><b className='me-3'>Address:</b>{item.address}</span>
                                    </div>


                                </div>
                            </div>
                        )
                    })}
                </div>
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