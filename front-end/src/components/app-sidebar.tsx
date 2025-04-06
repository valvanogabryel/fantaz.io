"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  BookText,
  Bot,
  Building2,
  Command,
  Database,
  Dice5,
  DicesIcon,
  DownloadIcon,
  FileTextIcon,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  Home,
  Map,
  MapPinIcon,
  MapPinned,
  PieChart,
  PlusCircle,
  Settings2,
  Sparkles,
  SquareTerminal,
  Swords,
  Users,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavTools } from "./nav-tools";
import { NavUser } from "./nav-users";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { CampaignSwitcher } from "./char-switcher";

const data = {
  user: {
    name: "gabbro.",
    email: "Gekkiesh",
    avatar: "",
  },
  campaigns: [
    {
      name: "A Fome Invisível",
      logo: MapPinIcon,
    },
    {
      name: "Sinais do Abrolho",
      logo: Building2,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Arquivos",
      url: "#",
      icon: DownloadIcon,
      moreItems: [
        {
          title: "Regras",
          url: "#",
        },
        {
          title: "Bestiário",
          url: "#",
        },
        {
          title: "Itens",
          url: "#",
        },
        {
          title: "Magias",
          url: "#",
        },
        {
          title: "Manual do Jogador",
          url: "#",
        },
      ],
    },
    {
      title: "Personagens",
      url: "/personagens",
      icon: Sparkles,
      moreItems: [
        {
          title: "Kublai",
          url: "#"  
        },
        {
          title: "Ogrimm",
          url: "#"
        },
        {
          title: "Gorgrim",
          url: "#"
        },
      ]
    },
    {
      title: "Configurações",
      url: "/configs",
      icon: Settings2,
    },
  ],
  tools: [
    {
      name: "Encontros Aleatórios",
      url: "#",
      icon: HelpCircle,
    },
    {
      name: "Rolador de Dados",
      url: "/dice-roller",
      icon: DicesIcon,
    },
    {
      name: "Gerador de Mapas",
      url: "#",
      icon: MapPinned,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CampaignSwitcher campaigns={data.campaigns} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavTools tools={data.tools} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}