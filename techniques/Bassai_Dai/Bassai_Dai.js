// FICHIER DE CONFIGURATION DE LA TECHNIQUE Bassai Dai

// ---------------------------------------------------------------
// Instructions - Respectez la syntaxe window.VARIABLE = `valeur`;
// avec les accents graves.
// ---------------------------------------------------------------

// 1. Extension des images (Optionnel)
// Par défaut : .gif
// Décommentez si vos images sont en .jpg ou .png
// window.EXTENSION = `.jpg`;

// 2. Nombre d'images (Obligatoire)
// Nombre total de photos dans le dossier (Bassai_Dai_1 ... Bassai_Dai_60)
window.COUNT = 60;

// 3. Description (Optionnel)
// Texte affiché dans la bulle d’information (bouton "i")
window.DESCRIPTION = `<b>Bassai Dai</b> est un kata avancé d’origine <b>Shuri-te</b>, dont le nom est généralement compris comme « briser » ou « pénétrer la forteresse », image d’une action résolue pour traverser une défense solide.<br><br>
Il se distingue par des techniques puissantes, des changements de direction marqués et un travail important sur la stabilité, la vitesse et le rythme, ce qui en fait un kata essentiel dans la progression du karatéka.`;

// 4. Arrière-plan (Optionnel)
// Valeurs possibles : 1 (Blanc), 0 (Noir/transparent), codeHexa, "url(image.jpg)"
// Défaut : 1
window.BACKGROUND = 1;

// 5. Durée par défaut (Optionnel)
// Temps en millisecondes par image si non spécifié dans DONNEES
// Défaut : 800
window.SLIDEDURATION = 800;

// 6. Données Techniques : Texte et Temps
// ---------------------------------------------------------------
// Syntaxe des lignes :
//   NomImageL1 `Texte Ligne 1`   (Bleu)
//   NomImageL2 `Texte Ligne 2`   (Vert)
//   NomImageTIME Temps en ms (facultatif, surcharge SLIDEDURATION)
//
// FIXE_L1 / FIXE_L2 (facultatifs) : texte commun à toutes les images.
// ---------------------------------------------------------------

window.DONNEES = `
Bassai_Dai_1_L1 <Yoi>
Bassai_Dai_1_L2 <Hachiji Dachi>

Bassai_Dai_2_L1 .
Bassai_Dai_2_L2 <Heisoku Dachi>

Bassai_Dai_3_L1 .
Bassai_Dai_3_L2 .

Bassai_Dai_4_L1 <Morote Uke>
Bassai_Dai_4_L2 Migi <Kake Dachi>

Bassai_Dai_5_L1 <Uchi Uke>
Bassai_Dai_5_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_6_L1 Gyaku <Uchi Uke>
Bassai_Dai_6_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_7_L1 Gyaku <Soto Uke>
Bassai_Dai_7_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_8_L1 <Uchi Uke>
Bassai_Dai_8_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_9_L1 .
Bassai_Dai_9_L2 .

Bassai_Dai_10_L1 .
Bassai_Dai_10_L2 .

Bassai_Dai_11_L1 <Soto Uke>
Bassai_Dai_11_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_12_L1 Gyaku <Uchi Uke>
Bassai_Dai_12_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_13_L1 <Morote Tate Kamae>
Bassai_Dai_13_L2 <Hachiji Dachi>

Bassai_Dai_14_L1 <Tate Shuto Uke>
Bassai_Dai_14_L2 <Hachiji Dachi>

Bassai_Dai_15_L1 <<Oi Zuki>><Zuki>
Bassai_Dai_15_L2 <Hachiji Dachi>

Bassai_Dai_16_L1 <Uchi Uke>
Bassai_Dai_16_L2 <Hachiji Dachi> 'plus large'

Bassai_Dai_17_L1 <<Oi Zuki>><Zuki>
Bassai_Dai_17_L2 <Hachiji Dachi>

Bassai_Dai_18_L1 <Uchi Uke>
Bassai_Dai_18_L2 <Hachiji Dachi> 'plus large'

Bassai_Dai_19_L1 .
Bassai_Dai_19_L2 .

Bassai_Dai_20_L1 <Shuto Uke>
Bassai_Dai_20_L2 Migi <Kokutsu Dachi>

Bassai_Dai_21_L1 <Shuto Uke>
Bassai_Dai_21_L2 Hidari <Kokutsu Dachi>

Bassai_Dai_22_L1 <Shuto Uke>
Bassai_Dai_22_L2 Migi <Kokutsu Dachi>

Bassai_Dai_23_L1 <Shuto Uke>
Bassai_Dai_23_L2 Hidari <Kokutsu Dachi>

Bassai_Dai_24_L1 <Kakete Uke>
Bassai_Dai_24_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_25_L1 .
Bassai_Dai_25_L2 .

Bassai_Dai_26_L1 Yoko <Fumikomi>
Bassai_Dai_26_L2 .

Bassai_Dai_27_L1 <Shuto Uke>
Bassai_Dai_27_L2 Hidari <Kokutsu Dachi>

Bassai_Dai_28_L1 <Shuto Uke>
Bassai_Dai_28_L2 Migi <Kokutsu Dachi>

Bassai_Dai_29_L1 Morote <Jodan Age Uke>
Bassai_Dai_29_L2 <Heisoku Dachi>

Bassai_Dai_30_L1 Morote <Tetsui> Uchi
Bassai_Dai_30_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_31_L1 <Maite Zuki>
Bassai_Dai_31_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_32_L1 Hidari <Teisho> Uke / Migi Ura <Nukite>
Bassai_Dai_32_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_33_L1 Hidari Yoko <Gedan barai> / Migi Yoko <Uchi Uke>
Bassai_Dai_33_L2 <Heisoku Dachi>

Bassai_Dai_34_L1 .
Bassai_Dai_34_L2 .

Bassai_Dai_35_L1 Yoko <Fumikomi> / Migi <Gedan Barai>
Bassai_Dai_35_L2 <Kiba Dachi>

Bassai_Dai_36_L1 Migi Chudan <Haishu> Uke
Bassai_Dai_36_L2 <Kiba Dachi>

Bassai_Dai_37_L1 <Mikazuki Geri>
Bassai_Dai_37_L2 .

Bassai_Dai_38_L1 Chudan <Mae Empi Uchi>
Bassai_Dai_38_L2 <Kiba Dachi>

Bassai_Dai_39_L1 Migi <Gedan Barai>
Bassai_Dai_39_L2 <Kiba Dachi>

Bassai_Dai_40_L1 Hidari <Gedan Barai>
Bassai_Dai_40_L2 <Kiba Dachi>

Bassai_Dai_41_L1 Migi <Gedan Barai>
Bassai_Dai_41_L2 <Kiba Dachi>

Bassai_Dai_42_L1 Hidari Koshi Kamae
Bassai_Dai_42_L2 <Kiba Dachi>

Bassai_Dai_43_L1 <Yama Zuki>
Bassai_Dai_43_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_44_L1 Migi Koshi Kamae
Bassai_Dai_44_L2 <Heisoku Dachi>

Bassai_Dai_45_L1 .
Bassai_Dai_45_L2 .

Bassai_Dai_46_L1 <Yama Zuki>
Bassai_Dai_46_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_47_L1 Hidari Koshi Kamae
Bassai_Dai_47_L2 <Heisoku Dachi>

Bassai_Dai_48_L1 .
Bassai_Dai_48_L2 .

Bassai_Dai_49_L1 <Yama Zuki>
Bassai_Dai_49_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_50_L1 .
Bassai_Dai_50_L2 .

Bassai_Dai_51_L1 Gyaku <Sukui Uke>
Bassai_Dai_51_L2 Hidari <Zenkutsu Dachi>

Bassai_Dai_52_L1 .
Bassai_Dai_52_L2 .

Bassai_Dai_53_L1 Gyaku <Sukui Uke>
Bassai_Dai_53_L2 Migi <Zenkutsu Dachi>

Bassai_Dai_54_L1 .
Bassai_Dai_54_L2 .

Bassai_Dai_55_L1 <Shuto Uke>
Bassai_Dai_55_L2 Migi <Kokutsu Dachi>

Bassai_Dai_56_L1 <Shuto Uke>
Bassai_Dai_56_L2 Migi <Kokutsu Dachi>

Bassai_Dai_57_L1 .
Bassai_Dai_57_L2 <Heisoku Dachi>

Bassai_Dai_58_L1 <Shuto Uke>
Bassai_Dai_58_L2 Hidari <Kokutsu Dachi>

Bassai_Dai_59_L1 .
Bassai_Dai_59_L2 <Heisoku Dachi>

Bassai_Dai_60_L1 <Yoi>
Bassai_Dai_60_L2 <Hachiji Dachi>
`;
