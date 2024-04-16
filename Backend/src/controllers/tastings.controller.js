/*
Controller for tasting routen

*/


//GET Request: Hent smagninger ned så deltagere kan se kommende smagninger i appen
export const getTastings = async (request, response) => {
    try {
        const allTastings = await prisma.winetasting.findMany({
            select: {
                id: true,
                name: true,
                date: true,
                hostId: true,
                winnerId: true,
                finished: false
            }
    
        });

        response.json(allTastings);

    } catch {
        console.error('ERROR: Getting WineTasting (getTastings)', error);
        response.status(500).json({ error: 'Intern Server Fejl' });
    }

}

//POST Request: Oprettelse af smagning (Kun for administratorer)
export const createTasting = async (request, response) => {


}

//DELETE Request: Sletning af smagning (Kun for administratorer)
export const deleteTasting = async (request, response) => {


}

//PUT Request: Rediger data i smagning
export const editTasting = async (request, response) => {


}