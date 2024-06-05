import { navigateTo } from "../Router";
import { fetchApi } from "../helper/fetch-api";

export function RegisterScene() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <form action="" id="form">
      <h1>Register</h1>
      <input type="text"  id="username" placeholder="name" required>
      <input type="email"  id="email" placeholder="email" required>
      <input type="date"  id="date" required>
      <input type="password" placeholder="password" id="password" required>
      <input type="submit" value="register">
      <button type="button" id="login">login</button> 
    </form>
  
  `
  const login = document.getElementById('login');
  login.addEventListener('click', () => {
    navigateTo('/login');
  })
  const form = document.getElementById('form');
  form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const $username = document.getElementById('username').value;
    const $email = document.getElementById('email').value;
    const $date = document.getElementById('date').value;
    const $password = document.getElementById('password').value;
    if(!$username || !$email || !$date || !$password) {
      alert('All fields are required');
      return
    }
    const users = await fetchApi("http://localhost:3000/users")
    const userExist = users.find(user => user.email === $email.value)
    if(userExist) {
      alert('User already exist')
      return
    }
    

    const userCreated = await fetchApi("http://localhost:3000/users",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: $username,
        email: $email,
        birthdate: $date,
        password: $password,
        roleId: 2
      })

    })
   

    if(userCreated) {
      alert('User created')
    } else {
      alert('User not created')
    }
    
  })
}