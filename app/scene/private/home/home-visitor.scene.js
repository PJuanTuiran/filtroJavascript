import { navigateTo } from "../../../Router";
import { fetchApi } from "../../../helper/fetch-api";

export function HomeSceneVisitor ()  {
  const pageContent = `
    <h1>Vuelos Actuales</h1>
    <section>
      <div id="flights">
     
      </div>
      
    </section>
    
    `
    const logic = async () =>{
      const contentFlights = document.getElementById('flights');
      
      const flights = await fetchApi("http://localhost:3000/flights")
      
      let fragment = ""
      flights.forEach(flights => {
        fragment += `
          <p>NUMERO DE VUELO <span id="flights-number">${flights.number}</span></p>
          <p>ORIGEN <span id="origin">${flights.origin}</span></p>
          <p>DESTINO <span id="destination">${flights.destination}</span></p>
          <p>FECHA DE SALIDA <span class="departure">${flights.departure}</span></p>
          <p>FECHA DE LLEGADA <span id="arrival">${flights.arrival}</span></p>
          <p>ASIENTOS <span id="seats">${flights.capacity}</span></p>
          <button class="reserve" data-id= ${flights.id}>reservar</button>
          
          
        `
      });
      contentFlights.innerHTML = fragment
      const departure = document.querySelector('.departure');
      const reserveBtns = document.querySelectorAll('.reserve');
      reserveBtns.forEach(reserveBtn => {
        reserveBtn.addEventListener('click', async(e) => {
          
          if (confirm('¿Deseas reservar este vuelo?')){
            await fetchApi(`http://localhost:3000/bookings`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                flightId: reserveBtn.getAttribute('data-id'),
                userId: localStorage.getItem('user'),
                bookingDate: departure.value
              })
            })

            const flights = await fetchApi(`http://localhost:3000/flights/${reserveBtn.getAttribute('data-id')}`)
             await fetchApi(`http://localhost:3000/flights/${reserveBtn.getAttribute('data-id')}`, {
              method: 'PATCH' ,
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                capacity: flights.capacity - 1
              })
            })
            navigateTo('/dashboard/visitor')
            console.log(flights)
          }
          
            
          })
        })
        

      
    }
    return {
      pageContent,
      logic
    }
  }