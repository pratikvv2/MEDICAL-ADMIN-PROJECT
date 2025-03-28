/* eslint-disable react/prop-types */
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ADMIN_STATUS, COLLECTIONS } from '@/utils/constants';
import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE } from '@/firebase.config';
import { useState } from 'react';

const MainModal = ({
    isModalOpen,
    setIsModalOpen,
    items
}) => {


    const [status, setStatus] = useState("");


    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleUpdate = () => {
        updateDoc(doc(FIRESTORE, COLLECTIONS.bookings, items.id), {
            status
        })
            .then(() => {
                alert(`Updated ${items.username}`)
            }).catch((err) => {
                alert("Some error occured");
                console.log(err);

            }).finally(() => {
                setTimeout(() => {
                    setIsModalOpen(false);
                });
            })
    }

    return (
        <>

            <Dialog
                open={isModalOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Update ${items.username}'s Status`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <p>Date of Appointment: <b>{items.bookingDate}</b></p>
                        <p>Timing: <b>{items.bookingTime}</b></p>
                        <p className='mb-3'>Current status: <b>{items.status}</b></p>

                        <b className='mt-4'>Update Status</b>
                        <select className='form-control form-control-sm' name="status" onChange={e => setStatus(e.target.value)}>
                            <option>Select From Below</option>
                            {ADMIN_STATUS.map(item => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
                        <button onClick={handleUpdate} className='btn btn-primary my-3'>Update</button>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>

                </DialogActions>
            </Dialog>
        </>
    )
}

export default MainModal