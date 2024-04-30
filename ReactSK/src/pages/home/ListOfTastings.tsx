import React from 'react'
import TastingCard from '../../components/tastingComponents/TastingCard'


const ListOfTastings = () => {
  return (
<div className='flex flex-wrap justify-center items-start gap-8'>
<TastingCard Title="Adils Smagning 102" Date="01-05-2024" />
<TastingCard Title="Ost og Vin" Date="05-06-2024" />
<TastingCard Title="Vinfest" Date="12-07-2024" />
<TastingCard Title="Dansk Whisky" Date="20-08-2024" />
<TastingCard Title="Gin Workshop" Date="15-09-2024" />
<TastingCard Title="Tequila Aften" Date="10-10-2024" />
<TastingCard Title="Rom Smagning" Date="30-11-2024" />
<TastingCard Title="Champagne Nytår" Date="31-12-2024" />
<TastingCard Title="Kaffe og Likør" Date="14-01-2025" />

</div>

)
}

export default ListOfTastings