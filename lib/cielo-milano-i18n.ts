export type CieloLocale = "es" | "it";

export const cieloDefaultLocale: CieloLocale = "es";

type GarmentCopy = {
  name: string;
  category: string;
  colors: Record<string, string>;
};

type CieloCopy = {
  experienceBadge: string;
  previewOutfit: string;
  sizeLabel: string;
  cameraButton: string;
  cameraToast: string;
  selectGarment: string;
  color: string;
  size: string;
  addToCart: string;
  cartToast: string;
  footerCredit: string;
  loadingModel: string;
  rotateHint: string;
  tryOnTitle: string;
  tryOnHint: string;
  uploadPhoto: string;
  changePhoto: string;
  generateTryOn: string;
  generatingTryOn: string;
  tryOnResult: string;
  generateVideo: string;
  generatingVideo: string;
  videoResult: string;
  errorTryOn: string;
  errorVideo: string;
  noPhotoYet: string;
  preparingFit: string;
  creatingRunway: string;
  modelDefault: string;
  regenerate: string;
  garments: Record<string, GarmentCopy>;
};

export const cieloMilanoTranslations: Record<CieloLocale, CieloCopy> = {
  es: {
    experienceBadge: "Probador virtual",
    previewOutfit: "Vista previa del outfit",
    sizeLabel: "Talla",
    cameraButton: "Activar prueba con cámara",
    cameraToast: "Prueba AR con cámara — próximamente en la siguiente fase",
    selectGarment: "Seleccionar prenda",
    color: "Color",
    size: "Talla",
    addToCart: "Añadir al carrito",
    cartToast: "Añadido al carrito",
    footerCredit: "Probador virtual · desarrollado por Tauren Pro Eventos",
    loadingModel: "Cargando modelo",
    rotateHint: "Arrastra para girar",
    tryOnTitle: "Pruébatelo con tu foto",
    tryOnHint: "Sube una foto de cuerpo entero, fondo claro y bien iluminada",
    uploadPhoto: "Subir foto",
    changePhoto: "Cambiar foto",
    generateTryOn: "Generar prueba virtual",
    generatingTryOn: "Generando prueba...",
    tryOnResult: "Resultado virtual",
    generateVideo: "Generar video pasarela",
    generatingVideo: "Generando video...",
    videoResult: "Video de pasarela",
    errorTryOn: "No se pudo generar la prueba virtual",
    errorVideo: "No se pudo generar el video",
    noPhotoYet: "Aún no has subido una foto",
    preparingFit: "Probando la prenda en el modelo...",
    creatingRunway: "Creando video pasarela...",
    modelDefault: "Modelo Cielo Milano",
    regenerate: "Volver a generar",
    garments: {
      "abito-seta": {
        name: "Vestido de seda",
        category: "Mujer",
        colors: {
          champagne: "Champán",
          nero: "Negro",
          borgogna: "Burdeos",
        },
      },
      "cappotto-cashmere": {
        name: "Abrigo de cachemira",
        category: "Unisex",
        colors: {
          camel: "Camel",
          antracite: "Antracita",
          avorio: "Marfil",
        },
      },
      "camicia-lino": {
        name: "Camisa de lino",
        category: "Hombre",
        colors: {
          bianco: "Blanco",
          azzurro: "Azul cielo",
          sabbia: "Arena",
        },
      },
      "gonna-pizzo": {
        name: "Falda de encaje",
        category: "Mujer",
        colors: {
          panna: "Crema",
          rosa: "Rosa empolvado",
          notte: "Azul noche",
        },
      },
    },
  },
  it: {
    experienceBadge: "Prova virtuale",
    previewOutfit: "Anteprima outfit",
    sizeLabel: "Taglia",
    cameraButton: "Attiva prova con fotocamera",
    cameraToast: "Prova AR con fotocamera — in arrivo nella prossima fase",
    selectGarment: "Seleziona capo",
    color: "Colore",
    size: "Taglia",
    addToCart: "Aggiungi al carrello",
    cartToast: "Aggiunto al carrello",
    footerCredit: "Prova virtuale · sviluppato da Tauren Pro Eventos",
    loadingModel: "Caricamento modello",
    rotateHint: "Trascina per ruotare",
    tryOnTitle: "Provalo con la tua foto",
    tryOnHint: "Carica una foto a figura intera, sfondo chiaro e ben illuminata",
    uploadPhoto: "Carica foto",
    changePhoto: "Cambia foto",
    generateTryOn: "Genera prova virtuale",
    generatingTryOn: "Generazione in corso...",
    tryOnResult: "Risultato virtuale",
    generateVideo: "Genera video passerella",
    generatingVideo: "Generazione video...",
    videoResult: "Video passerella",
    errorTryOn: "Impossibile generare la prova virtuale",
    errorVideo: "Impossibile generare il video",
    noPhotoYet: "Non hai ancora caricato una foto",
    preparingFit: "Sto provando il capo sul modello...",
    creatingRunway: "Sto creando il video passerella...",
    modelDefault: "Modella Cielo Milano",
    regenerate: "Rigenera",
    garments: {
      "abito-seta": {
        name: "Abito in seta",
        category: "Donna",
        colors: {
          champagne: "Champagne",
          nero: "Nero",
          borgogna: "Borgogna",
        },
      },
      "cappotto-cashmere": {
        name: "Cappotto cashmere",
        category: "Unisex",
        colors: {
          camel: "Camel",
          antracite: "Antracite",
          avorio: "Avorio",
        },
      },
      "camicia-lino": {
        name: "Camicia in lino",
        category: "Uomo",
        colors: {
          bianco: "Bianco",
          azzurro: "Azzurro cielo",
          sabbia: "Sabbia",
        },
      },
      "gonna-pizzo": {
        name: "Gonna in pizzo",
        category: "Donna",
        colors: {
          panna: "Panna",
          rosa: "Rosa cipria",
          notte: "Blu notte",
        },
      },
    },
  },
};

export function getGarmentCopy(locale: CieloLocale, garmentId: string) {
  return cieloMilanoTranslations[locale].garments[garmentId];
}

export function getColorLabel(
  locale: CieloLocale,
  garmentId: string,
  colorId: string,
) {
  return (
    cieloMilanoTranslations[locale].garments[garmentId]?.colors[colorId] ??
    colorId
  );
}
