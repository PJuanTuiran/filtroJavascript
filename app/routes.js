import { LoginScene } from "./scene/login.scene";
import { NoFoundScene } from "./scene/no-found";
import { FlightCreateScene } from "./scene/private/flights-create.js/flights-create.scene";
import { FlightsEditScene } from "./scene/private/flights-edit/flights-edit";
import { HomeSceneVisitor } from "./scene/private/home/home-visitor.scene";
import { HomeScene } from "./scene/private/home/home.scene";
import { RegisterScene } from "./scene/register.scene";



export const routes = {
  public: [
    {path: "/register", scene: RegisterScene},
    {path: "/login", scene: LoginScene},
    {path: "/no-found", scene: NoFoundScene}
  ],
  private: [
    {path: "/dashboard", scene: HomeScene},
    { path: "/dashboard/flights/edit", scene: FlightsEditScene},
    { path: "/dashboard/flights/create", scene: FlightCreateScene },
    { path: "/dashboard/visitor", scene: HomeSceneVisitor },

  ]
}