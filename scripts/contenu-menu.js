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
      /* ZUKI WAZA */
      {
        type: "tech-category",
        label: "Zuki Waza",
        techniques: [
          { label: "Age Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Awase Zuki", dataTechnique: "Awase_Zuki", dataSection: "techniques" },
          { label: "Haishu Uchi", dataTechnique: "Haishu", dataSection: "techniques" },
          { label: "Haito Uchi", dataTechnique: "Haito", dataSection: "techniques" },
          { label: "Kagi Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
          { label: "Maite Zuki", dataTechnique: "Maite_Zuki", dataSection: "techniques" },
          { label: "Mawashi Tetsui Uchi", dataTechnique: "Mawashi_Tetsui_Uchi", dataSection: "techniques" },
          { label: "Oi Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Shuto Uchi", dataTechnique: "Shuto", dataSection: "techniques" },
          { label: "Sokumen Gyaku Zuki", dataTechnique: "Kagi_Zuki", dataSection: "techniques" },
          { label: "Tate Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
          { label: "Tate Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
          { label: "Tate Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Tetsui Uchi", dataTechnique: "Tetsui", dataSection: "techniques" },
          { label: "Ura Nukite", dataTechnique: "Nukite", dataSection: "techniques" },
          { label: "Ura Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
          { label: "Uraken Uchi", dataTechnique: "Uraken", dataSection: "techniques" },
          { label: "Yama Zuki", dataTechnique: "Yama_Zuki", dataSection: "techniques" },
          { label: "Zuki", dataTechnique: "Zuki", dataSection: "techniques" },
        ],
      },

      /* EMPI WAZA */
      {
        type: "tech-category",
        label: "Empi Waza",
        techniques: [
          { label: "Age Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
          { label: "Mae Empi Uchi", dataTechnique: "Mae_Empi_Uchi", dataSection: "techniques" },
          { label: "Tate Empi Uchi", dataTechnique: "Age_Empi_Uchi", dataSection: "techniques" },
          { label: "Ushiro Empi Uchi", dataTechnique: "Ushiro_Empi_Uchi", dataSection: "techniques" },
        ],
      },

      /* GERI WAZA */
      {
        type: "tech-category",
        label: "Geri Waza",
        techniques: [
          { label: "Fumikomi", dataTechnique: "Fumikomi", dataSection: "techniques" },
          { label: "Mae Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
          { label: "Mae Hiza Geri", dataTechnique: "Mae_Hiza_Geri", dataSection: "techniques" },
          { label: "Mae Tobi Geri", dataTechnique: "Mae_Geri", dataSection: "techniques" },
          { label: "Mikazuki Geri", dataTechnique: "Mikazuki_Geri", dataSection: "techniques" },
          { label: "Ushiro Geri", dataTechnique: "Ushiro_Geri", dataSection: "techniques" },
          { label: "Yoko Geri", dataTechnique: "Yoko_Geri", dataSection: "techniques" },
        ],
      },

      /* UKE WAZA */
      {
        type: "tech-category",
        label: "Uke Waza",
        techniques: [
          { label: "Empi Uke", dataTechnique: "Empi_Uke", dataSection: "techniques" },
          { label: "Gedan Barai", dataTechnique: "Gedan_Barai", dataSection: "techniques" },
          { label: "Haishu Uke", dataTechnique: "Haishu", dataSection: "techniques" },
          { label: "Haito Uke", dataTechnique: "Haito", dataSection: "techniques" },
          { label: "Haiwan Sokumen Uke", dataTechnique: "Haiwan_Sokumen_Uke", dataSection: "techniques" },
          { label: "Hasami Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Jodan Age Uke", dataTechnique: "Jodan_Age_Uke", dataSection: "techniques" },
          { label: "Juji Uke", dataTechnique: "Juji_Uke", dataSection: "techniques" },
          { label: "Kake Uke", dataTechnique: "Kake_Uke", dataSection: "techniques" },
          { label: "Kakiwake Uke", dataTechnique: "Kakiwake_Uke", dataSection: "techniques" },
          { label: "Kosa Uke", dataTechnique: "Kosa_Uke", dataSection: "techniques" },
          { label: "Manji Uke", dataTechnique: "Manji_Uke", dataSection: "techniques" },
          { label: "Morote Uke", dataTechnique: "Morote_Uke", dataSection: "techniques" },
          { label: "Otoshi Uke", dataTechnique: "Otoshi_Uke", dataSection: "techniques" },
          { label: "Shuto Uke", dataTechnique: "Shuto_Uke", dataSection: "techniques" },
          { label: "Sokumen Awase Uke", dataTechnique: "Sokumen_Awase_Uke", dataSection: "techniques" },
          { label: "Soto Uke", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Sukui Uke", dataTechnique: "Sukui_Uke", dataSection: "techniques" },
          { label: "Tate Shuto Uke", dataTechnique: "Tate_Shuto_Uke", dataSection: "techniques" },
          { label: "Te Osae Uke", dataTechnique: "Te_Osae_Uke", dataSection: "techniques" },
          { label: "Teisho Kosa Uke", dataTechnique: "Teisho_Kosa_Uke", dataSection: "techniques" },
          { label: "Teisho Uke", dataTechnique: "Teisho", dataSection: "techniques" },
          { label: "Uchi Komi", dataTechnique: "Soto_Uke", dataSection: "techniques" },
          { label: "Uchi Uke", dataTechnique: "Uchi_Uke", dataSection: "techniques" },
          { label: "Uraken Uke", dataTechnique: "Uraken", dataSection: "techniques" },
        ],
      },

      /* KATA */
      {
        type: "tech-category",
        label: "Kata",
        techniques: [
          { label: "Bassai Dai", dataTechnique: "Bassai_Dai", dataSection: "techniques" },
//          { label: "Bassai Sho", dataTechnique: "Bassai_Sho", dataSection: "techniques" },
//          { label: "Empi", dataTechnique: "Empi", dataSection: "techniques" },
//          { label: "Gankaku", dataTechnique: "Gankaku", dataSection: "techniques" },
          { label: "Heian Shodan", dataTechnique: "Heian_Shodan", dataSection: "techniques" },
          { label: "Heian Nidan", dataTechnique: "Heian_Nidan", dataSection: "techniques" },
          { label: "Heian Sandan", dataTechnique: "Heian_Sandan", dataSection: "techniques" },
          { label: "Heian Yodan", dataTechnique: "Heian_Yodan", dataSection: "techniques" },
          { label: "Heian Godan", dataTechnique: "Heian_Godan", dataSection: "techniques" },
//          { label: "Jion", dataTechnique: "Jion", dataSection: "techniques" },
//          { label: "Kanku Dai", dataTechnique: "Kanku_Dai", dataSection: "techniques" },
//          { label: "Kanku Sho", dataTechnique: "Kanku_Sho", dataSection: "techniques" },
//          { label: "Nijushiho", dataTechnique: "Nijushiho", dataSection: "techniques" },
//          { label: "Sochin", dataTechnique: "Sochin", dataSection: "techniques" },
//          { label: "Tekki Shodan", dataTechnique: "Tekki_Shodan", dataSection: "techniques" },
        ],
      },

      /* DACHI */
      {
        type: "tech-category",
        label: "Dachi",
        techniques: [
          { label: "Fudo Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
          { label: "Hachiji Dachi", dataTechnique: "Hachiji_Dachi", dataSection: "techniques" },
          { label: "Hangetsu Dachi", dataTechnique: "Hangetsu_Dachi", dataSection: "techniques" },
          { label: "Heisoku Dachi", dataTechnique: "Heisoku_Dachi", dataSection: "techniques" },
          { label: "Hiza Gamae", dataTechnique: "Hiza_Gamae", dataSection: "techniques" },
          { label: "Jiai No Gamae", dataTechnique: "Jiai_No_Gamae", dataSection: "techniques" },
          { label: "Kake Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
          { label: "Kase Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
          { label: "Kata Hiza Dachi", dataTechnique: "Kata_Hiza_Dachi", dataSection: "techniques" },
          { label: "Kiba Dachi", dataTechnique: "Kiba_Dachi", dataSection: "techniques" },
          { label: "Kokutsu Dachi", dataTechnique: "Kokutsu_Dachi", dataSection: "techniques" },
          { label: "Kosa Dachi", dataTechnique: "Kake_Dachi", dataSection: "techniques" },
          { label: "Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
          { label: "Morote Koko Gamae", dataTechnique: "Morote_Koko_Gamae", dataSection: "techniques" },
          { label: "Moto Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
          { label: "Musubi Dachi", dataTechnique: "Musubi_Dachi", dataSection: "techniques" },
          { label: "Neko Ashi Dachi", dataTechnique: "Neko_Ashi_Dachi", dataSection: "techniques" },
          { label: "Renoji Dachi", dataTechnique: "Renoji_Dachi", dataSection: "techniques" },
          { label: "Ryo Goshi Gamae", dataTechnique: "Ryo_Goshi_Gamae", dataSection: "techniques" },
          { label: "Ryoken Koshi Gamae", dataTechnique: "Ryoken_Koshi_Gamae", dataSection: "techniques" },
          { label: "Sanchin Dachi", dataTechnique: "Sanchin_Dachi", dataSection: "techniques" },
          { label: "Sochin Dachi", dataTechnique: "Fudo_Dachi", dataSection: "techniques" },
          { label: "Soete Koshi Gamae", dataTechnique: "Koshi_Gamae", dataSection: "techniques" },
          { label: "Teiji Dachi", dataTechnique: "Teiji_Dachi", dataSection: "techniques" },
          { label: "Tsuru Ashi Dachi", dataTechnique: "Tsuru_Ashi_Dachi", dataSection: "techniques" },
          { label: "Yumi Zuki", dataTechnique: "Yumi_Zuki", dataSection: "techniques" },
          { label: "Zenkutsu Dachi", dataTechnique: "Zenkutsu_Dachi", dataSection: "techniques" },
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
