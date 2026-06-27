import iconClient from "../assets/icon-client.svg";
import iconMyCalls from "../assets/icon-myCalls.svg";
import iconNewCall from "../assets/icon-newCall.svg";
import iconServices from "../assets/icon-services.svg";
import iconTechnical from "../assets/icon-technical.svg";

export const menu = {
  CLIENT: [
    {
      title: "Meus chamados",
      path: "/",
      icon: iconMyCalls,
    },
    {
      title: "Criar chamado",
      path: "/novo-chamado",
      icon: iconNewCall,
    },
  ],

  ADMIN: [
    {
      title: "Chamados",
      path: "/",
      icon: iconMyCalls,
    },
    {
      title: "Técnicos",
      path: "/tecnicos",
      icon: iconTechnical,
    },
    {
      title: "Usuários",
      path: "/client",
      icon: iconClient,
    },
    {
      title: "Serviços",
      path: "/services",
      icon: iconServices,
    },
  ],
  TECHNICAL: [
    {
      title: "Meus chamados",
      path: "/",
      icon: iconMyCalls,
    },
  ],
};
