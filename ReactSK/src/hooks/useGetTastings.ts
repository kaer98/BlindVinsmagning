import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


interface Tasting {
  id: number;
  name: string;
  visibility: string;
  date: string; 
  hostid: number;
  winnerId: number | null;
  finished: boolean;
}

interface Participants {

//Participant info, måske skal der ændres i Backenden (API, Serveren) 
}


const useGetTastings = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [participants, setParticipants] = useState<Participants[]>([]);

  useEffect(() => {
    const getTastings = async () => {
      setLoading(true); 
      try {
        const res = await fetch('https://vin.jazper.dk/api/tastings'); 
        const data = await res.json();

        if (res.ok) {
          setTastings(data);
        } else {
          throw new Error(data.message || 'Failed to fetch tastings');
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error('An unknown error occurred');
        }
      } finally {
        setLoading(false)
      }
    };

    getTastings()
  }, [])
  return { loading, tastings };
};

export default useGetTastings;
