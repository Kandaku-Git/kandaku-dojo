// scripts/contenu-menu.js

window.MENU_ITEMS = [
  {
    type: "item",
    label: "Accueil",
    buttonClass: "menu-item",
    dataSection: "accueil",
  },

  {
    type: "group",
    label: "Techniques",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-techniques",
    submenuClass: "submenu submenu-techniques",
    children: [
      {
        type: "tech-category",
        label: "Zuki Waza",
        techniques: [
          { label: "Oi Zuki", dataTechnique: "Oi_Zuki", dataSection: "techniques" },
          { label: "Gyaku Zuki", dataTechnique: "Gyaku_Zuki", dataSection: "techniques" },
        ],
      },
      {
        type: "tech-category",
        label: "Empi Waza",
        techniques: [
          { label: "Mae Empi", dataTechnique: "Mae_Empi", dataSection: "techniques" },
          { label: "Yoko Empi", dataTechnique: "Yoko_Empi", dataSection: "techniques" },
        ],
      },
      {
        type: "tech-category",
        label: "Geri Waza",
        techniques: [
          { label: "Mae Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
          { label: "Yoko Geri", dataTechnique: "Yoko_Geri", dataSection: "techniques" },
        ],
      },
      {
        type: "tech-category",
        label: "Uke Waza",
        techniques: [
          { label: "Age Uke", dataTechnique: "Age_Uke", dataSection: "techniques" },
          { label: "Gedan Barai", dataTechnique: "Gedan_Barai", dataSection: "techniques" },
        ],
      },
      {
        type: "tech-category",
        label: "Dachi",
        techniques: [
          { label: "Zenkutsu Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
          { label: "Kiba Dachi", dataTechnique: "Kiba_Dachi", dataSection: "techniques" },
        ],
      },
      {
        type: "tech-category",
        label: "Kata",
        techniques: [
          { label: "Heian Shodan", dataTechnique: "Heian_Shodan", dataSection: "techniques" },
          { label: "Bassai Dai", dataTechnique: "Bassai_Dai", dataSection: "techniques" },
        ],
      },
    ],
  },

  {
    type: "group",
    label: "Vidéos",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-videos",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Toutes les vidéos",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Tous",
      },
      {
        type: "submenu-button",
        label: "Kata",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kata",
      },
      {
        type: "submenu-button",
        label: "Kihon",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kihon",
      },
      {
        type: "submenu-button",
        label: "Kumite",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Kumite",
      },
      {
        type: "submenu-button",
        label: "Autres",
        buttonClass: "submenu-link",
        dataSection: "videos",
        dataVideoFilter: "Autre",
      },
    ],
  },

  {
    type: "item",
    label: "Lexique",
    buttonClass: "menu-item",
    dataSection: "lexique",
  },

  {
    type: "group",
    label: "Histoire",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-histoire",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Origines du karaté",
        buttonClass: "submenu-link",
        dataSection: "histoire-origines",
      },
      {
        type: "submenu-button",
        label: "Histoire du dojo",
        buttonClass: "submenu-link",
        dataSection: "histoire-dojo",
      },
    ],
  },

  {
    type: "item",
    label: "Liens",
    buttonClass: "menu-item",
    dataSection: "liens",
  },

  {
    type: "group",
    label: "Interface",
    buttonClass: "menu-item menu-parent",
    submenuId: "submenu-interface",
    submenuClass: "submenu",
    children: [
      {
        type: "submenu-button",
        label: "Tutoriel",
        buttonClass: "submenu-link",
        dataSection: "interface-tutoriel",
      },
      {
        type: "submenu-button",
        label: "Personnalisation",
        buttonClass: "submenu-link",
        dataSection: "interface-personnalisation",
      },
    ],
  },

  {
    type: "item",
    label: "Me contacter",
    buttonClass: "menu-item",
    dataSection: "contact",
  },
];
