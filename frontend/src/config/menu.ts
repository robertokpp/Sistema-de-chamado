import iconClient from "../assets/icon-client.svg";
import iconMyCalls from "../assets/icon-myCalls.svg";
import iconNewCall from "../assets/icon-newCall.svg";
import iconServices from "../assets/icon-services.svg";
import iconTechnical from "../assets/icon-technical.svg";

export const menu = {
  CLIENT: [
    {
      title: "Meus chamados",
      path: "/chamados",
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
      path: "/admin/chamados",
      icon: iconMyCalls,
    },
    {
      title: "Técnicos",
      path: "/admin/tecnicos",
      icon: iconTechnical,
    },
    {
      title: "Usuários",
      path: "/admin/client",
      icon: iconClient,
    },
    {
      title: "Serviços",
      path: "/admin/services",
      icon: iconServices,
    },
  ],
  TECHNICAL: [
    {
      title: "Meus chamados",
      path: "technical/chamados",
      icon: iconMyCalls,
    },
  ],
};
