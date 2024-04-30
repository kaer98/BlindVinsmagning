import React, { useState, useRef, useCallback } from 'react';
import Tasting from './Tasting';

interface ListOfTastingsProps {
    Title: string;
    Date: string;
}

const TastingCard = ({ Title, Date }: ListOfTastingsProps) => {
    const [joinedStatus, setJoinedStatus] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <div className="card-body items-center text-center">
                <h2 className="card-title">{Title}</h2>
                <p>Dato for Smagning: {Date}</p>

                <div className="card-actions justify-center flex flex-col">
                    {!joinedStatus ? (
                        <button onClick={ChangeStatus} className="btn btn-success w-32">
                            Deltag Nu!
                        </button>
                    ) : (
                        <button onClick={ChangeStatus} className="btn btn-warning w-32">
                            Anuller Deltagelse
                        </button>
                    )}

                    <button className="btn btn-primary w-32" onClick={openModal}>
                        Se Information
                    </button>
                </div>
            </div>

            {joinedStatus ? <p>Du deltager! ✅</p> : <p>Vært: Adil</p>}

            {/* Modal med ref */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl  bg-neutral">
         
                    <Tasting Title={Title} Date={Date}/>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default TastingCard;
