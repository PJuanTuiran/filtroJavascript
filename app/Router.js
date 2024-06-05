import { privateLoyoutComponent } from "./components/private-loyout.component";
import { routes } from "./routes";

export function Router() {
  const path = window.location.pathname;
  const publicRoute = routes.public.find(route => route.path === path);
  const privateRoute = routes.private.find(route => route.path === path);
  if(path === '/' || path === '/login' || path === '/register') {
    if(localStorage.getItem('token')) {
      navigateTo('/dashboard');
      return
    }
    
  }
  if(path === '/') {
    if(!localStorage.getItem('token')) {
      navigateTo('/login');
      return
    }
    
  }
  if(privateRoute) {
    if(localStorage.getItem('token')) {
      const {pageContent, logic} = privateRoute.scene();
      privateLoyoutComponent(pageContent, logic);
      return
    }
    navigateTo('/login');
    return
  }
  if(publicRoute) {
    publicRoute.scene();
    return
  }

  navigateTo('/no-found');

}
export function navigateTo(path) {
  window.history.pushState({}, '', window.location.origin + path);
  Router();
}