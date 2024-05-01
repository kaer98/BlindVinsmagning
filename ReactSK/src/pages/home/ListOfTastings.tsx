import React from 'react';
import TastingCard from '../../components/tastingComponents/TastingCard';
import useGetTastings from '../../hooks/useGetTastings';
import { useAuthContext } from '../../context/AuthContext';



const ListOfTastings: React.FC = () => {

  const { authUser } = useAuthContext();
  const { loading, tastings } = useGetTastings();

  if (loading) {
    // Display a loading state until the data is fetched
    return <div>Loading...</div>;
  }

  if (!tastings || tastings.length === 0) {
    // Handle the case where there's no data or it's empty
    return <div>No tastings found</div>;
  }

  return (
    <div className="flex flex-wrap justify-center items-start gap-8">
      {tastings.map((tasting) => (

        
        <TastingCard
          key={tasting.id} // Ensure you use a unique key for each item in the list
          Title={tasting.name} // Access the 'name' property
          Date={tasting.date} // Access the 'date' property
          Visibility={tasting.visibility}
          HostId={tasting.hostid}
        />

       
      ))}
    </div>
  );
};

export default ListOfTastings;
