import { navigateTo } from "../Router";
import { fetchApi } from "../helper/fetch-api";


export function LoginScene() {
  const root = document.getElementById('root');
  root.innerHTML =`
   <form action="" id="form">
    <h1>Login</h1>
    <input type="email"  id="email" placeholder="email" required>
    <input type="password" placeholder="password" id="password" required>
    <input type="submit" value="login">

    <button type="button" id="register">register</button>
  </form>
  `;

  const register = document.getElementById('register');
  register.addEventListener('click', () => {
    navigateTo('/register');
  })
  const form = document.getElementById('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const $email = document.getElementById('email').value;
    const $password = document.getElementById('password').value;
    if(!$email && !$password) {
      alert('Please fill in all fields');
      return;
    }
    const user = await fetchApi("http://localhost:3000/users")
    console.log(user)
    const userFound = user.find(user => user.email === $email && user.password === $password);
    console.log(userFound)
    if(userFound.roleId === 1) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      localStorage.setItem('user', userFound.id);

      alert('Login success');
      navigateTo('/dashboard');
      return;
    }
    if(userFound.roleId === 2) {
      const token = Math.random().toString(36).substring(2);
      localStorage.setItem('token', token);
      localStorage.setItem('user', userFound.id);
      alert('Login success');
      navigateTo('/dashboard/visitor');
      return;
    }




  })
}
