import { navigateTo } from "../../../Router";
import { fetchApi } from "../../../helper/fetch-api";

export function FlightCreateScene() {
  const pageContent = `
    
     <form action="">
     <h2>CREAR VUELO</h2>
    <div>
      <label for="number">flight Number</label>
      <input type="text" id="number">
    </div>
    <div>
      <label for="origin">Origin</label>
      <input type="text" id="origin">
    </div>
    <div>
      <label for="date-salida">destination</label>
      <input type="text" id="destination">
    </div>
    <div>
      <label for="date-salida">departure</label>
      <input type="date" id="date-salida">
    </div>
    <div>
      <label for="date-arrived">Arrived</label>
      <input type="date" id="date-arrived">
    </div>
    <div>
      <label for="capacity">Capacity</label>
      <input type="text" id="capacity" placeholder="capacity">
    </div>
    <input type="submit" id="submit" value="create">

  </form>
    
    
    `
    const logic = async () => {
      const form = document.querySelector('form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const $number = document.getElementById('number').value;
        const $origin = document.getElementById('origin').value;
        const $destination = document.getElementById('destination').value;
        const $dateSalida = document.getElementById('date-salida').value;
        const $dateArrived = document.getElementById('date-arrived').value;
        const $capacity = document.getElementById('capacity').value;
        if(!$dateSalida || !$dateArrived || !$capacity) {
          alert('All fields are required');
          return
        }
        await fetchApi('http://localhost:3000/flights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            number: $number,
            origin: $origin,
            destination: $destination,
            departure: $dateSalida,
            arrival: $dateArrived,
            capacity: parseInt($capacity) 

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