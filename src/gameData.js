
const editorialGrids = [
  {
    id: "001",
    difficulty: "normal",
    title: "Grille du jour",
    dateLabel: "Édition prototype",
    columns: [
      { id: "littoral", label: "Littoral", tags: ["littoral", "maritime", "portuaire"] },
      { id: "industriel", label: "Patrimoine industriel", tags: ["industriel", "minier", "ouvrier", "naval"] },
      { id: "architecture", label: "Architecture remarquable", tags: ["architecture", "patrimoine", "monumental", "medieval", "brutaliste"] },
    ],
    rows: [
      { id: "melancolique", label: "Ambiance mélancolique", tags: ["melancolique", "memoire", "rude", "crepusculaire"] },
      { id: "cinema", label: "Lieu de tournage / cinéma", tags: ["cinema", "culture_pop", "iconique"] },
      { id: "spectaculaire", label: "Paysages spectaculaires", tags: ["spectaculaire", "sauvage", "montagne", "falaises", "volcanique"] },
    ],
  },
  {
    id: "002",
    difficulty: "normal",
    title: "Grille patrimoine",
    dateLabel: "Édition patrimoine",
    columns: [
      { id: "architecture", label: "Architecture remarquable", tags: ["architecture", "patrimoine", "monumental", "medieval", "brutaliste"] },
      { id: "cinema", label: "Imaginaire de cinéma", tags: ["cinema", "culture_pop", "iconique"] },
      { id: "rural", label: "France rurale", tags: ["rural", "sauvage", "underdog"] },
    ],
    rows: [
      { id: "memoire", label: "Mémoire et traces historiques", tags: ["memoire", "guerre", "patrimoine", "rude"] },
      { id: "spectaculaire", label: "Relief spectaculaire", tags: ["spectaculaire", "sauvage", "montagne", "volcanique"] },
      { id: "littoral", label: "Ouverture maritime", tags: ["littoral", "maritime", "portuaire"] },
    ],
  },
  {
    id: "003",
    difficulty: "normal",
    title: "Grille contrastes",
    dateLabel: "Édition contrastes",
    columns: [
      { id: "melancolique", label: "Ambiance mélancolique", tags: ["melancolique", "memoire", "rude", "crepusculaire"] },
      { id: "spectaculaire", label: "Paysages spectaculaires", tags: ["spectaculaire", "sauvage", "montagne", "falaises", "volcanique"] },
      { id: "industriel", label: "Culture industrielle", tags: ["industriel", "minier", "ouvrier", "naval"] },
    ],
    rows: [
      { id: "architecture", label: "Patrimoine bâti", tags: ["architecture", "patrimoine", "monumental", "medieval", "brutaliste"] },
      { id: "littoral", label: "Départements de bord de mer", tags: ["littoral", "maritime", "portuaire"] },
      { id: "rare", label: "Choix rares ou sous-estimés", tags: ["rural", "underdog", "sauvage", "melancolique"] },
    ],
  },
  {
    id: "004",
    difficulty: "normal",
    title: "Grille arbitrages",
    dateLabel: "Édition arbitrages",
    columns: [
      { id: "ruralite-patrimoniale", label: "Ruralité patrimoniale", tags: ["rural", "patrimoine"] },
      { id: "images-populaires", label: "Images populaires", tags: ["cinema", "culture_pop"] },
      { id: "architecture", label: "Architecture", tags: ["architecture"] },
    ],
    rows: [
      { id: "memoire-historique", label: "Mémoire historique", tags: ["memoire", "guerre"] },
      { id: "industrie-portuaire", label: "Industrie portuaire", tags: ["industriel", "portuaire"] },
      { id: "paysages-spectaculaires", label: "Paysages spectaculaires", tags: ["spectaculaire"] },
    ],
  },
  {
    id: "005",
    difficulty: "normal",
    title: "Grille reliefs",
    dateLabel: "Édition reliefs",
    columns: [
      { id: "montagnes-volcans", label: "Montagnes et volcans", tags: ["montagne", "volcanique", "mineral"] },
      { id: "gorges-falaises", label: "Falaises et gorges", tags: ["falaises", "spectaculaire", "sauvage"] },
      { id: "ruralite-rude", label: "Ruralité rude", tags: ["rural", "rude", "underdog"] },
    ],
    rows: [
      { id: "massifs-interieurs", label: "Massifs intérieurs", tags: ["spectaculaire", "montagne", "volcanique"] },
      { id: "departements-discrets", label: "Départements discrets", tags: ["rural", "underdog", "melancolique"] },
      { id: "pierres-patrimoine", label: "Pierres et patrimoine", tags: ["architecture", "patrimoine", "mineral"] },
    ],
  },
  {
    id: "006",
    difficulty: "normal",
    title: "Grille écrans",
    dateLabel: "Édition écrans",
    columns: [
      { id: "films", label: "Films et culture pop", tags: ["cinema", "culture_pop", "iconique"] },
      { id: "decors-patrimoine", label: "Décors patrimoniaux", tags: ["architecture", "patrimoine", "monumental", "medieval"] },
      { id: "paysages-filmables", label: "Paysages filmables", tags: ["spectaculaire", "sauvage", "littoral"] },
    ],
    rows: [
      { id: "grandes-evidences", label: "Grandes évidences", tags: ["cinema", "architecture", "littoral"] },
      { id: "choix-auteur", label: "Choix d’auteur", tags: ["melancolique", "rude", "memoire"] },
      { id: "villages-recits", label: "Villages et récits", tags: ["villages", "patrimoine", "rural", "prehistoire"] },
    ],
  },
  {
    id: "007",
    difficulty: "normal",
    title: "Grille mémoire",
    dateLabel: "Édition mémoire",
    columns: [
      { id: "memoire-guerre", label: "Mémoire de guerre", tags: ["memoire", "guerre", "rude"] },
      { id: "memoire-ouvriere", label: "Mémoire ouvrière", tags: ["industriel", "minier", "ouvrier"] },
      { id: "patrimoine-discret", label: "Patrimoine discret", tags: ["patrimoine", "rural", "underdog"] },
    ],
    rows: [
      { id: "nord-est", label: "Nord et Est", tags: ["memoire", "industriel", "rude"] },
      { id: "territoires-ruraux", label: "Territoires ruraux", tags: ["rural", "melancolique", "underdog"] },
      { id: "architecture-souvenir", label: "Architecture du souvenir", tags: ["architecture", "patrimoine", "monumental"] },
    ],
  },
  {
    id: "008",
    difficulty: "normal",
    title: "Grille pierres",
    dateLabel: "Édition pierres",
    columns: [
      { id: "medieval", label: "Médiéval", tags: ["medieval", "patrimoine", "architecture"] },
      { id: "monumental", label: "Monumental", tags: ["monumental", "architecture", "patrimoine"] },
      { id: "bati-industriel", label: "Bâti industriel", tags: ["industriel", "brutaliste", "ouvrier", "naval", "architecture"] },
    ],
    rows: [
      { id: "villages-chateaux", label: "Villages et châteaux", tags: ["villages", "prehistoire", "medieval"] },
      { id: "metropoles-icones", label: "Métropoles et icônes", tags: ["monumental", "culture_pop", "cinema"] },
      { id: "patrimoine-sous-estime", label: "Patrimoine sous-estimé", tags: ["underdog", "rural", "patrimoine"] },
    ],
  },
  {
    id: "009",
    difficulty: "normal",
    title: "Grille industries",
    dateLabel: "Édition industries",
    columns: [
      { id: "mines-terrils", label: "Mines et terrils", tags: ["minier", "ouvrier", "industriel"] },
      { id: "ports-usines", label: "Ports et usines", tags: ["naval", "portuaire", "industriel"] },
      { id: "manufactures-memoire", label: "Manufactures et mémoire", tags: ["michelin", "industriel", "memoire"] },
    ],
    rows: [
      { id: "facades-maritimes", label: "Façades maritimes", tags: ["littoral", "maritime", "portuaire"] },
      { id: "villes-ouvrieres", label: "Villes ouvrières", tags: ["ouvrier", "industriel", "rude"] },
      { id: "departements-rares", label: "Départements rares", tags: ["underdog", "rural", "melancolique", "industriel"] },
    ],
  },
  {
    id: "010",
    difficulty: "normal",
    title: "Grille tensions intérieures",
    dateLabel: "Édition tensions intérieures",
    columns: [
      { id: "reliefs-sauvages", label: "Reliefs sauvages", tags: ["spectaculaire", "sauvage"] },
      { id: "memoire-locale", label: "Mémoire locale", tags: ["memoire"] },
      { id: "architecture", label: "Architecture", tags: ["architecture"] },
    ],
    rows: [
      { id: "melancolie-interieure", label: "Mélancolie intérieure", tags: ["melancolique"] },
      { id: "bassins-industriels", label: "Bassins industriels", tags: ["industriel"] },
      { id: "bati-industriel", label: "Bâti industriel", tags: ["industriel", "brutaliste"] },
    ],
  },
  {
    id: "011",
    difficulty: "normal",
    title: "Grille contre-champs",
    dateLabel: "Édition contre-champs",
    columns: [
      { id: "cotes-habitees", label: "Côtes habitées", tags: ["littoral", "maritime"] },
      { id: "images-populaires", label: "Images populaires", tags: ["cinema", "culture_pop"] },
      { id: "patrimoine-rare", label: "Patrimoine rare", tags: ["patrimoine", "underdog"] },
    ],
    rows: [
      { id: "memoire-rurale", label: "Mémoire rurale", tags: ["memoire", "rural"] },
      { id: "sud-spectaculaire", label: "Sud spectaculaire", tags: ["spectaculaire", "mediterraneen"] },
      { id: "traces-historiques", label: "Traces historiques", tags: ["memoire", "guerre", "patrimoine"] },
    ],
  },
  {
    id: "012",
    difficulty: "normal",
    title: "Grille pièges industriels",
    dateLabel: "Édition pièges industriels",
    columns: [
      { id: "industrie-portuaire", label: "Industrie portuaire", tags: ["industriel", "portuaire"] },
      { id: "bassins-miniers", label: "Bassins miniers", tags: ["industriel", "minier"] },
      { id: "melancolie-interieure", label: "Mélancolie intérieure", tags: ["melancolique"] },
    ],
    rows: [
      { id: "patrimoine-rare", label: "Patrimoine rare", tags: ["patrimoine", "underdog"] },
      { id: "architecture-urbaine", label: "Architecture urbaine", tags: ["architecture"] },
      { id: "memoire-ouvriere", label: "Mémoire ouvrière", tags: ["memoire", "ouvrier"] },
    ],
  },
  {
    id: "013",
    difficulty: "normal",
    title: "Grille Atlantique",
    dateLabel: "Édition Atlantique",
    columns: [
      { id: "phares-caps", label: "Phares et caps", tags: ["phares", "falaises", "maritime"] },
      { id: "ports-chantiers", label: "Ports et chantiers", tags: ["portuaire", "naval", "industriel", "littoral"] },
      { id: "ciels-melancoliques", label: "Ciels mélancoliques", tags: ["melancolique", "rude", "memoire"] },
    ],
    rows: [
      { id: "bretagne", label: "Bretagne", tags: ["culture_celte", "maritime", "sauvage"] },
      { id: "normandie", label: "Normandie", tags: ["memoire", "maritime", "architecture"] },
      { id: "loire-estuaires", label: "Loire et estuaires", tags: ["naval", "portuaire", "littoral"] },
    ],
  },
  {
    id: "014",
    difficulty: "normal",
    title: "Grille choix contrariés",
    dateLabel: "Édition choix contrariés",
    columns: [
      { id: "melancolie-industrielle", label: "Mélancolie industrielle", tags: ["melancolique", "industriel"] },
      { id: "memoire-historique", label: "Mémoire historique", tags: ["memoire", "guerre"] },
      { id: "memoire-rurale", label: "Mémoire rurale", tags: ["memoire", "rural"] },
    ],
    rows: [
      { id: "bords-mediterraneens", label: "Bords méditerranéens", tags: ["littoral", "mediterraneen"] },
      { id: "imaginaire-cinema", label: "Imaginaire de cinéma", tags: ["cinema"] },
      { id: "littoraux-ordinaires", label: "Littoraux ordinaires", tags: ["littoral"] },
    ],
  },
  {
    id: "015",
    difficulty: "normal",
    title: "Grille France rude",
    dateLabel: "Édition France rude",
    columns: [
      { id: "ciels-lourds", label: "Ciels lourds", tags: ["melancolique", "rude", "memoire"] },
      { id: "terres-sauvages", label: "Terres sauvages", tags: ["sauvage", "rural", "spectaculaire"] },
      { id: "industries-dures", label: "Industries dures", tags: ["industriel", "minier", "ouvrier"] },
    ],
    rows: [
      { id: "nord-minier", label: "Nord minier", tags: ["minier", "ouvrier", "littoral", "memoire"] },
      { id: "massifs-isoles", label: "Massifs isolés", tags: ["rural", "montagne", "volcanique", "sauvage"] },
      { id: "frontieres-discretes", label: "Frontières discrètes", tags: ["underdog", "memoire", "patrimoine", "industriel"] },
    ],
  },
  {
    id: "016",
    difficulty: "normal",
    title: "Grille couleurs de pierre",
    dateLabel: "Édition couleurs de pierre",
    columns: [
      { id: "pierre-volcanique", label: "Pierre volcanique", tags: ["volcanique", "mineral", "architecture"] },
      { id: "vieilles-pierres", label: "Vieilles pierres", tags: ["medieval", "patrimoine", "villages"] },
      { id: "brutalisme-industrie", label: "Brutalisme et industrie", tags: ["brutaliste", "industriel", "monumental"] },
    ],
    rows: [
      { id: "noir-mineral", label: "Noir et minéral", tags: ["mineral", "volcanique", "spectaculaire"] },
      { id: "ocre-cathare", label: "Ocre et cathare", tags: ["medieval", "architecture", "spectaculaire"] },
      { id: "gris-nord", label: "Gris du Nord", tags: ["industriel", "melancolique", "memoire"] },
    ],
  },
  {
    id: "017",
    difficulty: "normal",
    title: "Grille France des marges",
    dateLabel: "Édition France des marges",
    columns: [
      { id: "petits-territoires", label: "Petits territoires", tags: ["underdog", "rural", "patrimoine"] },
      { id: "lisieres-frontalieres", label: "Lisières frontalières", tags: ["memoire", "guerre", "industriel"] },
      { id: "retraits-sauvages", label: "Retraits sauvages", tags: ["sauvage", "melancolique", "spectaculaire"] },
    ],
    rows: [
      { id: "est-oublie", label: "Est oublié", tags: ["underdog", "memoire", "patrimoine"] },
      { id: "centre-discret", label: "Centre discret", tags: ["rural", "melancolique", "volcanique"] },
      { id: "bords-mer-inattendus", label: "Bords de mer moins attendus", tags: ["maritime", "memoire", "littoral"] },
    ],
  },
  {
    id: "018",
    difficulty: "normal",
    title: "Grille vacances",
    dateLabel: "Édition vacances",
    columns: [
      { id: "mer-vacances", label: "Mer", tags: ["littoral", "maritime", "mediterraneen"] },
      { id: "montagne-nature", label: "Montagne et nature", tags: ["montagne", "sauvage", "spectaculaire"] },
      { id: "villages-patrimoine", label: "Villages et patrimoine", tags: ["villages", "medieval", "patrimoine"] },
    ],
    rows: [
      { id: "grand-public", label: "Grand public", tags: ["littoral", "cinema", "monumental"] },
      { id: "france-familiale", label: "France familiale", tags: ["villages", "patrimoine", "maritime"] },
      { id: "hors-saison", label: "Hors saison", tags: ["melancolique", "rude", "sauvage"] },
    ],
  },
  {
    id: "019",
    difficulty: "normal",
    title: "Grille récits",
    dateLabel: "Édition récits",
    columns: [
      { id: "memoire-recits", label: "Mémoire", tags: ["memoire", "guerre", "rude", "architecture"] },
      { id: "prehistoire-legendes", label: "Préhistoire et légendes", tags: ["prehistoire", "medieval", "culture_celte"] },
      { id: "fictions", label: "Cinéma et fictions", tags: ["cinema", "culture_pop", "iconique"] },
    ],
    rows: [
      { id: "recits-nord", label: "Récits du Nord", tags: ["industriel", "melancolique", "ouvrier"] },
      { id: "recits-sud", label: "Récits du Sud", tags: ["mediterraneen", "medieval", "spectaculaire"] },
      { id: "recits-ruraux", label: "Récits ruraux", tags: ["rural", "villages", "sauvage"] },
    ],
  },
  {
    id: "020",
    difficulty: "normal",
    title: "Grille eau",
    dateLabel: "Édition eau",
    columns: [
      { id: "ports-eau", label: "Ports", tags: ["portuaire", "naval", "maritime"] },
      { id: "falaises-eau", label: "Falaises", tags: ["falaises", "littoral", "spectaculaire"] },
      { id: "vallees", label: "Vallées et villages", tags: ["villages", "prehistoire", "patrimoine", "sauvage"] },
    ],
    rows: [
      { id: "atlantique", label: "Atlantique", tags: ["maritime", "culture_celte", "littoral"] },
      { id: "manche-mer-nord", label: "Manche et mer du Nord", tags: ["memoire", "rude", "littoral"] },
      { id: "sud-sec", label: "Sud sec", tags: ["mediterraneen", "medieval", "spectaculaire"] },
    ],
  },
  {
    id: "021",
    difficulty: "normal",
    title: "Grille routes intérieures",
    dateLabel: "Édition routes intérieures",
    columns: [
      { id: "massif-central-route", label: "Massif central", tags: ["volcanique", "montagne", "rural"] },
      { id: "grand-est-route", label: "Grand Est", tags: ["memoire", "guerre", "patrimoine"] },
      { id: "sud-ouest", label: "Sud-Ouest", tags: ["villages", "prehistoire", "architecture"] },
    ],
    rows: [
      { id: "reliefs-route", label: "Reliefs", tags: ["spectaculaire", "sauvage", "mineral"] },
      { id: "ruralite-route", label: "Ruralité", tags: ["rural", "underdog", "melancolique"] },
      { id: "patrimoine-route", label: "Patrimoine", tags: ["architecture", "medieval", "patrimoine"] },
    ],
  },
  {
    id: "022",
    difficulty: "normal",
    title: "Grille villes et campagnes",
    dateLabel: "Édition villes et campagnes",
    columns: [
      { id: "metropoles", label: "Métropoles", tags: ["monumental", "culture_pop", "portuaire", "architecture"] },
      { id: "petites-villes", label: "Petites villes", tags: ["patrimoine", "industriel", "architecture"] },
      { id: "campagnes", label: "Campagnes", tags: ["rural", "villages", "sauvage"] },
    ],
    rows: [
      { id: "tres-visibles", label: "Très visibles", tags: ["cinema", "littoral", "architecture"] },
      { id: "elegants", label: "Élégants", tags: ["medieval", "melancolique", "spectaculaire"] },
      { id: "rares", label: "Rares", tags: ["underdog", "memoire", "rural"] },
    ],
  },
  {
    id: "023",
    difficulty: "normal",
    title: "Grille climats",
    dateLabel: "Édition climats",
    columns: [
      { id: "ciel-atlantique", label: "Ciel atlantique", tags: ["maritime", "melancolique", "phares", "littoral"] },
      { id: "soleil-mediterraneen", label: "Soleil méditerranéen", tags: ["mediterraneen", "littoral", "architecture"] },
      { id: "froid-mineral", label: "Froid minéral", tags: ["volcanique", "mineral", "rude", "architecture"] },
    ],
    rows: [
      { id: "paysages-climats", label: "Paysages", tags: ["spectaculaire", "sauvage", "falaises"] },
      { id: "villes-ports", label: "Villes et ports", tags: ["portuaire", "naval", "monumental"] },
      { id: "memoire-climats", label: "Mémoire", tags: ["memoire", "patrimoine", "guerre"] },
    ],
  },
  {
    id: "024",
    difficulty: "expert",
    title: "Grille signatures modernes",
    dateLabel: "Édition signatures modernes",
    columns: [
      { id: "icones-filmees", label: "Icônes filmées", tags: ["iconique", "cinema"] },
      { id: "beton-moderne", label: "Béton moderne", tags: ["brutaliste", "monumental"] },
      { id: "ports-techniques", label: "Ports techniques", tags: ["naval", "portuaire"] },
    ],
    rows: [
      { id: "ecrans-populaires", label: "Écrans populaires", tags: ["cinema", "culture_pop"] },
      { id: "facades-industrielles", label: "Façades industrielles", tags: ["industriel", "ouvrier"] },
      { id: "ciels-crepusculaires", label: "Ciels crépusculaires", tags: ["crepusculaire", "rude", "industriel"] },
    ],
  },
  {
    id: "025",
    difficulty: "expert",
    title: "Grille littoraux précis",
    dateLabel: "Édition littoraux précis",
    columns: [
      { id: "phares-caps", label: "Phares et caps", tags: ["phares", "falaises"] },
      { id: "chantiers-navals", label: "Chantiers navals", tags: ["naval", "portuaire"] },
      { id: "icones-rivage", label: "Icônes de rivage", tags: ["iconique", "littoral"] },
    ],
    rows: [
      { id: "manche-crepusculaire", label: "Manche crépusculaire", tags: ["crepusculaire", "maritime"] },
      { id: "atlantique-technique", label: "Atlantique technique", tags: ["maritime", "naval"] },
      { id: "rivages-filmes", label: "Rivages filmés", tags: ["cinema", "littoral"] },
    ],
  },
  {
    id: "026",
    difficulty: "expert",
    title: "Grille volcans et béton",
    dateLabel: "Édition volcans et béton",
    columns: [
      { id: "pierres-volcaniques", label: "Pierres volcaniques", tags: ["volcanique", "mineral"] },
      { id: "beton-brutaliste", label: "Béton brutaliste", tags: ["brutaliste", "monumental"] },
      { id: "labels-iconiques", label: "Labels iconiques", tags: ["iconique", "culture_pop"] },
    ],
    rows: [
      { id: "industrie-minerale", label: "Industrie minérale", tags: ["industriel", "minier", "spectaculaire"] },
      { id: "relief-sec", label: "Relief sec", tags: ["spectaculaire", "montagne"] },
      { id: "images-relief", label: "Images de relief", tags: ["cinema", "spectaculaire"] },
    ],
  },
  {
    id: "027",
    difficulty: "expert",
    title: "Grille Sud intérieur",
    dateLabel: "Édition Sud intérieur",
    columns: [
      { id: "cathare-sec", label: "Cathare sec", tags: ["cathare", "mediterraneen"] },
      { id: "icones-solaires", label: "Icônes solaires", tags: ["iconique", "cinema"] },
      { id: "relief-volcanique", label: "Relief volcanique", tags: ["volcanique", "spectaculaire"] },
    ],
    rows: [
      { id: "ecrans-sud", label: "Écrans du Sud", tags: ["cinema", "mediterraneen"] },
      { id: "gorges-spectaculaires", label: "Gorges spectaculaires", tags: ["falaises", "spectaculaire"] },
      { id: "ports-mediterranee", label: "Ports de Méditerranée", tags: ["naval", "portuaire", "littoral"] },
    ],
  },
  {
    id: "028",
    difficulty: "expert",
    title: "Grille Nord technique",
    dateLabel: "Édition Nord technique",
    columns: [
      { id: "brutaliste-industriel", label: "Brutaliste industriel", tags: ["brutaliste", "industriel"] },
      { id: "naval-portuaire", label: "Naval portuaire", tags: ["naval", "portuaire"] },
      { id: "ciels-crepusculaires", label: "Ciels crépusculaires", tags: ["crepusculaire", "rude", "cinema"] },
    ],
    rows: [
      { id: "bassins-miniers", label: "Bassins miniers", tags: ["minier", "ouvrier", "industriel"] },
      { id: "facades-froides", label: "Façades froides", tags: ["maritime", "industriel"] },
      { id: "icones-populaires", label: "Icônes populaires", tags: ["iconique", "culture_pop"] },
    ],
  },
  {
    id: "029",
    difficulty: "expert",
    title: "Grille Atlantique noir et blanc",
    dateLabel: "Édition Atlantique noir et blanc",
    columns: [
      { id: "phares-crepusculaires", label: "Phares crépusculaires", tags: ["phares", "crepusculaire"] },
      { id: "ports-navals", label: "Ports navals", tags: ["naval", "portuaire"] },
      { id: "falaises-iconiques", label: "Falaises iconiques", tags: ["falaises", "iconique"] },
    ],
    rows: [
      { id: "bretagne-celtique", label: "Bretagne celtique", tags: ["culture_celte", "maritime"] },
      { id: "estuaires-industriels", label: "Estuaires industriels", tags: ["industriel", "portuaire", "littoral"] },
      { id: "ecrans-littoraux", label: "Écrans littoraux", tags: ["cinema", "littoral", "culture_pop"] },
    ],
  },
  {
    id: "030",
    difficulty: "expert",
    title: "Grille Alpes alternatives",
    dateLabel: "Édition Alpes alternatives",
    columns: [
      { id: "volcanique-mineral", label: "Volcanique minéral", tags: ["volcanique", "mineral"] },
      { id: "iconique-altitude", label: "Iconique d’altitude", tags: ["iconique", "montagne"] },
      { id: "brutaliste-urbain", label: "Brutaliste urbain", tags: ["brutaliste", "monumental"] },
    ],
    rows: [
      { id: "reliefs-filmables", label: "Reliefs filmables", tags: ["cinema", "spectaculaire", "montagne"] },
      { id: "industrie-relief", label: "Industrie de relief", tags: ["industriel", "ouvrier", "spectaculaire"] },
      { id: "ciels-mineraux", label: "Ciels minéraux", tags: ["crepusculaire", "mineral", "industriel"] },
    ],
  },
  {
    id: "031",
    difficulty: "expert",
    title: "Grille machines et images",
    dateLabel: "Édition machines et images",
    columns: [
      { id: "michelin", label: "Michelin", tags: ["michelin", "industriel"] },
      { id: "brutaliste", label: "Brutaliste", tags: ["brutaliste", "monumental"] },
      { id: "icones-relief", label: "Icônes de relief", tags: ["iconique", "spectaculaire", "littoral"] },
    ],
    rows: [
      { id: "volcans-industrie", label: "Volcans et industrie", tags: ["volcanique", "mineral", "industriel"] },
      { id: "chantiers-navals", label: "Chantiers navals", tags: ["naval", "portuaire"] },
      { id: "ecrans-noirs", label: "Écrans noirs", tags: ["cinema", "crepusculaire"] },
    ],
  },
  {
    id: "032",
    difficulty: "expert",
    title: "Grille caps et légendes",
    dateLabel: "Édition caps et légendes",
    columns: [
      { id: "phares-iconiques", label: "Phares iconiques", tags: ["phares", "iconique"] },
      { id: "cathare-spectaculaire", label: "Cathare spectaculaire", tags: ["cathare", "spectaculaire", "littoral"] },
      { id: "crepuscule-maritime", label: "Crépuscule maritime", tags: ["crepusculaire", "maritime"] },
    ],
    rows: [
      { id: "ecrans-populaires", label: "Écrans populaires", tags: ["cinema", "culture_pop"] },
      { id: "ports-navals", label: "Ports navals", tags: ["naval", "portuaire"] },
      { id: "falaises-atlantiques", label: "Falaises atlantiques", tags: ["falaises", "littoral"] },
    ],
  },
  {
    id: "033",
    difficulty: "expert",
    title: "Grille façades alternatives",
    dateLabel: "Édition façades alternatives",
    columns: [
      { id: "naval", label: "Naval", tags: ["naval", "portuaire"] },
      { id: "phares", label: "Phares", tags: ["phares", "maritime"] },
      { id: "brutaliste", label: "Brutaliste", tags: ["brutaliste", "industriel"] },
    ],
    rows: [
      { id: "icones-publiques", label: "Icônes publiques", tags: ["iconique", "culture_pop", "monumental"] },
      { id: "ciels-crepusculaires", label: "Ciels crépusculaires", tags: ["crepusculaire", "rude", "industriel", "melancolique"] },
      { id: "reliefs-techniques", label: "Reliefs techniques", tags: ["volcanique", "spectaculaire", "littoral"] },
    ],
  },
];

export const GRID_CALENDAR_START_DATE = "2026-06-13";

const DAY_IN_MS = 86400000;

function toUtcDay(value) {
  if (typeof value === "string") {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  }

  return Date.UTC(value.getFullYear(), value.getMonth(), value.getDate());
}

export function getGridCalendarState(date = new Date()) {
  const daysElapsed = Math.floor(
    (toUtcDay(date) - toUtcDay(GRID_CALENDAR_START_DATE)) / DAY_IN_MS
  );
  const currentIndex = Math.max(0, daysElapsed);
  const isBeforeStart = daysElapsed < 0;
  const gridCount = getGridCount();
  const isExhausted = !isBeforeStart && currentIndex >= gridCount;
  const todayGrid = !isBeforeStart && !isExhausted ? getGridByIndex(currentIndex) : null;
  const pastGrids = !isBeforeStart ? getGridsSlice(0, Math.min(currentIndex, gridCount)) : [];
  const unlockedGrids = todayGrid ? [...pastGrids, todayGrid] : pastGrids;
  const state = {
    startDate: GRID_CALENDAR_START_DATE,
    daysElapsed,
    currentIndex,
    todayGrid,
    pastGrids,
    unlockedGrids,
    isBeforeStart,
    isExhausted,
  };

  Object.defineProperty(state, "futureGrids", {
    enumerable: true,
    get() {
      if (isBeforeStart) return getAllGrids();
      if (isExhausted) return [];
      return getGridsSlice(currentIndex + 1, gridCount);
    },
  });

  return state;
}

export function getTodayGrid(date = new Date()) {
  return getGridCalendarState(date).todayGrid;
}

const departmentPlaces = {
  "29": [
    { name: "Pointe du Raz", type: "paysage", image: "", fact: "Ce cap battu par l’Atlantique concentre l’imaginaire du bout du monde breton." },
    { name: "Phare d’Eckmühl", type: "phare", image: "", fact: "Il domine Penmarc’h avec plus de 300 marches et reste l’un des phares les plus célèbres du littoral." },
    { name: "Enclos paroissial de Saint-Thégonnec", type: "patrimoine religieux", image: "", fact: "L’enclos rappelle la prospérité toilière du Léon, qui finança ces grands ensembles paroissiaux." },
  ],
  "62": [
    { name: "Cap Blanc-Nez", type: "paysage", image: "", fact: "Par temps clair, les falaises anglaises se devinent de l’autre côté du détroit." },
    { name: "Louvre-Lens", type: "musée", image: "", fact: "Le musée a été installé au cœur d’un ancien bassin minier, comme un signal culturel fort." },
    { name: "Terrils jumeaux de Loos-en-Gohelle", type: "site industriel", image: "", fact: "Ces deux terrils sont devenus des belvédères noirs sur l’ancien bassin minier." },
  ],
  "63": [
    { name: "Chaîne des Puys", type: "paysage volcanique", image: "", fact: "Cet alignement de volcans est inscrit à l’UNESCO pour sa lecture spectaculaire de la tectonique." },
    { name: "Aventure Michelin", type: "site industriel", image: "", fact: "Clermont-Ferrand reste indissociable de l’histoire mondiale du pneu Michelin." },
    { name: "Notre-Dame-du-Port", type: "monument", image: "", fact: "La basilique romane en arkose blonde contraste avec la cathédrale noire en pierre de Volvic." },
  ],
  "13": [
    { name: "Calanques de Marseille", type: "paysage", image: "", fact: "Le parc national mêle falaises calcaires, criques et proximité immédiate de la ville." },
    { name: "Cité Radieuse", type: "architecture brutaliste", image: "", fact: "L’immeuble de Le Corbusier a profondément marqué l’histoire du logement moderne." },
    { name: "Vieux-Port de Marseille", type: "port", image: "", fact: "Autour de ce bassin ancien s’est construite une partie de l’histoire grecque et maritime de Marseille." },
  ],
  "24": [
    { name: "Lascaux", type: "site préhistorique", image: "", fact: "La grotte originale a été fermée pour la préserver, mais ses fac-similés restent des références mondiales." },
    { name: "Sarlat-la-Canéda", type: "ville patrimoniale", image: "", fact: "Son centre ancien est l’un des ensembles médiévaux et Renaissance les plus denses de France." },
    { name: "Château de Beynac", type: "château", image: "", fact: "Il surveille la vallée de la Dordogne depuis un éperon rocheux spectaculaire." },
  ],
  "48": [
    { name: "Gorges du Tarn", type: "paysage", image: "", fact: "Les gorges forment un couloir calcaire monumental entre Lozère et Aveyron." },
    { name: "Mont Lozère", type: "montagne", image: "", fact: "Ses hauts plateaux donnent au département une silhouette rude et très ouverte." },
    { name: "Aven Armand", type: "grotte", image: "", fact: "La cavité abrite une forêt de stalagmites parmi les plus impressionnantes d’Europe." },
  ],
  "11": [
    { name: "Cité de Carcassonne", type: "monument", image: "", fact: "Ses remparts restaurés au XIXe siècle ont façonné l’image populaire du Moyen Âge français." },
    { name: "Châteaux de Lastours", type: "site cathare", image: "", fact: "Quatre forteresses dominent le même éperon rocheux au-dessus de la vallée de l’Orbiel." },
    { name: "Canal du Midi", type: "ouvrage d’art", image: "", fact: "Le canal relie l’Atlantique à la Méditerranée et traverse l’Aude comme une ligne d’ingénierie douce." },
  ],
  "55": [
    { name: "Champ de bataille de Verdun", type: "mémoire", image: "", fact: "Verdun reste l’un des lieux les plus forts de la mémoire de la Première Guerre mondiale." },
    { name: "Fleury-devant-Douaumont", type: "village détruit", image: "", fact: "Le village n’a plus d’habitants, mais existe toujours comme commune de mémoire près de Verdun." },
    { name: "Butte de Montsec", type: "monument", image: "", fact: "Le mémorial américain domine la plaine de la Woëvre et le lac de Madine." },
  ],
  "23": [
    { name: "Plateau de Millevaches", type: "paysage", image: "", fact: "Son nom est souvent rapproché de “mille sources”, même si l’étymologie reste discutée." },
    { name: "Cité internationale de la tapisserie", type: "savoir-faire", image: "", fact: "Aubusson porte un savoir-faire textile reconnu au patrimoine culturel immatériel de l’UNESCO." },
    { name: "Vallée des Peintres", type: "paysage artistique", image: "", fact: "Ses paysages de la Creuse ont attiré de nombreux peintres impressionnistes et postimpressionnistes." },
  ],
  "52": [
    { name: "Remparts de Langres", type: "monument", image: "", fact: "La ville natale de Diderot conserve un tour de remparts très lisible." },
    { name: "Colombey-les-Deux-Églises", type: "mémoire", image: "", fact: "Le village reste associé à Charles de Gaulle et à la Croix de Lorraine." },
    { name: "Metallurgic Park", type: "site industriel", image: "", fact: "Le site rappelle le poids ancien de la métallurgie haut-marnaise." },
  ],
  "75": [
    { name: "Notre-Dame de Paris", type: "monument", image: "", fact: "La cathédrale reste un repère mondial de l’architecture gothique." },
    { name: "Centre Pompidou", type: "architecture", image: "", fact: "Ses tuyaux colorés ont transformé un équipement culturel en icône urbaine." },
    { name: "Canal Saint-Martin", type: "paysage urbain", image: "", fact: "Creusé sous l’impulsion de Napoléon, il servait à apporter eau potable et marchandises dans Paris." },
  ],
  "06": [
    { name: "Promenade des Anglais", type: "front de mer", image: "", fact: "Elle doit son nom aux hivernants britanniques qui ont marqué Nice au XIXe siècle." },
    { name: "Villa Ephrussi de Rothschild", type: "monument", image: "", fact: "La villa concentre jardins, collections et imaginaire Belle Époque face à la Méditerranée." },
    { name: "Vallée des Merveilles", type: "site rupestre", image: "", fact: "Le Mercantour abrite des milliers de gravures protohistoriques en altitude." },
  ],
  "90": [
    { name: "Lion de Belfort", type: "monument", image: "", fact: "Cette œuvre monumentale de Bartholdi commémore la résistance de Belfort après 1870." },
    { name: "Citadelle de Belfort", type: "fortification", image: "", fact: "La citadelle domine la ville et raconte son rôle stratégique entre Vosges et Jura." },
    { name: "Ballon d’Alsace", type: "paysage", image: "", fact: "Ce sommet partagé marque une porte naturelle entre plusieurs régions de l’Est." },
  ],
  "50": [
    { name: "Mont-Saint-Michel", type: "monument", image: "", fact: "L’abbaye et sa baie forment l’un des paysages culturels les plus connus d’Europe." },
    { name: "Phare de Gatteville", type: "phare", image: "", fact: "Il compte autant de marches que de jours dans l’année, un détail souvent retenu par les visiteurs." },
    { name: "Cité de la Mer", type: "site maritime", image: "", fact: "Installée à Cherbourg, elle occupe l’ancienne gare maritime transatlantique." },
  ],
  "44": [
    { name: "Chantiers de l’Atlantique", type: "site industriel", image: "", fact: "Saint-Nazaire construit certains des plus grands paquebots du monde." },
    { name: "Machines de l’île", type: "culture populaire", image: "", fact: "Le Grand Éléphant transforme l’ancien imaginaire industriel nantais en spectacle vivant." },
    { name: "Passage Pommeraye", type: "architecture", image: "", fact: "Cette galerie du XIXe siècle a servi de décor à Jacques Demy et reste un symbole nantais." },
  ],
  "59": [
    { name: "Villa Cavrois", type: "architecture moderniste", image: "", fact: "Cette maison manifeste de Mallet-Stevens a été sauvée après une longue restauration." },
    { name: "Port de Dunkerque", type: "port", image: "", fact: "Il donne au Nord une façade maritime industrielle souvent sous-estimée." },
    { name: "La Piscine de Roubaix", type: "musée", image: "", fact: "L’ancien bassin Art déco est devenu un musée à l’atmosphère très singulière." },
  ],
  "76": [
    { name: "Falaises d’Étretat", type: "paysage", image: "", fact: "Leur silhouette a inspiré peintres, écrivains et affiches touristiques." },
    { name: "Le Havre reconstruit", type: "architecture", image: "", fact: "Le centre reconstruit par Auguste Perret est inscrit à l’UNESCO." },
    { name: "Abbaye de Jumièges", type: "ruine monumentale", image: "", fact: "Victor Hugo la surnommait l’une des plus belles ruines de France." },
  ],
  "83": [
    { name: "Île de Port-Cros", type: "paysage littoral", image: "", fact: "Elle forme le cœur d’un des plus anciens parcs nationaux français." },
    { name: "Massif de l’Estérel", type: "paysage", image: "", fact: "Ses roches rouges créent un contraste très fort avec la Méditerranée." },
    { name: "Chartreuse de la Verne", type: "monument", image: "", fact: "Le monastère domine les Maures dans un décor forestier inattendu pour le littoral varois." },
  ],
  "34": [
    { name: "Lac du Salagou", type: "paysage", image: "", fact: "Ses terres rouges donnent au paysage héraultais une couleur minérale très graphique." },
    { name: "Cirque de Navacelles", type: "paysage", image: "", fact: "Le méandre abandonné dessine un amphithéâtre naturel spectaculaire." },
    { name: "Place de la Comédie", type: "place urbaine", image: "", fact: "Surnommée l’Œuf, elle reste le grand repère populaire du centre de Montpellier." },
  ],
  "33": [
    { name: "Dune du Pilat", type: "paysage", image: "", fact: "La plus haute dune d’Europe avance et se transforme sous l’effet du vent." },
    { name: "Cité du Vin", type: "architecture culturelle", image: "", fact: "Son bâtiment signale la place mondiale de Bordeaux dans la culture du vin." },
    { name: "Phare de Cordouan", type: "phare", image: "", fact: "Surnommé le Versailles de la mer, il garde l’entrée de l’estuaire de la Gironde." },
  ],
  "17": [
    { name: "Fort Boyard", type: "fort maritime", image: "", fact: "Le fort est devenu un lieu de culture populaire bien au-delà de son rôle militaire initial." },
    { name: "Phare des Baleines", type: "phare", image: "", fact: "Il marque la pointe occidentale de l’île de Ré avec une silhouette très familière." },
    { name: "Tours de La Rochelle", type: "monument", image: "", fact: "Elles rappellent la puissance portuaire de La Rochelle au Moyen Âge." },
  ],
  "56": [
    { name: "Alignements de Carnac", type: "site mégalithique", image: "", fact: "Des milliers de menhirs composent l’un des ensembles préhistoriques les plus célèbres d’Europe." },
    { name: "Golfe du Morbihan", type: "paysage maritime", image: "", fact: "Son nom signifie petite mer en breton, une description très exacte du lieu." },
    { name: "Port de Saint-Goustan", type: "port historique", image: "", fact: "Benjamin Franklin y débarqua en 1776 avant de rejoindre Paris pour défendre la cause américaine." },
  ],
  "22": [
    { name: "Côte de Granit Rose", type: "paysage", image: "", fact: "Ses blocs de granit rose donnent au littoral une identité immédiatement reconnaissable." },
    { name: "Cap Fréhel", type: "falaise", image: "", fact: "Le cap offre l’un des grands panoramas de la côte nord bretonne." },
    { name: "Abbaye de Beauport", type: "monument", image: "", fact: "Ses ruines ouvertes sur la mer mêlent patrimoine religieux et paysage maritime." },
  ],
  "14": [
    { name: "Omaha Beach", type: "mémoire", image: "", fact: "La plage reste l’un des lieux les plus connus du Débarquement de 1944." },
    { name: "Mémorial de Caen", type: "musée", image: "", fact: "Le musée relie l’histoire du Débarquement à une lecture plus large du XXe siècle." },
    { name: "Port artificiel d’Arromanches", type: "site militaire", image: "", fact: "Des vestiges du port Mulberry restent visibles au large." },
  ],
  "73": [
    { name: "Lac du Bourget", type: "paysage", image: "", fact: "Le plus grand lac naturel d’origine glaciaire entièrement français a inspiré Lamartine." },
    { name: "Col de l’Iseran", type: "route de montagne", image: "", fact: "C’est l’un des plus hauts cols routiers des Alpes." },
    { name: "Forts de l’Esseillon", type: "fortification", image: "", fact: "Ces forts surveillaient la route alpine du Mont-Cenis." },
  ],
  "74": [
    { name: "Mont Blanc", type: "montagne", image: "", fact: "Le sommet donne à la Haute-Savoie une visibilité alpine immédiate." },
    { name: "Lac d’Annecy", type: "paysage", image: "", fact: "Ses eaux très claires ont fait d’Annecy une image touristique durable." },
    { name: "Aiguille du Midi", type: "belvédère", image: "", fact: "Le téléphérique place le visiteur au contact direct de la haute montagne." },
  ],
  "64": [
    { name: "Rocher de la Vierge", type: "site littoral", image: "", fact: "La passerelle et le rocher sont devenus l’un des emblèmes de Biarritz." },
    { name: "Pic du Midi d’Ossau", type: "montagne", image: "", fact: "Sa silhouette isolée est l’un des repères visuels du Béarn." },
    { name: "Saint-Jean-Pied-de-Port", type: "village", image: "", fact: "La ville est une étape majeure sur les chemins de Compostelle." },
  ],
  "67": [
    { name: "Cathédrale de Strasbourg", type: "monument", image: "", fact: "Avec sa flèche de 142 mètres, elle fut longtemps l’un des plus hauts édifices d’Europe." },
    { name: "Petite France", type: "quartier", image: "", fact: "Le quartier rappelle le Strasbourg des canaux, tanneurs et maisons à colombages." },
    { name: "Château du Haut-Koenigsbourg", type: "château", image: "", fact: "La restauration impériale en a fait un château médiéval très théâtral." },
  ],
  "57": [
    { name: "Centre Pompidou-Metz", type: "architecture culturelle", image: "", fact: "Son toit inspiré d’un chapeau chinois a créé un nouveau repère contemporain à Metz." },
    { name: "Haut Fourneau U4", type: "site industriel", image: "", fact: "Le géant sidérurgique préservé rappelle la puissance industrielle lorraine." },
    { name: "Ouvrage du Hackenberg", type: "fortification", image: "", fact: "C’est l’un des ensembles majeurs de la ligne Maginot." },
  ],
  "89": [
    { name: "Vézelay", type: "village-monument", image: "", fact: "La basilique et la colline sont inscrites à l’UNESCO." },
    { name: "Guédelon", type: "chantier médiéval", image: "", fact: "Le château est construit avec les techniques du XIIIe siècle." },
    { name: "Abbaye de Pontigny", type: "monument", image: "", fact: "Cette abbaye cistercienne témoigne d’un patrimoine religieux sobre et puissant." },
  ],
  "01": [
    { name: "Monastère royal de Brou", type: "monument", image: "", fact: "Marguerite d’Autriche en a fait un chef-d’œuvre gothique flamboyant." },
    { name: "Parc des Oiseaux", type: "site naturel", image: "", fact: "La Dombes est un paysage d’étangs très favorable aux oiseaux." },
    { name: "Pérouges", type: "village", image: "", fact: "La cité médiévale est souvent utilisée comme décor historique." },
  ],
  "03": [
    { name: "Vichy", type: "ville thermale", image: "", fact: "La ville fait partie des grandes villes d’eaux européennes reconnues par l’UNESCO." },
    { name: "Forêt de Tronçais", type: "forêt", image: "", fact: "Ses chênes sont réputés pour la tonnellerie." },
    { name: "Bourbon-l’Archambault", type: "château", image: "", fact: "Le nom rappelle le berceau historique de la dynastie des Bourbons." },
  ],
  "05": [
    { name: "Barre des Écrins", type: "montagne", image: "", fact: "Le sommet est le point culminant du massif des Écrins." },
    { name: "Mont-Dauphin", type: "fortification", image: "", fact: "La place forte de Vauban est inscrite au patrimoine mondial de l’UNESCO." },
    { name: "Lac de Serre-Ponçon", type: "paysage", image: "", fact: "Le grand lac artificiel a profondément transformé la vallée de la Durance." },
  ],
  "07": [
    { name: "Pont d’Arc", type: "arche naturelle", image: "", fact: "L’arche marque l’entrée spectaculaire des gorges de l’Ardèche." },
    { name: "Grotte Chauvet", type: "site préhistorique", image: "", fact: "Ses peintures figurent parmi les plus anciennes œuvres connues de l’humanité." },
    { name: "Mont Gerbier-de-Jonc", type: "paysage volcanique", image: "", fact: "Le site est traditionnellement associé aux sources de la Loire." },
  ],
  "09": [
    { name: "Château de Montségur", type: "site cathare", image: "", fact: "Le site perché reste l’un des symboles les plus forts de l’imaginaire cathare." },
    { name: "Grotte de Niaux", type: "site préhistorique", image: "", fact: "La grotte conserve des peintures pariétales encore visibles dans leur contexte naturel." },
    { name: "Cirque de Cagateille", type: "paysage", image: "", fact: "Le cirque donne à l’Ariège une image de montagne sauvage et encaissée." },
  ],
  "16": [
    { name: "Cité de la BD", type: "culture populaire", image: "", fact: "Angoulême a transformé la bande dessinée en identité culturelle majeure." },
    { name: "Château de Cognac", type: "monument", image: "", fact: "François Ier y est né, avant que le lieu ne devienne lié à une grande maison de cognac." },
    { name: "Aubeterre-sur-Dronne", type: "village", image: "", fact: "Son église souterraine creusée dans la roche est un lieu très singulier." },
  ],
  "19": [
    { name: "Collonges-la-Rouge", type: "village", image: "", fact: "Ses pierres rouges ont contribué à lancer le label des Plus Beaux Villages de France." },
    { name: "Tours de Merle", type: "site médiéval", image: "", fact: "Les ruines dominent une vallée boisée et donnent une image très forte du Limousin." },
    { name: "Canal des Moines d’Aubazine", type: "ouvrage d’eau", image: "", fact: "Creusé à flanc de roche, il amenait l’eau jusqu’à l’abbaye d’Aubazine." },
  ],
  "21": [
    { name: "Hospices de Beaune", type: "monument", image: "", fact: "Ses toits vernissés sont devenus une image iconique de la Bourgogne." },
    { name: "Palais des ducs de Bourgogne", type: "monument", image: "", fact: "Le palais rappelle le poids politique de Dijon dans l’histoire bourguignonne." },
    { name: "Abbaye de Fontenay", type: "monument", image: "", fact: "L’abbaye cistercienne est inscrite au patrimoine mondial de l’UNESCO." },
  ],
  "25": [
    { name: "Citadelle de Besançon", type: "fortification", image: "", fact: "Cette œuvre de Vauban domine une boucle du Doubs." },
    { name: "Saline royale d’Arc-et-Senans", type: "site industriel", image: "", fact: "L’ensemble imaginé par Ledoux est une utopie industrielle du XVIIIe siècle." },
    { name: "Saut du Doubs", type: "paysage", image: "", fact: "La chute d’eau marque la frontière naturelle avec la Suisse." },
  ],
  "30": [
    { name: "Pont du Gard", type: "ouvrage antique", image: "", fact: "L’aqueduc romain reste l’un des monuments antiques les plus spectaculaires de France." },
    { name: "Arènes de Nîmes", type: "monument", image: "", fact: "L’amphithéâtre est encore utilisé pour des spectacles et événements." },
    { name: "Aigues-Mortes", type: "ville fortifiée", image: "", fact: "Ses remparts surgissent au bord des paysages plats de Camargue." },
  ],
  "35": [
    { name: "Remparts de Saint-Malo", type: "ville fortifiée", image: "", fact: "La cité corsaire regarde la Manche comme une ville presque posée sur la mer." },
    { name: "Parlement de Bretagne", type: "monument", image: "", fact: "Le bâtiment est l’un des grands symboles historiques de Rennes." },
    { name: "Forêt de Brocéliande", type: "forêt légendaire", image: "", fact: "Le massif alimente l’imaginaire arthurien aux marges de la Bretagne." },
  ],
  "38": [
    { name: "Bastille de Grenoble", type: "belvédère", image: "", fact: "Les bulles du téléphérique sont devenues un symbole de Grenoble." },
    { name: "Grande Chartreuse", type: "monastère", image: "", fact: "Le massif a donné son nom à l’ordre des Chartreux et à la liqueur." },
    { name: "Musée de la Houille blanche", type: "site industriel", image: "", fact: "Il rappelle le rôle de l’énergie hydraulique dans l’industrialisation alpine." },
  ],
  "39": [
    { name: "Cascades du Hérisson", type: "paysage", image: "", fact: "La succession de chutes d’eau donne au Jura un décor très identifiable." },
    { name: "Grande Saline de Salins-les-Bains", type: "site industriel", image: "", fact: "L’exploitation du sel y a structuré une partie de l’histoire jurassienne." },
    { name: "Baume-les-Messieurs", type: "village", image: "", fact: "Le village se niche dans une reculée calcaire typique du Jura." },
  ],
  "40": [
    { name: "Courant d’Huchet", type: "site naturel", image: "", fact: "Ce cours d’eau relie l’étang de Léon à l’océan dans un paysage presque tropical." },
    { name: "Écomusée de Marquèze", type: "patrimoine rural", image: "", fact: "Le site raconte la vie dans la Grande Lande avant les transformations modernes." },
    { name: "Estacade de Capbreton", type: "site littoral", image: "", fact: "La longue jetée marque l’entrée du port et la force de l’Atlantique." },
  ],
  "43": [
    { name: "Rocher Saint-Michel d’Aiguilhe", type: "monument volcanique", image: "", fact: "La chapelle est posée au sommet d’une ancienne cheminée volcanique." },
    { name: "Abbaye de La Chaise-Dieu", type: "monument", image: "", fact: "L’abbaye relie patrimoine religieux, musique et haut plateau auvergnat." },
    { name: "Mont Mézenc", type: "montagne", image: "", fact: "Le sommet marque un paysage de hautes terres entre Auvergne et Vivarais." },
  ],
  "46": [
    { name: "Rocamadour", type: "village sanctuaire", image: "", fact: "Le village s’accroche à la falaise en strates spectaculaires." },
    { name: "Gouffre de Padirac", type: "grotte", image: "", fact: "La rivière souterraine se visite en barque sous terre." },
    { name: "Saint-Cirq-Lapopie", type: "village", image: "", fact: "Le village domine le Lot et a longtemps attiré artistes et écrivains." },
  ],
  "54": [
    { name: "Place Stanislas", type: "monument", image: "", fact: "La place nancéienne est inscrite à l’UNESCO avec son ensemble urbain du XVIIIe siècle." },
    { name: "Villa Majorelle", type: "architecture Art nouveau", image: "", fact: "Elle incarne l’École de Nancy et l’élan décoratif de l’Art nouveau." },
    { name: "Château de Lunéville", type: "monument", image: "", fact: "On le surnomme parfois le Versailles lorrain." },
  ],
  "58": [
    { name: "Palais ducal de Nevers", type: "monument", image: "", fact: "Il rappelle l’importance de Nevers dans l’histoire du duché." },
    { name: "Canal du Nivernais", type: "ouvrage d’eau", image: "", fact: "Le canal donne à la Nièvre un paysage lent de halage et d’écluses." },
    { name: "Mont Beuvray", type: "site archéologique", image: "", fact: "À la limite de la Nièvre et de la Saône-et-Loire, Bibracte raconte la puissance gauloise." },
  ],
  "68": [
    { name: "Petite Venise de Colmar", type: "quartier", image: "", fact: "Les canaux de la Lauch y encadrent l’une des images les plus connues de Colmar." },
    { name: "Hartmannswillerkopf", type: "mémoire", image: "", fact: "Le Vieil Armand reste un lieu majeur de mémoire de la Grande Guerre dans les Vosges." },
    { name: "Écomusée d’Alsace", type: "patrimoine rural", image: "", fact: "Le site recompose un village alsacien à partir de bâtiments sauvés." },
  ],
  "85": [
    { name: "Passage du Gois", type: "paysage littoral", image: "", fact: "Cette route submersible disparaît sous la mer à marée haute." },
    { name: "Puy du Fou", type: "spectacle historique", image: "", fact: "Le parc a popularisé une forme de récit historique spectaculaire." },
    { name: "Abbaye de Maillezais", type: "ruine monumentale", image: "", fact: "Ses vestiges dominent l’ancien paysage insulaire du Marais poitevin." },
  ],
};

const baseDepartments = [
  { name: "Finistère", code: "29", region: "Bretagne", tier: "Évident", prestige: 4, tags: ["littoral","maritime","sauvage","spectaculaire","melancolique","phares","falaises","culture_celte","iconique","crepusculaire"], anecdote: "Entre phares, pointes battues par l’Atlantique et tempêtes, le Finistère coche très vite l’imaginaire maritime français." },
  { name: "Pas-de-Calais", code: "62", region: "Hauts-de-France", tier: "Fort", prestige: 5, tags: ["littoral","industriel","minier","melancolique","cinema","memoire","ouvrier","rude","crepusculaire"], anecdote: "Terrils, mémoire ouvrière et grands ciels du Nord donnent au Pas-de-Calais une puissance visuelle très reconnaissable." },
  { name: "Puy-de-Dôme", code: "63", region: "Auvergne-Rhône-Alpes", tier: "Élégant", prestige: 7, tags: ["industriel","spectaculaire","melancolique","volcanique","architecture","michelin","mineral","brutaliste"], anecdote: "Clermont-Ferrand, Michelin et la pierre volcanique donnent au Puy-de-Dôme une identité industrielle et minérale singulière." },
  { name: "Bouches-du-Rhône", code: "13", region: "Provence-Alpes-Côte d’Azur", tier: "Évident", prestige: 3, tags: ["littoral","cinema","architecture","spectaculaire","mediterraneen","portuaire","iconique","naval"], anecdote: "De Marseille aux calanques, le département concentre mer, cinéma et architecture méditerranéenne." },
  { name: "Dordogne", code: "24", region: "Nouvelle-Aquitaine", tier: "Fort", prestige: 5, tags: ["architecture","cinema","spectaculaire","patrimoine","villages","prehistoire","medieval","iconique"], anecdote: "La Dordogne fonctionne comme une réserve d’images patrimoniales : villages, falaises, châteaux et préhistoire." },
  { name: "Lozère", code: "48", region: "Occitanie", tier: "Rare", prestige: 8, tags: ["spectaculaire","melancolique","sauvage","montagne","rural","falaises","volcanique"], anecdote: "Peu dense, rude et spectaculaire, la Lozère devient vite un choix d’esthète dans une grille bien construite." },
  { name: "Aude", code: "11", region: "Occitanie", tier: "Fort", prestige: 6, tags: ["littoral","architecture","spectaculaire","medieval","cathare","cinema"], anecdote: "Entre cités cathares, littoral et paysages secs, l’Aude peut se glisser dans des cases très différentes." },
  { name: "Meuse", code: "55", region: "Grand Est", tier: "Underdog", prestige: 9, tags: ["melancolique","industriel","memoire","guerre","patrimoine","rural"], anecdote: "Certains villages détruits durant la Première Guerre mondiale existent encore administrativement, malgré l’absence d’habitants." },
  { name: "Creuse", code: "23", region: "Nouvelle-Aquitaine", tier: "Underdog", prestige: 10, selectionRate: 3, tags: ["melancolique","spectaculaire","rural","sauvage","underdog"], anecdote: "La Creuse est typiquement un département discret, difficile à placer, mais très rentable quand le placement est juste." },
  { name: "Haute-Marne", code: "52", region: "Grand Est", tier: "Underdog", prestige: 9, tags: ["industriel","melancolique","architecture","rural","patrimoine","underdog"], anecdote: "La Haute-Marne peut devenir un choix rare dès qu’une grille laisse entrer l’industrie, la ruralité ou le patrimoine discret." },
  { name: "Paris", code: "75", region: "Île-de-France", tier: "Évident", prestige: 1, selectionRate: 92, tags: ["architecture","cinema","patrimoine","monumental","culture_pop","iconique"], anecdote: "Paris est souvent valide, mais rarement audacieux. Un choix confortable, rarement un coup de génie." },
  { name: "Alpes-Maritimes", code: "06", region: "Provence-Alpes-Côte d’Azur", tier: "Évident", prestige: 3, tags: ["littoral","cinema","spectaculaire","architecture","montagne","mediterraneen","iconique"], anecdote: "Mer, montagne, cinéma et architecture Belle Époque en font un département très puissant, donc souvent peu prestigieux." },
  { name: "Territoire de Belfort", code: "90", region: "Bourgogne-Franche-Comté", tier: "Underdog", prestige: 10, selectionRate: 4, tags: ["industriel","architecture","patrimoine","memoire","underdog"], anecdote: "Petit, spécifique, parfois oublié, le Territoire de Belfort peut devenir un placement très élégant." },
  { name: "Manche", code: "50", region: "Normandie", tier: "Élégant", prestige: 6, tags: ["littoral","maritime","melancolique","cinema","architecture","memoire","phares","crepusculaire"], anecdote: "Entre caps, ports, mémoire du Débarquement et ciels changeants, la Manche se défend très bien dans les cases maritimes." },
  { name: "Loire-Atlantique", code: "44", region: "Pays de la Loire", tier: "Fort", prestige: 5, tags: ["littoral","industriel","architecture","cinema","naval","portuaire","brutaliste"], anecdote: "Saint-Nazaire donne à la Loire-Atlantique un poids industriel et maritime évident, mais encore sous-exploité en jeu." },
  { name: "Nord", code: "59", region: "Hauts-de-France", tier: "Fort", prestige: 5, selectionRate: 34, tags: ["industriel","minier","ouvrier","littoral","portuaire","architecture","memoire","rude","culture_pop","brutaliste","naval"], anecdote: "Entre Lille, Dunkerque et les traces minières, le Nord ouvre beaucoup de placements solides mais rarement gratuits." },
  { name: "Seine-Maritime", code: "76", region: "Normandie", tier: "Fort", prestige: 5, selectionRate: 28, tags: ["littoral","maritime","portuaire","falaises","industriel","architecture","memoire","melancolique","brutaliste","naval","phares","crepusculaire"], anecdote: "Falaises, ports et mémoire normande en font un département très utile dès que la grille regarde vers la Manche." },
  { name: "Var", code: "83", region: "Provence-Alpes-Côte d’Azur", tier: "Évident", prestige: 4, selectionRate: 40, tags: ["littoral","mediterraneen","spectaculaire","sauvage","cinema","architecture","patrimoine","rural"], anecdote: "Le Var combine rivages méditerranéens, villages et massifs secs, avec une efficacité assez visible." },
  { name: "Hérault", code: "34", region: "Occitanie", tier: "Fort", prestige: 5, selectionRate: 35, tags: ["littoral","mediterraneen","architecture","patrimoine","spectaculaire","villages","cinema","rural"], anecdote: "Entre Montpellier, les villages de l’arrière-pays et le littoral, l’Hérault couvre plusieurs registres du Sud." },
  { name: "Gironde", code: "33", region: "Nouvelle-Aquitaine", tier: "Évident", prestige: 4, selectionRate: 45, tags: ["littoral","maritime","portuaire","architecture","patrimoine","cinema","culture_pop","rural","naval"], anecdote: "Bordeaux, l’estuaire et le bassin d’Arcachon rendent la Gironde très polyvalente, donc assez attendue." },
  { name: "Charente-Maritime", code: "17", region: "Nouvelle-Aquitaine", tier: "Fort", prestige: 5, selectionRate: 30, tags: ["littoral","maritime","portuaire","architecture","patrimoine","rural","melancolique","phares","naval"], anecdote: "Ports, îles, phares et vieilles pierres donnent à la Charente-Maritime un profil côtier complet." },
  { name: "Morbihan", code: "56", region: "Bretagne", tier: "Élégant", prestige: 6, selectionRate: 26, tags: ["littoral","maritime","culture_celte","sauvage","prehistoire","patrimoine","villages","melancolique","phares"], anecdote: "Golfe, mégalithes et Bretagne intérieure font du Morbihan un choix côtier plus subtil qu’il n’y paraît." },
  { name: "Côtes-d’Armor", code: "22", region: "Bretagne", tier: "Élégant", prestige: 6, selectionRate: 22, tags: ["littoral","maritime","culture_celte","sauvage","falaises","melancolique","patrimoine","rural","phares","crepusculaire"], anecdote: "La côte découpée, les caps et l’arrière-pays rural offrent aux Côtes-d’Armor une belle souplesse de placement." },
  { name: "Calvados", code: "14", region: "Normandie", tier: "Fort", prestige: 5, selectionRate: 27, tags: ["littoral","maritime","memoire","guerre","architecture","cinema","patrimoine","melancolique","iconique"], anecdote: "Plages du Débarquement, villes reconstruites et paysages normands donnent au Calvados une présence claire." },
  { name: "Savoie", code: "73", region: "Auvergne-Rhône-Alpes", tier: "Fort", prestige: 5, selectionRate: 31, tags: ["montagne","spectaculaire","sauvage","rural","architecture","patrimoine","mineral","melancolique"], anecdote: "La Savoie apporte une réponse alpine solide, entre relief spectaculaire, vallées et patrimoine de montagne." },
  { name: "Haute-Savoie", code: "74", region: "Auvergne-Rhône-Alpes", tier: "Évident", prestige: 4, selectionRate: 36, tags: ["montagne","spectaculaire","sauvage","architecture","patrimoine","cinema","monumental","rural"], anecdote: "Mont Blanc, lacs et stations rendent la Haute-Savoie très lisible sur les cases de montagne et de paysage." },
  { name: "Pyrénées-Atlantiques", code: "64", region: "Nouvelle-Aquitaine", tier: "Élégant", prestige: 6, selectionRate: 24, tags: ["montagne","littoral","maritime","spectaculaire","sauvage","rural","patrimoine","cinema"], anecdote: "Entre côte basque et Pyrénées, le département permet des arbitrages intéressants entre mer et relief." },
  { name: "Bas-Rhin", code: "67", region: "Grand Est", tier: "Fort", prestige: 5, selectionRate: 26, tags: ["architecture","patrimoine","medieval","monumental","memoire","guerre","culture_pop","industriel"], anecdote: "Strasbourg, les villages alsaciens et la mémoire frontalière donnent au Bas-Rhin une identité très structurée." },
  { name: "Moselle", code: "57", region: "Grand Est", tier: "Élégant", prestige: 7, selectionRate: 16, tags: ["industriel","minier","ouvrier","memoire","guerre","architecture","patrimoine","rude"], anecdote: "La Moselle se place bien sur les croisements industriels, mémoriels ou frontaliers, sans être un réflexe immédiat." },
  { name: "Yonne", code: "89", region: "Bourgogne-Franche-Comté", tier: "Rare", prestige: 8, selectionRate: 10, tags: ["rural","patrimoine","medieval","villages","architecture","melancolique","underdog","memoire"], anecdote: "L’Yonne fonctionne comme un choix discret de patrimoine rural, rentable quand la grille évite les évidences." },
  { name: "Ain", code: "01", region: "Auvergne-Rhône-Alpes", tier: "Élégant", prestige: 6, selectionRate: 18, tags: ["rural","montagne","sauvage","patrimoine","architecture","industriel","villages","melancolique"], anecdote: "Entre Bresse, Dombes et contreforts du Jura, l’Ain ajoute un profil rural et frontalier assez souple." },
  { name: "Allier", code: "03", region: "Auvergne-Rhône-Alpes", tier: "Rare", prestige: 8, selectionRate: 12, tags: ["rural","patrimoine","industriel","melancolique","architecture","villages","memoire","underdog"], anecdote: "L’Allier fonctionne bien comme choix discret dès qu’une grille mêle ruralité, patrimoine thermal ou traces industrielles." },
  { name: "Hautes-Alpes", code: "05", region: "Provence-Alpes-Côte d’Azur", tier: "Fort", prestige: 6, selectionRate: 21, tags: ["montagne","spectaculaire","sauvage","rural","mineral","melancolique","architecture","patrimoine"], anecdote: "Les Hautes-Alpes apportent une réponse alpine sèche, lumineuse et moins automatique que les grands départements touristiques." },
  { name: "Ardèche", code: "07", region: "Auvergne-Rhône-Alpes", tier: "Fort", prestige: 6, selectionRate: 23, tags: ["rural","spectaculaire","sauvage","falaises","villages","patrimoine","prehistoire","melancolique","volcanique"], anecdote: "Gorges, villages et préhistoire donnent à l’Ardèche une puissance de paysage très identifiable." },
  { name: "Ariège", code: "09", region: "Occitanie", tier: "Rare", prestige: 8, selectionRate: 11, tags: ["montagne","sauvage","rural","spectaculaire","medieval","patrimoine","underdog","melancolique"], anecdote: "L’Ariège est un choix de relief intérieur, souvent rare mais très juste sur les cases sauvages ou médiévales." },
  { name: "Charente", code: "16", region: "Nouvelle-Aquitaine", tier: "Élégant", prestige: 6, selectionRate: 18, tags: ["rural","patrimoine","architecture","cinema","culture_pop","industriel","melancolique","villages"], anecdote: "La Charente combine Angoulême, patrimoine discret et campagnes calmes, avec une valeur utile mais rarement évidente." },
  { name: "Corrèze", code: "19", region: "Nouvelle-Aquitaine", tier: "Rare", prestige: 8, selectionRate: 12, tags: ["rural","spectaculaire","sauvage","patrimoine","villages","melancolique","underdog","architecture"], anecdote: "La Corrèze renforce les choix de ruralité dense, de villages et de reliefs discrets." },
  { name: "Côte-d'Or", code: "21", region: "Bourgogne-Franche-Comté", tier: "Fort", prestige: 5, selectionRate: 25, tags: ["patrimoine","medieval","architecture","monumental","rural","villages","cinema","melancolique"], anecdote: "Entre Dijon, vignobles et villages de pierre, la Côte-d’Or apporte un patrimoine très lisible." },
  { name: "Doubs", code: "25", region: "Bourgogne-Franche-Comté", tier: "Élégant", prestige: 7, selectionRate: 16, tags: ["montagne","sauvage","industriel","architecture","patrimoine","memoire","rural","melancolique"], anecdote: "Le Doubs relie relief jurassien, horlogerie, patrimoine et mémoire frontalière sans devenir trop évident." },
  { name: "Gard", code: "30", region: "Occitanie", tier: "Fort", prestige: 5, selectionRate: 29, tags: ["mediterraneen","architecture","patrimoine","monumental","spectaculaire","rural","cinema","medieval"], anecdote: "Le Gard couvre les grands marqueurs du Sud, des arènes aux Cévennes, avec beaucoup de croisements possibles." },
  { name: "Ille-et-Vilaine", code: "35", region: "Bretagne", tier: "Fort", prestige: 5, selectionRate: 24, tags: ["maritime","littoral","culture_celte","architecture","patrimoine","medieval","villages","cinema"], anecdote: "Entre Rennes, Saint-Malo et les marges bretonnes, l’Ille-et-Vilaine équilibre ville, mer et patrimoine." },
  { name: "Isère", code: "38", region: "Auvergne-Rhône-Alpes", tier: "Fort", prestige: 5, selectionRate: 28, tags: ["montagne","spectaculaire","sauvage","industriel","architecture","patrimoine","cinema","rural"], anecdote: "L’Isère rend les cases alpines moins automatiques en ajoutant industrie, ville et relief spectaculaire." },
  { name: "Jura", code: "39", region: "Bourgogne-Franche-Comté", tier: "Élégant", prestige: 7, selectionRate: 17, tags: ["montagne","sauvage","rural","spectaculaire","patrimoine","villages","melancolique","mineral"], anecdote: "Le Jura offre un profil de moyenne montagne, rural et minéral, souvent élégant dans les arbitrages." },
  { name: "Landes", code: "40", region: "Nouvelle-Aquitaine", tier: "Fort", prestige: 5, selectionRate: 27, tags: ["littoral","maritime","sauvage","rural","melancolique","patrimoine","cinema","spectaculaire"], anecdote: "Les Landes ajoutent un littoral atlantique plus horizontal, entre forêt, surf et grands espaces." },
  { name: "Haute-Loire", code: "43", region: "Auvergne-Rhône-Alpes", tier: "Rare", prestige: 8, selectionRate: 11, tags: ["rural","volcanique","spectaculaire","architecture","patrimoine","medieval","melancolique","underdog","mineral"], anecdote: "La Haute-Loire devient précieuse sur les cases de pierre, de relief intérieur et de patrimoine discret." },
  { name: "Lot", code: "46", region: "Occitanie", tier: "Élégant", prestige: 7, selectionRate: 15, tags: ["rural","patrimoine","villages","prehistoire","medieval","spectaculaire","falaises","melancolique"], anecdote: "Le Lot apporte grottes, vallées et villages, avec une vraie force sur les croisements de patrimoine rural." },
  { name: "Meurthe-et-Moselle", code: "54", region: "Grand Est", tier: "Élégant", prestige: 7, selectionRate: 17, tags: ["industriel","architecture","patrimoine","memoire","guerre","ouvrier","monumental","melancolique","brutaliste"], anecdote: "Nancy, les bassins industriels et la mémoire de l’Est donnent à la Meurthe-et-Moselle un rôle très précis." },
  { name: "Nièvre", code: "58", region: "Bourgogne-Franche-Comté", tier: "Underdog", prestige: 9, selectionRate: 7, tags: ["rural","melancolique","patrimoine","underdog","sauvage","industriel","memoire","villages"], anecdote: "La Nièvre est un vrai choix d’optimisation quand la grille valorise la France rurale et discrète." },
  { name: "Haut-Rhin", code: "68", region: "Grand Est", tier: "Fort", prestige: 5, selectionRate: 22, tags: ["architecture","patrimoine","medieval","montagne","spectaculaire","memoire","guerre","culture_pop"], anecdote: "Le Haut-Rhin combine villages alsaciens, Vosges et mémoire frontalière avec une visibilité assez forte." },
  { name: "Vendée", code: "85", region: "Pays de la Loire", tier: "Fort", prestige: 5, selectionRate: 30, tags: ["littoral","maritime","rural","patrimoine","cinema","guerre","memoire","sauvage"], anecdote: "La Vendée renforce les cases de littoral populaire, de mémoire historique et de campagnes atlantiques." },
  { name: "Aisne", code: "02", region: "Hauts-de-France", tier: "Élégant", prestige: 7, tags: ["memoire","guerre","rural","patrimoine","architecture","medieval","melancolique","underdog"], anecdote: "Entre Chemin des Dames, abbayes et campagnes picardes, l’Aisne est un choix mémoriel discret mais solide." },
  { name: "Alpes-de-Haute-Provence", code: "04", region: "Provence-Alpes-Côte d’Azur", tier: "Élégant", prestige: 7, tags: ["montagne","spectaculaire","sauvage","rural","mediterraneen","mineral","villages","melancolique"], anecdote: "Le département mêle haute Provence, gorges, plateaux et villages, avec une identité sèche et spectaculaire." },
  { name: "Ardennes", code: "08", region: "Grand Est", tier: "Rare", prestige: 8, tags: ["rural","industriel","memoire","guerre","sauvage","melancolique","architecture","underdog"], anecdote: "Les Ardennes combinent forêt, mémoire frontalière et traces industrielles dans un registre très marqué." },
  { name: "Aube", code: "10", region: "Grand Est", tier: "Élégant", prestige: 7, tags: ["architecture","patrimoine","medieval","rural","villages","melancolique","memoire","underdog"], anecdote: "Troyes, les églises à pans de bois et les campagnes champenoises donnent à l’Aube un patrimoine fin." },
  { name: "Aveyron", code: "12", region: "Occitanie", tier: "Fort", prestige: 6, tags: ["rural","spectaculaire","sauvage","patrimoine","villages","medieval","falaises","melancolique"], anecdote: "L’Aveyron porte une France de plateaux, gorges et villages puissants, très utile dans les grilles rurales." },
  { name: "Cantal", code: "15", region: "Auvergne-Rhône-Alpes", tier: "Rare", prestige: 8, tags: ["rural","volcanique","montagne","spectaculaire","sauvage","melancolique","mineral","underdog"], anecdote: "Le Cantal donne une réponse volcanique et rurale plus discrète que le Puy-de-Dôme." },
  { name: "Cher", code: "18", region: "Centre-Val de Loire", tier: "Élégant", prestige: 7, tags: ["rural","patrimoine","architecture","medieval","memoire","melancolique","villages","underdog"], anecdote: "Entre Bourges, Berry et campagnes calmes, le Cher s’impose comme un choix patrimonial discret." },
  { name: "Corse-du-Sud", code: "2A", region: "Corse", tier: "Fort", prestige: 6, tags: ["littoral","maritime","montagne","spectaculaire","sauvage","mediterraneen","patrimoine","rural"], anecdote: "De Bonifacio aux aiguilles de Bavella, la Corse-du-Sud concentre mer, relief et silhouettes spectaculaires." },
  { name: "Haute-Corse", code: "2B", region: "Corse", tier: "Fort", prestige: 6, tags: ["littoral","maritime","montagne","sauvage","spectaculaire","mediterraneen","patrimoine","villages"], anecdote: "Cap Corse, Balagne et montagnes intérieures donnent à la Haute-Corse une vraie amplitude territoriale." },
  { name: "Drôme", code: "26", region: "Auvergne-Rhône-Alpes", tier: "Fort", prestige: 6, tags: ["rural","spectaculaire","sauvage","mediterraneen","patrimoine","villages","architecture","melancolique"], anecdote: "La Drôme glisse entre Alpes, Provence et villages perchés, ce qui en fait un département d’arbitrage." },
  { name: "Eure", code: "27", region: "Normandie", tier: "Élégant", prestige: 7, tags: ["rural","patrimoine","architecture","villages","melancolique","memoire","cinema","underdog"], anecdote: "L’Eure apporte une Normandie intérieure de vallées, jardins et patrimoine moins attendue que le littoral." },
  { name: "Eure-et-Loir", code: "28", region: "Centre-Val de Loire", tier: "Fort", prestige: 6, tags: ["architecture","patrimoine","monumental","rural","memoire","melancolique","culture_pop","villages"], anecdote: "Chartres donne au département une force monumentale, adoucie par les paysages ouverts de Beauce." },
  { name: "Haute-Garonne", code: "31", region: "Occitanie", tier: "Fort", prestige: 5, tags: ["architecture","patrimoine","monumental","cinema","culture_pop","montagne","rural","spectaculaire"], anecdote: "Toulouse et les Pyrénées proches donnent à la Haute-Garonne un profil urbain et de relief." },
  { name: "Gers", code: "32", region: "Occitanie", tier: "Rare", prestige: 8, tags: ["rural","patrimoine","villages","melancolique","architecture","medieval","underdog","sauvage"], anecdote: "Le Gers est un choix de campagne patrimoniale lente, rarement évident mais souvent élégant." },
  { name: "Indre", code: "36", region: "Centre-Val de Loire", tier: "Underdog", prestige: 9, tags: ["rural","melancolique","patrimoine","memoire","underdog","villages","sauvage","architecture"], anecdote: "L’Indre fonctionne comme une France discrète de bocage, mémoire et patrimoine littéraire." },
  { name: "Indre-et-Loire", code: "37", region: "Centre-Val de Loire", tier: "Fort", prestige: 5, tags: ["architecture","patrimoine","monumental","medieval","villages","cinema","rural","culture_pop"], anecdote: "Châteaux, Loire et villes historiques rendent l’Indre-et-Loire très lisible sur les cases patrimoniales." },
  { name: "Loir-et-Cher", code: "41", region: "Centre-Val de Loire", tier: "Fort", prestige: 6, tags: ["architecture","patrimoine","monumental","rural","villages","sauvage","cinema","melancolique"], anecdote: "Chambord, la Sologne et les bords de Loire créent un mélange puissant de monument et de nature." },
  { name: "Loire", code: "42", region: "Auvergne-Rhône-Alpes", tier: "Élégant", prestige: 7, tags: ["industriel","ouvrier","architecture","rural","montagne","memoire","melancolique","brutaliste"], anecdote: "Saint-Étienne, le Forez et les traces ouvrières donnent à la Loire un rôle industriel net." },
  { name: "Loiret", code: "45", region: "Centre-Val de Loire", tier: "Élégant", prestige: 6, tags: ["patrimoine","architecture","rural","memoire","guerre","villages","melancolique","monumental"], anecdote: "Orléans, la Loire et la Sologne placent le Loiret entre histoire nationale et paysages de transition." },
  { name: "Lot-et-Garonne", code: "47", region: "Nouvelle-Aquitaine", tier: "Rare", prestige: 8, tags: ["rural","patrimoine","villages","architecture","melancolique","medieval","underdog","sauvage"], anecdote: "Bastides, vallées agricoles et patrimoine discret donnent au Lot-et-Garonne un profil doux mais rentable." },
  { name: "Maine-et-Loire", code: "49", region: "Pays de la Loire", tier: "Fort", prestige: 6, tags: ["patrimoine","architecture","monumental","rural","villages","memoire","cinema","melancolique"], anecdote: "Angers, la Loire et les paysages angevins donnent au Maine-et-Loire une grande souplesse patrimoniale." },
  { name: "Marne", code: "51", region: "Grand Est", tier: "Fort", prestige: 5, tags: ["patrimoine","architecture","monumental","memoire","guerre","rural","culture_pop","melancolique"], anecdote: "Reims, les paysages de Champagne et la mémoire de guerre rendent la Marne très structurante." },
  { name: "Mayenne", code: "53", region: "Pays de la Loire", tier: "Underdog", prestige: 9, tags: ["rural","melancolique","patrimoine","underdog","villages","memoire","sauvage","architecture"], anecdote: "La Mayenne propose une France de bocage et de petites villes, discrète mais très cohérente." },
  { name: "Oise", code: "60", region: "Hauts-de-France", tier: "Fort", prestige: 6, tags: ["architecture","patrimoine","monumental","cinema","memoire","guerre","rural","culture_pop"], anecdote: "Chantilly, Compiègne et les forêts donnent à l’Oise une puissance patrimoniale proche de Paris." },
  { name: "Orne", code: "61", region: "Normandie", tier: "Rare", prestige: 8, tags: ["rural","melancolique","patrimoine","sauvage","villages","memoire","architecture","underdog"], anecdote: "L’Orne porte une Normandie intérieure de haras, forêts et bocage, moins évidente que les côtes." },
  { name: "Hautes-Pyrénées", code: "65", region: "Occitanie", tier: "Fort", prestige: 6, tags: ["montagne","spectaculaire","sauvage","rural","patrimoine","memoire","melancolique","mineral"], anecdote: "Lourdes, Gavarnie et les hauts sommets donnent aux Hautes-Pyrénées une présence très forte." },
  { name: "Pyrénées-Orientales", code: "66", region: "Occitanie", tier: "Fort", prestige: 6, tags: ["littoral","maritime","montagne","spectaculaire","mediterraneen","patrimoine","medieval","sauvage"], anecdote: "Entre Canigou, côte catalane et villages fortifiés, le département combine mer et montagne." },
  { name: "Rhône", code: "69", region: "Auvergne-Rhône-Alpes", tier: "Évident", prestige: 4, tags: ["architecture","patrimoine","monumental","industriel","cinema","culture_pop","brutaliste","rural"], anecdote: "Lyon donne au Rhône une force urbaine, gastronomique et architecturale très lisible." },
  { name: "Haute-Saône", code: "70", region: "Bourgogne-Franche-Comté", tier: "Underdog", prestige: 9, tags: ["rural","melancolique","patrimoine","underdog","architecture","memoire","sauvage","industriel"], anecdote: "La Haute-Saône est un choix de discrétion territoriale, entre plateaux, villages et patrimoine inattendu." },
  { name: "Saône-et-Loire", code: "71", region: "Bourgogne-Franche-Comté", tier: "Fort", prestige: 6, tags: ["rural","patrimoine","architecture","industriel","villages","medieval","memoire","melancolique"], anecdote: "Cluny, Autun, vignobles et traces industrielles donnent à la Saône-et-Loire une belle polyvalence." },
  { name: "Sarthe", code: "72", region: "Pays de la Loire", tier: "Élégant", prestige: 6, tags: ["patrimoine","architecture","cinema","culture_pop","rural","memoire","industriel","villages"], anecdote: "Le Mans associe patrimoine ancien, culture automobile et campagnes calmes dans un profil assez original." },
  { name: "Seine-et-Marne", code: "77", region: "Île-de-France", tier: "Fort", prestige: 5, tags: ["patrimoine","architecture","monumental","rural","cinema","culture_pop","medieval","villages"], anecdote: "Fontainebleau, Provins et les marges rurales donnent à la Seine-et-Marne une autre image de l’Île-de-France." },
  { name: "Yvelines", code: "78", region: "Île-de-France", tier: "Fort", prestige: 4, tags: ["architecture","patrimoine","monumental","cinema","culture_pop","rural","memoire","villages"], anecdote: "Versailles rend les Yvelines très visibles, mais les forêts et vallées ajoutent des options plus fines." },
  { name: "Deux-Sèvres", code: "79", region: "Nouvelle-Aquitaine", tier: "Rare", prestige: 8, tags: ["rural","melancolique","patrimoine","villages","underdog","sauvage","memoire","architecture"], anecdote: "Les Deux-Sèvres offrent un profil de bocage, marais et petites villes, discret mais distinct." },
  { name: "Somme", code: "80", region: "Hauts-de-France", tier: "Fort", prestige: 6, tags: ["memoire","guerre","littoral","maritime","melancolique","architecture","patrimoine","rude"], anecdote: "La baie de Somme et les champs de bataille donnent au département une forte charge paysagère et mémorielle." },
  { name: "Tarn", code: "81", region: "Occitanie", tier: "Élégant", prestige: 7, tags: ["rural","patrimoine","architecture","medieval","villages","spectaculaire","melancolique","industriel"], anecdote: "Albi, bastides et reliefs du Sud-Ouest donnent au Tarn une identité patrimoniale très nette." },
  { name: "Tarn-et-Garonne", code: "82", region: "Occitanie", tier: "Rare", prestige: 8, tags: ["rural","patrimoine","villages","architecture","melancolique","underdog","medieval","sauvage"], anecdote: "Le Tarn-et-Garonne fonctionne comme un choix de bastides, vallées et patrimoine discret." },
  { name: "Vaucluse", code: "84", region: "Provence-Alpes-Côte d’Azur", tier: "Fort", prestige: 5, tags: ["mediterraneen","architecture","patrimoine","spectaculaire","villages","rural","cinema","monumental"], anecdote: "Avignon, le Ventoux et les villages du Luberon rendent le Vaucluse très efficace dans les cases du Sud." },
  { name: "Vienne", code: "86", region: "Nouvelle-Aquitaine", tier: "Élégant", prestige: 6, tags: ["patrimoine","architecture","medieval","culture_pop","cinema","rural","memoire","villages"], anecdote: "Poitiers, le Futuroscope et le patrimoine roman donnent à la Vienne un profil hybride." },
  { name: "Haute-Vienne", code: "87", region: "Nouvelle-Aquitaine", tier: "Rare", prestige: 8, tags: ["rural","melancolique","patrimoine","industriel","memoire","underdog","architecture","villages"], anecdote: "Limoges, la porcelaine et les paysages limousins donnent à la Haute-Vienne une discrète singularité." },
  { name: "Vosges", code: "88", region: "Grand Est", tier: "Élégant", prestige: 7, tags: ["montagne","sauvage","rural","spectaculaire","melancolique","memoire","guerre","industriel"], anecdote: "Les Vosges apportent une moyenne montagne forestière, rude et très utile dans les grilles de relief." },
  { name: "Essonne", code: "91", region: "Île-de-France", tier: "Rare", prestige: 8, tags: ["rural","architecture","patrimoine","cinema","culture_pop","industriel","memoire","underdog"], anecdote: "L’Essonne révèle une Île-de-France de vallées, laboratoires, villes nouvelles et patrimoine plus discret." },
  { name: "Hauts-de-Seine", code: "92", region: "Île-de-France", tier: "Fort", prestige: 5, tags: ["architecture","monumental","brutaliste","industriel","cinema","culture_pop","patrimoine","memoire"], anecdote: "La Défense, les grands équipements et les traces industrielles donnent aux Hauts-de-Seine une force très urbaine." },
  { name: "Seine-Saint-Denis", code: "93", region: "Île-de-France", tier: "Élégant", prestige: 7, tags: ["industriel","ouvrier","architecture","brutaliste","cinema","culture_pop","patrimoine","memoire"], anecdote: "La Seine-Saint-Denis concentre mémoire ouvrière, grands équipements et cultures urbaines très contemporaines." },
  { name: "Val-de-Marne", code: "94", region: "Île-de-France", tier: "Élégant", prestige: 7, tags: ["architecture","brutaliste","industriel","cinema","culture_pop","patrimoine","memoire","portuaire"], anecdote: "Le Val-de-Marne associe banlieue dense, architecture publique et bords de Marne dans un profil singulier." },
  { name: "Val-d’Oise", code: "95", region: "Île-de-France", tier: "Élégant", prestige: 7, tags: ["patrimoine","architecture","rural","cinema","culture_pop","villages","melancolique","memoire"], anecdote: "Le Val-d’Oise mêle villages, ville nouvelle et paysages de peintres aux portes de Paris." },
  { name: "Guadeloupe", code: "971", region: "Guadeloupe", tier: "Fort", prestige: 6, tags: ["littoral","maritime","spectaculaire","sauvage","volcanique","montagne","patrimoine","rural"], anecdote: "La Guadeloupe ajoute une France antillaise de volcans, plages, forêts et mémoire créole." },
  { name: "Martinique", code: "972", region: "Martinique", tier: "Fort", prestige: 6, tags: ["littoral","maritime","spectaculaire","volcanique","montagne","patrimoine","memoire","rural"], anecdote: "La Martinique relie montagne volcanique, littoral caraïbe et histoire culturelle très forte." },
  { name: "Guyane", code: "973", region: "Guyane", tier: "Rare", prestige: 8, tags: ["sauvage","spectaculaire","littoral","maritime","rural","patrimoine","memoire","underdog"], anecdote: "La Guyane donne une réponse ultramarine immense, entre forêt, littoral et mémoire du bagne." },
  { name: "La Réunion", code: "974", region: "La Réunion", tier: "Fort", prestige: 6, tags: ["volcanique","montagne","spectaculaire","sauvage","littoral","maritime","patrimoine","rural"], anecdote: "La Réunion concentre volcans, cirques et littoral dans une géographie française hors norme." },
  { name: "Mayotte", code: "976", region: "Mayotte", tier: "Rare", prestige: 8, tags: ["littoral","maritime","sauvage","spectaculaire","rural","patrimoine","underdog","melancolique"], anecdote: "Mayotte apporte un lagon, une insularité forte et une présence ultramarine encore rarement mobilisée." },
];

export const departments = baseDepartments.map((department) => ({
  ...department,
  places: departmentPlaces[department.code] ?? [],
}));

const GRID_STOCK_TARGET = 365;

const generatedCriteria = [
  { id: "littoral-maritime", label: "Littoral maritime", tags: ["littoral", "maritime"] },
  { id: "ports-estuaires", label: "Ports et estuaires", tags: ["portuaire", "naval", "littoral"] },
  { id: "phares-caps", label: "Phares et caps", tags: ["phares", "falaises", "maritime"] },
  { id: "mediterranee", label: "Sud méditerranéen", tags: ["mediterraneen", "littoral", "spectaculaire"] },
  { id: "atlantique-rude", label: "Atlantique rude", tags: ["maritime", "rude", "crepusculaire"] },
  { id: "reliefs-alpins", label: "Reliefs alpins", tags: ["montagne", "spectaculaire", "mineral"] },
  { id: "volcans-plateaux", label: "Volcans et plateaux", tags: ["volcanique", "mineral", "rural"] },
  { id: "gorges-falaises", label: "Gorges et falaises", tags: ["falaises", "spectaculaire", "sauvage"] },
  { id: "montagnes-sauvages", label: "Montagnes sauvages", tags: ["montagne", "sauvage", "rural"] },
  { id: "patrimoine-medieval", label: "Patrimoine médiéval", tags: ["medieval", "patrimoine", "architecture"] },
  { id: "monuments-majeurs", label: "Monuments majeurs", tags: ["monumental", "architecture", "patrimoine"] },
  { id: "villages-pierre", label: "Villages de pierre", tags: ["villages", "patrimoine", "rural"] },
  { id: "prehistoire-grottes", label: "Préhistoire et grottes", tags: ["prehistoire", "falaises", "patrimoine"] },
  { id: "cathare-sud", label: "Cathare et Sud sec", tags: ["cathare", "medieval", "spectaculaire"] },
  { id: "industrie-mines", label: "Mines et industrie", tags: ["minier", "industriel", "ouvrier"] },
  { id: "memoire-ouvriere", label: "Mémoire ouvrière", tags: ["ouvrier", "memoire", "industriel"] },
  { id: "brutalisme-urbain", label: "Brutalisme urbain", tags: ["brutaliste", "architecture", "industriel"] },
  { id: "naval-industriel", label: "Naval industriel", tags: ["naval", "portuaire", "industriel"] },
  { id: "michelin-manufactures", label: "Manufactures singulières", tags: ["michelin", "industriel", "architecture"] },
  { id: "memoire-guerre", label: "Mémoire de guerre", tags: ["memoire", "guerre", "rude"] },
  { id: "frontieres-est", label: "Frontières de l'Est", tags: ["memoire", "guerre", "patrimoine"] },
  { id: "melancolie-rurale", label: "Mélancolie rurale", tags: ["melancolique", "rural", "underdog"] },
  { id: "france-discrete", label: "France discrète", tags: ["underdog", "rural", "patrimoine"] },
  { id: "bocage-bastides", label: "Bocage et bastides", tags: ["rural", "villages", "medieval"] },
  { id: "campagnes-sauvages", label: "Campagnes sauvages", tags: ["rural", "sauvage", "melancolique"] },
  { id: "cinema-iconique", label: "Cinéma iconique", tags: ["cinema", "iconique", "culture_pop"] },
  { id: "decors-filmables", label: "Décors filmables", tags: ["cinema", "spectaculaire", "architecture"] },
  { id: "culture-pop-urbaine", label: "Culture pop urbaine", tags: ["culture_pop", "architecture", "monumental"] },
  { id: "capitales-symboles", label: "Capitales et symboles", tags: ["iconique", "monumental", "culture_pop"] },
  { id: "ciels-crepusculaires", label: "Ciels crépusculaires", tags: ["crepusculaire", "melancolique", "rude"] },
  { id: "paysages-sauvages", label: "Paysages sauvages", tags: ["sauvage", "spectaculaire", "rural"] },
  { id: "patrimoine-rare", label: "Patrimoine rare", tags: ["patrimoine", "underdog", "villages"] },
  { id: "architecture-noire", label: "Architecture sombre", tags: ["architecture", "mineral", "brutaliste"] },
  { id: "bretagne-celte", label: "Bretagne celte", tags: ["culture_celte", "maritime", "sauvage"] },
  { id: "normandie-memoire", label: "Normandie de mémoire", tags: ["memoire", "maritime", "architecture"] },
  { id: "loire-chateaux", label: "Loire et châteaux", tags: ["patrimoine", "monumental", "rural"] },
  { id: "sud-villages", label: "Villages du Sud", tags: ["mediterraneen", "villages", "patrimoine"] },
  { id: "jura-vosges", label: "Moyenne montagne", tags: ["montagne", "rural", "melancolique"] },
  { id: "outremer-volcanique", label: "Outre-mer volcanique", tags: ["volcanique", "littoral", "sauvage"] },
  { id: "iles-lagons", label: "Îles et lagons", tags: ["littoral", "maritime", "sauvage"] },
  { id: "forets-memoire", label: "Forêts de mémoire", tags: ["sauvage", "memoire", "rural"] },
  { id: "villes-reconstruites", label: "Villes reconstruites", tags: ["architecture", "memoire", "guerre"] },
  { id: "ports-populaires", label: "Ports populaires", tags: ["portuaire", "culture_pop", "littoral"] },
  { id: "relief-littoral", label: "Relief littoral", tags: ["littoral", "falaises", "spectaculaire"] },
  { id: "ruralite-industrielle", label: "Ruralité industrielle", tags: ["rural", "industriel", "melancolique"] },
  { id: "memoire-discrete", label: "Mémoire discrète", tags: ["memoire", "underdog", "patrimoine"] },
];

const generatedCategoryCriteria = [
  { id: "geo-caps-frontieres", category: "geographie", label: "Caps et frontières", tags: ["littoral", "memoire", "spectaculaire"] },
  { id: "geo-vallees-reliefs", category: "geographie", label: "Vallées et reliefs", tags: ["montagne", "rural", "spectaculaire"] },
  { id: "geo-facades-maritimes", category: "geographie", label: "Façades maritimes", tags: ["maritime", "portuaire", "littoral"] },
  { id: "geo-axes-interieurs", category: "geographie", label: "Axes intérieurs", tags: ["rural", "architecture", "patrimoine"] },
  { id: "geo-archipels-lointains", category: "geographie", label: "Archipels lointains", tags: ["littoral", "volcanique", "sauvage"] },
  { id: "geo-paysages-secs", category: "geographie", label: "Paysages secs", tags: ["mediterraneen", "rural", "spectaculaire"] },
  { id: "histoire-fronts", category: "histoire", label: "Anciens fronts", tags: ["guerre", "memoire", "rude"] },
  { id: "histoire-abbayes", category: "histoire", label: "Abbayes et fondations", tags: ["patrimoine", "medieval", "rural"] },
  { id: "histoire-routes-royales", category: "histoire", label: "Routes royales", tags: ["monumental", "patrimoine", "architecture"] },
  { id: "histoire-places-fortes", category: "histoire", label: "Places fortes", tags: ["guerre", "architecture", "medieval"] },
  { id: "histoire-memoires-locales", category: "histoire", label: "Mémoires locales", tags: ["memoire", "patrimoine", "underdog"] },
  { id: "histoire-industrie-ancienne", category: "histoire", label: "Industrie ancienne", tags: ["industriel", "ouvrier", "memoire"] },
  { id: "patrimoine-cathedrales", category: "patrimoine", label: "Cathédrales et silhouettes", tags: ["monumental", "architecture", "patrimoine"] },
  { id: "patrimoine-bastides", category: "patrimoine", label: "Bastides et villages", tags: ["villages", "medieval", "rural"] },
  { id: "patrimoine-chateaux", category: "patrimoine", label: "Châteaux et vallées", tags: ["patrimoine", "medieval", "spectaculaire"] },
  { id: "patrimoine-thermal", category: "patrimoine", label: "Patrimoine thermal", tags: ["architecture", "patrimoine", "melancolique"] },
  { id: "patrimoine-pierre-noire", category: "patrimoine", label: "Pierre noire", tags: ["mineral", "architecture", "volcanique"] },
  { id: "patrimoine-rural-cache", category: "patrimoine", label: "Patrimoine rural caché", tags: ["rural", "underdog", "patrimoine"] },
  { id: "culture-cinema-mer", category: "culture", label: "Cinéma et mer", tags: ["cinema", "littoral", "iconique"] },
  { id: "culture-scenes-urbaines", category: "culture", label: "Scènes urbaines", tags: ["culture_pop", "architecture", "brutaliste"] },
  { id: "culture-legendes-celtes", category: "culture", label: "Légendes celtes", tags: ["culture_celte", "maritime", "melancolique"] },
  { id: "culture-festive-sud", category: "culture", label: "Cultures du Sud", tags: ["mediterraneen", "culture_pop", "villages"] },
  { id: "culture-images-nationales", category: "culture", label: "Images nationales", tags: ["iconique", "monumental", "cinema"] },
  { id: "culture-decors-auteur", category: "culture", label: "Décors d'auteur", tags: ["cinema", "melancolique", "patrimoine"] },
  { id: "gastronomie-vignobles", category: "gastronomie", label: "Vignobles et tables", tags: ["rural", "patrimoine", "villages"] },
  { id: "gastronomie-fromages-massifs", category: "gastronomie", label: "Fromages de massifs", tags: ["montagne", "rural", "patrimoine"] },
  { id: "gastronomie-marches-littoraux", category: "gastronomie", label: "Marchés littoraux", tags: ["littoral", "portuaire", "rural"] },
  { id: "gastronomie-terroirs-discrets", category: "gastronomie", label: "Terroirs discrets", tags: ["underdog", "rural", "melancolique"] },
  { id: "gastronomie-sud-mediterraneen", category: "gastronomie", label: "Tables méditerranéennes", tags: ["mediterraneen", "villages", "littoral"] },
  { id: "gastronomie-forets-etangs", category: "gastronomie", label: "Forêts et étangs", tags: ["rural", "sauvage", "patrimoine"] },
  { id: "demographie-metropoles", category: "demographie", label: "Métropoles denses", tags: ["monumental", "culture_pop", "architecture"] },
  { id: "demographie-banlieues", category: "demographie", label: "Banlieues et villes nouvelles", tags: ["brutaliste", "culture_pop", "industriel"] },
  { id: "demographie-departements-peu-denses", category: "demographie", label: "Départements peu denses", tags: ["underdog", "rural", "sauvage"] },
  { id: "demographie-villes-moyennes", category: "demographie", label: "Villes moyennes", tags: ["architecture", "industriel", "patrimoine"] },
  { id: "demographie-outremer", category: "demographie", label: "Densités ultramarines", tags: ["littoral", "maritime", "rural"] },
  { id: "demographie-campagnes-agees", category: "demographie", label: "Campagnes lentes", tags: ["rural", "melancolique", "memoire"] },
  { id: "economie-ports", category: "economie", label: "Ports économiques", tags: ["portuaire", "naval", "industriel"] },
  { id: "economie-mines", category: "economie", label: "Mines et bassins", tags: ["minier", "ouvrier", "industriel"] },
  { id: "economie-manufactures", category: "economie", label: "Manufactures et savoir-faire", tags: ["industriel", "architecture", "patrimoine"] },
  { id: "economie-tourisme-alpin", category: "economie", label: "Tourisme alpin", tags: ["montagne", "spectaculaire", "architecture"] },
  { id: "economie-agricole", category: "economie", label: "Économies agricoles", tags: ["rural", "villages", "underdog"] },
  { id: "economie-grandes-marques", category: "economie", label: "Grandes marques locales", tags: ["michelin", "industriel", "culture_pop"] },
  { id: "nature-forets", category: "nature", label: "Forêts et plateaux", tags: ["sauvage", "rural", "melancolique"] },
  { id: "nature-volcans", category: "nature", label: "Volcans et minéral", tags: ["volcanique", "mineral", "spectaculaire"] },
  { id: "nature-gorges", category: "nature", label: "Gorges et rivières", tags: ["falaises", "sauvage", "spectaculaire"] },
  { id: "nature-caps-vents", category: "nature", label: "Caps et vents", tags: ["phares", "maritime", "crepusculaire"] },
  { id: "nature-montagnes", category: "nature", label: "Hautes montagnes", tags: ["montagne", "mineral", "sauvage"] },
  { id: "nature-lagons-forets", category: "nature", label: "Lagons et forêts", tags: ["littoral", "sauvage", "volcanique"] },
  { id: "tourisme-balneaire", category: "tourisme", label: "Tourisme balnéaire", tags: ["littoral", "mediterraneen", "iconique"] },
  { id: "tourisme-chateaux", category: "tourisme", label: "Tourisme de châteaux", tags: ["monumental", "patrimoine", "rural"] },
  { id: "tourisme-memoire", category: "tourisme", label: "Tourisme de mémoire", tags: ["memoire", "guerre", "patrimoine"] },
  { id: "tourisme-grottes", category: "tourisme", label: "Grottes et préhistoire", tags: ["prehistoire", "falaises", "spectaculaire"] },
  { id: "tourisme-villages", category: "tourisme", label: "Villages visités", tags: ["villages", "medieval", "patrimoine"] },
  { id: "tourisme-stations", category: "tourisme", label: "Stations et panoramas", tags: ["montagne", "littoral", "spectaculaire"] },
  { id: "insolite-petits-departements", category: "insolite", label: "Petits départements", tags: ["underdog", "architecture", "patrimoine"] },
  { id: "insolite-contrastes", category: "insolite", label: "Contrastes inattendus", tags: ["rural", "brutaliste", "melancolique"] },
  { id: "insolite-frontieres", category: "insolite", label: "Frontières étranges", tags: ["memoire", "underdog", "guerre"] },
  { id: "insolite-paysages-inattendus", category: "insolite", label: "Paysages inattendus", tags: ["sauvage", "littoral", "underdog"] },
  { id: "insolite-industrie-cachee", category: "insolite", label: "Industrie cachée", tags: ["industriel", "rural", "patrimoine"] },
  { id: "insolite-icones-decalees", category: "insolite", label: "Icônes décalées", tags: ["iconique", "underdog", "culture_pop"] },
];

function inferGeneratedCategory(criterion) {
  const tags = criterion.tags;
  if (tags.some((tag) => ["littoral", "maritime", "montagne", "volcanique", "falaises"].includes(tag))) return "geographie";
  if (tags.some((tag) => ["guerre", "memoire", "medieval", "prehistoire"].includes(tag))) return "histoire";
  if (tags.some((tag) => ["patrimoine", "architecture", "monumental", "villages"].includes(tag))) return "patrimoine";
  if (tags.some((tag) => ["cinema", "culture_pop", "iconique", "culture_celte"].includes(tag))) return "culture";
  if (tags.some((tag) => ["industriel", "minier", "ouvrier", "naval", "portuaire", "michelin"].includes(tag))) return "economie";
  if (tags.some((tag) => ["sauvage", "rural", "mineral", "crepusculaire"].includes(tag))) return "nature";
  return "insolite";
}

const generatedCriteriaPool = [
  ...generatedCriteria.map((criterion) => ({
    ...criterion,
    category: inferGeneratedCategory(criterion),
  })),
  ...generatedCategoryCriteria,
];

const generatedTitleFamilies = [
  "Grille horizons croisés",
  "Grille lignes de force",
  "Grille territoires en tension",
  "Grille chemins secondaires",
  "Grille paysages et traces",
  "Grille mémoires obliques",
  "Grille contrastes français",
  "Grille diagonales",
  "Grille cartes sensibles",
  "Grille repères cachés",
];

function generatedCriterionKey(criterion) {
  return criterion.tags.slice().sort().join("+");
}

function generatedPairKey(row, column) {
  return `${generatedCriterionKey(row)}__${generatedCriterionKey(column)}`;
}

function generatedTagMatches(department, criterion) {
  return criterion.tags.filter((tag) => department.tags.includes(tag)).length;
}

const generatedCellCandidateCache = new Map();

function generatedCellCandidates(row, column) {
  const key = generatedPairKey(row, column);
  const cached = generatedCellCandidateCache.get(key);
  if (cached) return cached;

  const candidates = departments.filter((department) => (
    generatedTagMatches(department, row) > 0
    && generatedTagMatches(department, column) > 0
  ));

  generatedCellCandidateCache.set(key, candidates);
  return candidates;
}

function generatedGridPairKeys(grid) {
  return grid.rows.flatMap((row) => (
    grid.columns.map((column) => generatedPairKey(row, column))
  ));
}

function hasUniqueCriteria(criteria) {
  return new Set(criteria.map((criterion) => criterion.id)).size === criteria.length;
}

function generatedGridQuality(rows, columns, usedPairKeys, departmentExposure) {
  const pairs = [];
  let quality = 0;

  for (const row of rows) {
    for (const column of columns) {
      const pair = generatedPairKey(row, column);
      if (usedPairKeys.has(pair) || pairs.includes(pair)) return null;

      const candidates = generatedCellCandidates(row, column);
      if (candidates.length === 0) return null;

      const leastExposed = candidates.reduce((best, department) => {
        const exposure = departmentExposure.get(department.code) ?? 0;
        if (!best || exposure < best.exposure || (exposure === best.exposure && department.prestige > best.department.prestige)) {
          return { department, exposure };
        }
        return best;
      }, null);

      quality += Math.max(0, 40 - leastExposed.exposure);
      quality += Math.min(12, candidates.length);
      quality += candidates.some((department) => department.prestige >= 8) ? 6 : 0;
      pairs.push(pair);
    }
  }

  return { pairs, quality };
}

function pickGeneratedCriteria(seed, slotCount, step) {
  const selected = [];
  let cursor = seed;

  while (selected.length < slotCount && cursor < seed + generatedCriteriaPool.length * 2) {
    const criterion = generatedCriteriaPool[((cursor % generatedCriteriaPool.length) + generatedCriteriaPool.length) % generatedCriteriaPool.length];
    if (!selected.some((item) => item.id === criterion.id)) {
      selected.push(criterion);
    }
    cursor += step;
  }

  return selected;
}

function pickGeneratedColumnsForRows(rows, seed, step, usedPairKeys) {
  const selected = [];
  let cursor = seed;

  while (selected.length < 3 && cursor < seed + generatedCriteriaPool.length * 3) {
    const criterion = generatedCriteriaPool[((cursor % generatedCriteriaPool.length) + generatedCriteriaPool.length) % generatedCriteriaPool.length];
    const isRowCriterion = rows.some((row) => row.id === criterion.id);
    const isAlreadySelected = selected.some((item) => item.id === criterion.id);
    const keepsPairsFresh = rows.every((row) => !usedPairKeys.has(generatedPairKey(row, criterion)));

    if (!isRowCriterion && !isAlreadySelected && keepsPairsFresh) {
      selected.push(criterion);
    }

    cursor += step;
  }

  return selected;
}

function createGeneratedGrid(gridNumber, rows, columns) {
  const title = generatedTitleFamilies[gridNumber % generatedTitleFamilies.length];
  const difficulty = gridNumber >= 150 ? "expert" : gridNumber >= 90 ? "normal" : "easy";

  return {
    id: String(gridNumber).padStart(3, "0"),
    difficulty,
    title,
    dateLabel: `Édition longue série ${String(gridNumber).padStart(3, "0")}`,
    columns: columns.map((criterion) => ({
      id: criterion.id,
      label: criterion.label,
      tags: criterion.tags,
      category: criterion.category,
    })),
    rows: rows.map((criterion) => ({
      id: criterion.id,
      label: criterion.label,
      tags: criterion.tags,
      category: criterion.category,
    })),
  };
}

function seedGeneratedExposure() {
  const exposure = new Map(departments.map((department) => [department.code, 0]));

  editorialGrids.forEach((grid) => {
    grid.rows.forEach((row) => {
      grid.columns.forEach((column) => {
        generatedCellCandidates(row, column).forEach((department) => {
          exposure.set(department.code, (exposure.get(department.code) ?? 0) + 1);
        });
      });
    });
  });

  return exposure;
}

function createGeneratedGrids() {
  const generated = [];
  const usedPairKeys = new Set(editorialGrids.flatMap(generatedGridPairKeys));
  const departmentExposure = seedGeneratedExposure();

  for (let gridNumber = editorialGrids.length + 1; gridNumber <= GRID_STOCK_TARGET; gridNumber += 1) {
    let best = null;

    for (let attempt = 0; attempt < 1200; attempt += 1) {
      const rows = pickGeneratedCriteria(
        gridNumber * 5 + attempt * 7,
        3,
        5 + ((attempt + gridNumber) % 19)
      );
      const columns = pickGeneratedColumnsForRows(
        rows,
        gridNumber * 13 + attempt * 17 + 3,
        7 + ((attempt * 2 + gridNumber) % 23),
        usedPairKeys
      );
      const allCriteria = [...rows, ...columns];

      if (rows.length !== 3 || columns.length !== 3 || !hasUniqueCriteria(allCriteria)) continue;

      const result = generatedGridQuality(rows, columns, usedPairKeys, departmentExposure);
      if (!result) continue;

      if (!best || result.quality > best.result.quality) {
        best = { rows, columns, result };
      }
    }

    if (!best) break;

    best.result.pairs.forEach((pair) => usedPairKeys.add(pair));
    best.rows.forEach((row) => {
      best.columns.forEach((column) => {
        const candidates = generatedCellCandidates(row, column)
          .sort((a, b) => (
            (departmentExposure.get(a.code) ?? 0) - (departmentExposure.get(b.code) ?? 0)
            || b.prestige - a.prestige
            || a.code.localeCompare(b.code)
          ));

        candidates.slice(0, 4).forEach((department) => {
          departmentExposure.set(department.code, (departmentExposure.get(department.code) ?? 0) + 1);
        });
      });
    });

    generated.push(createGeneratedGrid(gridNumber, best.rows, best.columns));
  }

  return generated;
}

let generatedGridsCache = null;
let allGridsCache = null;

function getGeneratedGrids() {
  if (!generatedGridsCache) {
    generatedGridsCache = createGeneratedGrids();
  }

  return generatedGridsCache;
}

function getAllGrids() {
  if (!allGridsCache) {
    allGridsCache = [...editorialGrids, ...getGeneratedGrids()];
  }

  return allGridsCache;
}

function getGridCount() {
  return GRID_STOCK_TARGET;
}

function getGridByIndex(index) {
  if (index < 0 || index >= getGridCount()) return null;
  if (index < editorialGrids.length) return editorialGrids[index];
  return getGeneratedGrids()[index - editorialGrids.length] ?? null;
}

function getGridsSlice(start, end) {
  const safeStart = Math.max(0, start);
  const safeEnd = Math.min(end, getGridCount());
  const result = [];

  for (let index = safeStart; index < safeEnd; index += 1) {
    const grid = getGridByIndex(index);
    if (grid) result.push(grid);
  }

  return result;
}

export const grids = new Proxy([], {
  get(_target, property) {
    const allGrids = getAllGrids();
    const value = allGrids[property];
    return typeof value === "function" ? value.bind(allGrids) : value;
  },
  has(_target, property) {
    return property in getAllGrids();
  },
});
