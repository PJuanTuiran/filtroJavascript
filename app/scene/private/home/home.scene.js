import { navigateTo } from "../../../Router";
import { fetchApi } from "../../../helper/fetch-api";
import style from "./home.style.css";

export function  HomeScene() {
  const pageContent = `
   <h1>Vuelos Actuales</h1>
  <section class="container">
    <div id="flights" class="${style.container}">
   
    </div>
    <button id="flights-add">create flight</button>
  </section>
  
  `
  const logic = async () =>{
    const contentFlights = document.getElementById('flights');

    const flights = await fetchApi("http://localhost:3000/flights")
    
    let fragment = ""
    flights.forEach(flights => {
      fragment += `
        <div class="${style.card}">
          <p>NUMERO DE VUELO <span id="flights-number">${flights.number}</span></p>
          <p>ORIGEN <span id="origin">${flights.origin}</span></p>
          <p>DESTINO <span id="destination">${flights.destination}</span></p>
          <p>FECHA DE SALIDA <span id="departure">${flights.departure}</span></p>
          <p>FECHA DE LLEGADA <span id="arrival">${flights.arrival}</span></p>
          <p>ASIENTOS <span id="seats">${flights.capacity}</span></p>
          <button class="edit" data-id= ${flights.id}>editar</button>
          <button class="delete" data-id= ${flights.id}>eliminar</button>
        
        
        </div>
        
      `

      
    });
    contentFlights.innerHTML = fragment
    const editBtns = document.querySelectorAll('.edit');
    console.log(editBtns)
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', (e) => {
        navigateTo(`/dashboard/flights/edit?idFlight=${editBtn.getAttribute('data-id')}`)
      })
    })

    const createBtns = document.getElementById('flights-add');
    createBtns.addEventListener('click', () => {
      navigateTo('/dashboard/flights/create')
    })

    const deleteBtns = document.querySelectorAll('.delete');
    deleteBtns.forEach(deleteBtn => {
      deleteBtn.addEventListener('click', async (e) => {
        const id = deleteBtn.getAttribute('data-id');
        await fetchApi(`http://localhost:3000/flights/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        navigateTo('/dashboard')
      })
    })




  }
  return {
    pageContent,
    logic
  }
}