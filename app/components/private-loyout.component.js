import { navigateTo } from "../Router";

export function privateLoyoutComponent (pageContent, logic) {
  const root = document.getElementById('root');
  root.innerHTML = `
    <nav>
    <h2>Avianca</h2>
    <button id= "logout">loguot</button>
  </nav>
  ${pageContent}
  <footer>
    <h3>Avianca</h3>
    <p>Copyright 2022</p>
  </footer>
  `

  const logout = document.getElementById('logout');
  logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    navigateTo('/login');
  })

  logic()
}
     