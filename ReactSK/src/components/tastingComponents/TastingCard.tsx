import React, { useState, useRef, useCallback, useEffect } from 'react';
import Tasting from './Tasting';
import { useAuthContext } from '../../context/AuthContext';

interface ListOfTastingsProps {
    Title: string;
    Date: string;
    Visibility: string;
    HostId: number;
}

const TastingCard = ({ Title, Date, Visibility, HostId }: ListOfTastingsProps) => {
    const [joinedStatus, setJoinedStatus] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [isAuthUserTasting, setIsAuthUserTasting] = useState<boolean>(false);


    const { authUser } = useAuthContext();

    useEffect(() => {
        // Ensure `authUser` is defined and has an `id` property
        if (authUser?.id === HostId) {
            setIsAuthUserTasting(true);
        }
    }, [authUser, HostId]); // Add dependencies to ensure effect re-runs when relevant values change


    // Create a ref for the modal
    const modalRef = useRef<HTMLDialogElement | null>(null);

    // Functions to open and close the modal
    const openModal = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }, []);

    const closeModal = useCallback(() => {
        if (modalRef.current) {
            modalRef.current.close();
        }
    }, []);

    const ChangeStatus = () => {
        setJoinedStatus(!joinedStatus);
    };

    return (
        <div className="card w-96 bg-neutral text-neutral-content">

            {/* Auth User Tasting */}

            < div className="card-body items-center text-center">
                <h2 className="card-title">{Title}</h2>

                <p>Dato for Smagning: {Date}</p>



                <div className="card-actions justify-center flex flex-col">

                    {isAuthUserTasting ? <div>

                        <div>
                            <h1>Dette er din smagning. Redigér oplysningerne eller slet den.</h1>
                            <button className="btn btn-error w-32  " >
                                Slet
                            </button>

                            <button className="btn btn-warning w-32" >
                                Rediger
                            </button>
                            <button className="btn btn-primary w-32" onClick={openModal}>
                                Se Information
                            </button>
                        </div>

                    </div> : (<div>

                        {!joinedStatus ? (
                            <button onClick={ChangeStatus} className="btn btn-success w-32">
                                Deltag Nu!
                            </button>
                        ) : (
                            <button onClick={ChangeStatus} className="btn btn-warning w-32">
                                Anuller Deltagelse
                            </button>
                        )}
                    </div>)}

                    {isAuthUserTasting ? null :
                        <button className="btn btn-primary w-32" onClick={openModal}>
                            Se Information
                        </button>
                    }
                </div>
            </div>


            {joinedStatus ? <p>Du deltager! ✅</p> : <p>Smagningstype: {Visibility}</p>}


            {/* Modal med ref */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl  bg-neutral">

                    <Tasting Title={Title} Date={Date} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div >
    );
};

export default TastingCard;
