import "./AllUsers.scss"
import { COLLECTIONS } from "@/utils/constants"
import { getAllDocsFromCollection } from "@/utils/firebaseFunctions"
import { useEffect, useState } from "react"



const AllUsers = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        getAllDocsFromCollection(COLLECTIONS.users)
            .then(data => setUsersList(data))
            .catch(err => console.log(err))
    }, []);

    return (
        <div className="container-fluid">
            <h4 className="title mt-3">All Users Registered</h4>
            {usersList.length == 0 ? (
                <img className="not-found" src="/notFound.jpg" alt="" />
            ) : (
                <div className="d-flex flex-wrap my-3 gap-3">
                    {usersList?.map(item => (
                        <div key={item.id} className="card p-2 card-wrapper">
                            <div className="card-body">
                                <p className="card-text">
                                    <i className="bi bi-file-person-fill me-3 text-primary"></i>
                                    {item.displayName} <small>(provider)</small>

                                </p>
                                <p className="card-text">
                                    <i className="bi bi-file-person me-3 text-info"></i>
                                    {item.username} <small>(by user)</small>

                                </p>
                                <p className="card-text">
                                    <i className="bi bi-envelope-at-fill me-3 text-info"></i>
                                    {item.email}

                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default AllUsers