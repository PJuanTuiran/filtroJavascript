import { navigateTo } from "../../../Router";
import { fetchApi } from "../../../helper/fetch-api"

export function FlightsEditScene() {
  const pageContent = `
   
     <form action="">
     <h2>EDITAR VUELO</h2>
    <div>
      <label for="date-salida"></label>
      <input type="date" id="date-salida">
    </div>
    <div>
      <label for="date-arrived"></label>
      <input type="date" id="date-arrived">
    </div>
    <div>
      <input type="capacity" id="capacity" placeholder="capacity">
    </div>
    <input type="submit" id="submit" value="edit">

  </form>
    
    
    `
    const logic = async () => {
      const params = new URLSearchParams(window.location.search).get("idFlight");
      console.log(params)
      const form = document.querySelector('form');
      const infoFlights = await fetchApi(`http://localhost:3000/flights/${params}`)
      console.log(infoFlights)
      const dateSalida = document.getElementById('date-salida');
      const dateArrived = document.getElementById('date-arrived');
      const capacity = document.getElementById('capacity');
      dateSalida.value = infoFlights.departure
      dateArrived.value = infoFlights.arrival
      capacity.value = infoFlights.capacity

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const $dateSalida = document.getElementById('date-salida').value;
        const $dateArrived = document.getElementById('date-arrived').value;
        const $capacity = document.getElementById('capacity').value;
        if(!$dateSalida || !$dateArrived || !$capacity) {
          alert('All fields are required');
          return
        }
       
        await fetchApi(`http://localhost:3000/flights/${params}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            departure: $dateSalida,
            arrival: $dateArrived,
            capacity: $capacity
          })
        })
        navigateTo('/dashboard')
      })
    }
   return {
     pageContent,
     logic
    }
}