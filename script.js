const timelineContent = document.querySelector('.timeline-content');
const popupStatic = document.querySelector('.popup-static');
const popupImage = document.getElementById('popup-image');
const popupText = document.getElementById('popup-text');
const popupLine = document.querySelector('.popup-line');


let lastActiveYear = null; // Houd het laatst actieve jaar bij
let lastActiveCircle = null; // Houd de laatst ingekleurde cirkel bij
let currentPopupIndex = 0; // Houdt de actieve popup binnen een jaar bij


// Define years and constants
const startYear = 2000;
const endYear = 2027;
const yearInterval = 150; // Horizontale afstand tussen markers

// Data voor popups
const popupData = {
    2000: [
        {
            title: "50 jaar Hogeschool van Utrecht",
            text: "De Hogeschool van Utrecht (HVU), bestaat in 2000 precies 50 jaar. Ter ere van dit jubileum werden diverse activiteiten georganiseerd om deze halve eeuw onderwijs, onderzoek en ontwikkeling te vieren.",
            image: "images/image2000.jpg",
            date: "2000",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/dossier-50-jaar-de-uithof/?"
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2001: [
        {
            title: "HBO-fraudeaffaire",
            text: "In 2001 bleek dat enkele hogescholen, waaronder de HU, er dubieuze praktijken op na hielden bij de inschrijving van studenten. De zaak leidde tot een grootschalig onderzoek en had verstrekkende gevolgen voor de financiering en controle van het Nederlandse hoger onderwijs. ",
            image: "images/image2001.jpg",
            date: "",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2002: [
        {
            title: "HvU onderaan ",
            text: "In een onderzoek van Elsevier naar de beoordeling van verschillende opleidingen in Nederland eindigt de Hogeschool van Utrecht onderaan. In 2001 eindigde de HvU ook al onderaan door met de helft van de opleidingen op de laatste of één-na-laatste plaats te behalen. ",
            image: "images/image2002.jpg",
            date: "",
            source: "Femke van den Heuvel", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2003: [
        {
            title: "Alleen Saxion vervolgd in fraudeaffaire ",
            text: "In de HBO-fraudeaffaire is alleen Saxion IJsselland door het OM vervolgd. De zaak tegen de Hogeschool van Utrecht is geseponeerd vanwege te weinig bewijs.",
            image: "images/image2003.jpg",
            date: "",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2004: [
        {
            title: "Nieuwe woningen op de Uithof",
            text: "Het studentenwooncomplex La Cabanna bestaande uit kleurrijke spaceboxen werd in 2004 gebouwd op de Uithof in Utrecht. Dit bijzondere project was bedoeld om de groeiende woningnood onder studenten aan te pakken door betaalbare en flexibele huisvesting te bieden. De opvallende en duurzame containers werden snel populair vanwege hun moderne uitstraling en praktische inrichting.",
            image: "images/image2004.jpg",
            date: "2004",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/dossier-50-jaar-de-uithof/"
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2005: [
        {
            title: "Hogeschool van Utrecht word Hogeschool Utrecht",
            text: "Vanaf 2005 heet De Hogeschool van Utrecht (HvU) de Hogeschool Utrecht (HU). Deze naamsverandering koste de HU ruim 900.000 euro.",
            image: "images/image2005.jpg",
            date: "1 September 2005",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/dossier-50-jaar-de-uithof/?"
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2006: [
        {
            title: "Utrecht tweede leukste studentenstad ",
            text: "In de NOS Headlines verkiezing onder de twaalf studentensteden is Utrecht verkozen tot 2e leukste studentenstad. Groningen eindigde bovenaan. ",
            image: "images/image2006.jpg",
            date: "2006",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuws-utrecht_tweede_leukste_studentenstad/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2007: [
        {
            title: "Bouwkraan op De Uithof valt om ",
            text: "De hijskraan die gebruikt werd voor de bouw van Casa Confetti is tijdens een storm omgewaaid en gevallen op een universiteitsgebouw op De Uithof. Zes personen raakten gewond. ",
            image: "images/image2007.jpg",
            date: "18 Juli 2007",
            source: "ANP PHOTO Nico de Groot", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2008: [
        {
            title: "Utrecht heeft duurste kamers van Nederland",
            text: "In Utrecht betalen studenten het meest per vierkante meter: €17,81. Amsterdam is tweede en Leiden is derde. ",
            image: "images/image2008.jpg",
            date: "2008",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuws-kamer_in_utrecht_het_duurst/ "
        },
        {
            title: "HU opleidingen scoren ondergemiddeld ",
            text: "Het weekblad Elsevier heeft onderzoek gedaan naar de economische en technische opleidingen in Utrecht. Daaruit blijkt dat de HU onder het gemiddelde scoort. ",
            image: "images/image2008_1.jpg",
            date: "2008",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuws-gros_hu_opleidingen_zit_onder_het_gemiddelde/ "
        },
    ],
    2009: [
        {
            title: "Aantal HU-studenten op z’n hoogst ",
            text: "Het aantal studenten dat stond ingeschreven op de Hogeschool Utrecht was in 2009 op z’n hoogst. 25 jaar geleden studeerden ongeveer 27.000 personen op de HU, de laatste cijfers geven een aantal van 37.000 aan. In 2009 waren dat er ruim tweeduizend meer. ",
            image: "images/image2009.jpg",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "Aanvullende beurs niet vanzelfsprekend een gift ",
            text: "Studenten die hun diploma niet binnen 10 jaar halen zullen voortaan hun aanvullende beurs terug moeten betalen. Voorheen was de aanvullende beurs een gift, maar vanaf studiejaar 2010-2011 zal dit een lening worden. ",
            image: "images/image2009_1.jpg",
            date: "2009",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuws-bezuiniging_op_aanvullende_beurs/ "
        },
    ],
    2010: [
        {
            title: "Alle studies krijgen een BSA ",
            text: "Vanaf studiejaar 2010-2011 zullen alle studies een bindend studieadvies (BSA) krijgen. Studenten die in hun eerste jaar minder dan 45 EC’s behalen moeten stoppen met de opleiding. ",
            image: "images/image2010.jpg",
            date: "2010",
            source: "Femke van den Heuvel", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/volgend-jaar-hu-breed-bindend-studieadvies/ "
        },
        {
            title: "Langstudeerboete komt ter sprake ",
            text: "Het kabinet is bezig met het plan om een langstudeerboete in te stellen. Studenten die meer dan een jaar studievertraging oplopen, moeten dan €3000 extra collegegeld betalen. ",
            image: "images/image2010_1.jpg",
            date: "2010",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/verwarring-over-plannen-langstudeerders/ "
        },
    ],
    2011: [
        {
            title: "Tram naar De Uithof gaat er komen ",
            text: "De tram van Utrecht Centraal Station naar De Uithof komt er definitief. De tram zal 16 keer per uur rijden en zal de overvolle bussen die er nu rijden vervangen. ",
            image: "images/image2011.jpg",
            date: "2011",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/groen-licht-voor-tram-naar-de-uithof/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2012: [
        {
            title: "Langstudeerboete",
            text: "De langstudeerboete wordt, in tegenstelling tot wat eerder was besloten, alsnog afgeschaft door de VVD en PvdA. Studenten die al hebben betaald, krijgen hun geld terug. Studentenorganisaties melden opgelucht te zijn. ",
            image: "images/image2012.jpg",
            date: "1 oktober 2012",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuws-langstudeerboete_alsnog_weg/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2013: [
        {
            title: "Utrecht SOA-hoofdstad Nederland",
            text: "Een niet al te eervolle titel voor Utrecht in 2013: de stad is uitgeroepen tot de SOA-hoofdstad van Nederland en blijft daarmee andere grote steden als Den Haag en. Amsterdam voor. ",
            image: "images/image2013_1.jpg",
            date: "17 oktober 2013",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/utrecht_soa_stad_nummer_1/ "
        },
        {
            title: "Studentenprijsindex",
            text: "De studentenprijsindex is in de periode tussen 2010 en 2012 flink gedaald, maar begint vanaf 2013 weer lichtelijk te stijgen. Zo laag als de index hiervoor was, zou het tot 2021 niet meer worden.",
            image: "images/image2013.jpg",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2014: [
        {
            title: "Verhoging BSA",
            text: "In december van 2014 wordt bekend dat het bindend studieadvies wordt verhoogd van 45 naar 50 EC’s. Studenten die in het eerste jaar niet aan dat aantal komen, moeten met de opleiding stoppen. ",
            image: "images/image2014.jpg",
            date: "16 december 2014",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/voorstel_norm_voor_bindend_studieadvies_omhoog/ "
        },
        {
            title: "Alcoholleeftijd verhoogd",
            text: "In 2014 wordt de leeftijdsgrens voor alcohol verhoogd van zestien naar achttien jaar. Studenten die jonger zijn dan achttien kunnen dan geen alcoholische versnaperingen meer nuttigen. ",
            image: "images/image2014_1.jpg",
            date: "2014",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2015: [
        {
            title: "Basisbeurs wordt leenstelsel ",
            text: "De basisbeurs werd in 2015 vervangen door een leenstelsel, maar keerde in september 2023 terug. Uitwonende studenten krijgen nu 439 euro per maand en thuiswonende studenten 110 euro. Studenten uit de leenstelselperiode (2015-2023) ontvangen maximaal 1436 euro per studiejaar ter compensatie. ",
            image: "images/image2015.jpg",
            date: "",
            source: "Roos Vervelde", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "Tour de France start in Utrecht",
            text: "De wiellerronde Tour de France startte in 2015 in Utrecht. Het mocht met recht een succes worden genoemd: bijna een miljoen mensen kwamen af op het grand depart. ",
            image: "images/image2015_1.jpg",
            date: "",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2016: [
        {
            title: "Serieverkrachter veroordeeld",
            text: "De serieverkrachter die tussen 1995 en 2001 actief was in Utrecht, wordt in 2016 veroordeeld tot zestien jaar cel. De 53-jarige Gerard T. werd schuldig bevonden aan vier verkrachtingen. ",
            image: "images/image2016.jpg",
            date: "12 februari 2016",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/zestien_jaar_cel_voor_utrechtse_serieverkrachter/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2017: [
        {
            title: "Numerus fixus",
            text: "Tot en met 2010-2011 steeg het aantal studies dat een numerus fixus hanteerde op de Hogeschool Utrecht met 25,10%. In het daaropvolgende leerjaar verdubbelde het aantal studies met een numerus fixus. De nieuwe selectie bracht meer administratieve lasten met zich mee, wat leidde tot het afschaffen van numerus fixus bij veel studies. ",
            image: "images/image2017.jpg",
            date: "2017",
            source: "", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/hu-halveert-aantal-numerus-fixi/ "
        },
        {
            title: "Twintigste editie UIT",
            text: "De Utrechtse Introductie Tijd (UIT) duurde in 2017 geen vier dagen, maar vijf. Dit had ermee te maken dat het de twintigste editie was en er ‘zoveel ideeën waren, dat vier dagen niet voldoende ruimte bood’. ",
            image: "images/image2017_1.jpg",
            date: "13 juli 2017",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/uit-2017-yoga-beginnende-bandjes-en-dansfestival/ "
        },
    ],
    2018: [
        {
            title: "Heidelberglaan 15 ",
            text: "De HU neemt een nieuw gebouw in gebruik in augustus van 2018. Het gaat om Heidelberglaan 15. Drie maanden later werd De Uithof omgedoopt tot het Utrecht Science Park.  ",
            image: "images/image2018.jpg",
            date: "29 augustus 2018",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuwbouw-hu-eindelijk-weer-een-schoolgebouw/ "
        },
        {
            title: "HU Keuzegids",
            text: "De Hogeschool Utrecht staat in 2018 op de laatste plaats in de Keuzegids. De gebieden die het slechts zijn beoordeeld op de Hu, zijn Economie en Management, Communicatie en Journalistiek en Gedrag en Maatschappij. ",
            image: "images/image2018_1.jpg",
            date: "4 oktober 2018",
            source: "Femke van den Heuvel", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/ook-in-keuzegids-eindigt-hu-als-laatste/ "
        },
    ],
    2019: [
        {
            title: "Tramschutter",
            text: "Op 18 maart 2019 vond een van de schokkendste gebeurtenissen in de recente geschiedenis van Utrecht plaats, toen Gökmen Tanis het vuur opende in een tram bij het 24 Oktoberplein. Bij deze terroristische aanslag kwamen vier mensen om het leven en raakten zes anderen gewond. Tanis werd dezelfde dag nog gearresteerd en later veroordeeld voor de aanslag. ",
            image: "images/image2019.jpg",
            date: "18 maart 2019",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/umc-utrecht-opent-noodhospitaal-na-schietpartij-in-utrechtse-tram/ "
        },
        {
            title: "Eerste tramrit",
            text: "De tram naar de Uithof werd in december 2019 voor het eerst in gebruik genomen. Lijn 22 valt in de smaak bij de eerste gebruikers: ‘Het is in alle opzichten een verbetering.’ ",
            image: "images/image2019_1.jpg",
            date: "16 december 2019",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/de-eerste-maandagochtend-in-tram-22/ "
        },
    ],
    2020: [
        {
            title: "Corona",
            text: "Corona had in 2020 – en de jaren erna – veel gevolgen voor de HU. Op 10 maart werd bekend dat de eerste HU-student was besmet met corona, vervolgens werd het BSA niet gebruikt, gingen de scholen dicht, werden mondkapjes verplicht en werd een teststraat geopend op het Science Park. ",
            image: "images/image2020.jpg",
            date: "",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: ""
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2021: [
        {
            title: "Regenboogfietspad",
            text: "De Uithof krijgt in 2021 het langste regenboogfietspad ter wereld. De Hogeschool Utrecht, Universiteit Utrecht en UMC Utrecht willen hiermee laten zien dat iedereen welkom is om te zijn wie die is. Het initiatief kwam van student Elias van Mourik. ",
            image: "images/image2021.jpg",
            date: "7 juni 2021",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/regenboogfietspad-moet-hu-inclusiever-maken-als-je-het-echt-onzin-vindt-kun-je-het-ook-gewoon-zien-als-een-kleurrijk-symbool/ "
        },
        {
            title: "Budget per student stijgt",
            text: "Het budget dat er per student beschikbaar is, verschilt veel per jaar. Zo was er in 2006 een afname van wel 9% per student. De jaren erna neemt het bedrag licht toe en in 2010 is er een grote stijging van 13%. Sinds 2021 zijn er ook flinke stijgingen in het budget per student. De budgetwijzigingen lijken niets met de inflatie te maken te hebben, want deze is door de jaren heen gelijkmatig toegenomen. Ook is het interessant dat het budget in 2015 niet is toegenomen, terwijl het leenstelsel in dat jaar afgeschaft werd. Er werd beloofd dat de onderwijsinstellingen vervolgens meer geld zouden krijgen om aan de studenten de besteden, maar dit is dus niet gebeurd.",
            image: "images/image2021_1.jpg",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2022: [
        {
            title: "La Vuelta ",
            text: "De tweede etappe van de La Vuelta eindigt op het Utrecht Science Park.  De rit van Oeteldonk naar Utrecht werd de strijd om de bergtrui en bedroeg 175 kilometer.  ",
            image: "images/image2022.jpg",
            date: "20 augustus 2022",
            source: "Trajectum", // Gedefinieerde bron
            extraInfo: "Bron: https://www.bicycling.com/nl/events/a40908624/la-vuelta-2022-etappe-2/ "
        },
        {
            title: "BSA wordt DSA",
            text: "Steeds meer opleidingen stoppen met het bindend studieadvies en zetten dit om in een dringend studieadvies (DSA). In 2022 bereikt dit een piek met maar liefst 16 voltijd studies die overstappen. Met deze maatregel zijn studenten niet verplicht te stoppen met een opleiding als ze niet het vereiste aantal studiepunten behalen, maar dit wordt nog wel dringend geadviseerd. ",
            image: "images/image2022_1.jpg",
            date: "2022",
            source: "", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/steeds-meer-hu-opleidingen-stoppen-met-het-bindend-studieadvies/ "
        },
    ],
    2023: [
        {
            title: "Basisbeurs is terug ",
            text: "Zowel de Tweede als de Eerste Kamer heeft ermee ingestemd dat de basisbeurs weer terugkomt. Vanaf studiejaar 2023-2024 zullen thuiswonende studenten €110 per maand ontvangen en uitwonende studenten €275. ",
            image: "images/image2023.jpg",
            date: "",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/na-akkoord-eerste-kamer-komt-basisbeurs-nu-echt-terug/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],
    2024: [
        {
            title: "Bangalijst gaat rond in Utrecht ",
            text: "Leden van het Utrechtsch Studenten Corps (USC) hebben een bangalijst gemaakt met de namen van zo’n 30 studentes. Hierin worden de studentes beoordeeld op hun uiterlijk en bedprestaties. De makers van de lijst zijn voor onbepaalde tijd geschorst. ",
            image: "images/image2024.jpg",
            date: "2024",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/bangalijst-gaat-rond-in-utrechtse-studentenwereld/ "
        },
        {
            title: "Grand Café Living opent de deuren ",
            text: "Het nieuwe Grand Café Living vervangt The Basket, wat moest sluiten vanwege renovatie. In de huiselijke sfeer van het café kan je doordeweeks van ’s ochtends vroeg tot ’s avonds laat wat eten of drinken. ",
            image: "images/image2024_1.jpg",
            date: "15 April 2024",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/nieuwste-hotspot-op-de-uithof-the-living/ "
        },
    ],
    2025: [
        {
            title: "DDoS-aanval treft hoger onderwijs ",
            text: "Meerdere hogescholen en universiteiten zijn geraakt door een DDoS-aanval. Dit resulteert in problemen met het netwerk en op de HU is dit te merken aan ‘wisselvallig gedrag’ bij de HU-applicaties. ",
            image: "images/image2025.jpg",
            date: "17 Januari 2025",
            source: "Kees Rutten", // Gedefinieerde bron
            extraInfo: "Bron: https://trajectum.hu.nl/ook-hu-geraakt-door-landelijke-ddos-aanval-hoger-onderwijs/ "
        },
        {
            title: "",
            text: "",
            image: "",
            date: "",
            source: "", // Gedefinieerde bron
            extraInfo: ""
        },
    ],

    // Voeg meer jaartallen toe met hun bijbehorende datums
};

// Generate markers
const markersArray = []; // Array om alle markers op te slaan
for (let year = startYear - 4; year <= endYear; year++) {
    const marker = document.createElement('div');
    marker.classList.add('marker');
    marker.style.left = `${(year - (startYear - 4)) * yearInterval}px`; // Nieuwe horizontale positie

    const circle = document.createElement('div');
    circle.classList.add('circle');
    marker.appendChild(circle);

    const yearLabel = document.createElement('div');
    yearLabel.classList.add('year-label');

    if (year === startYear - 1) {
        yearLabel.textContent = "Start";
        marker.classList.add('start-marker');
    } else {
        yearLabel.textContent = `${year}`;
    }

    marker.appendChild(yearLabel);
    timelineContent.appendChild(marker);
    markersArray.push(marker);
}


// Pas tijdlijnlijn en stippenlijn aan om exact verticaal met "Start" te beginnen
function adjustTimelineLines() {
    const timelineLine = document.querySelector('.timeline-line');
    const timelineDots = document.querySelector('.timeline-dots');

    // Bereken de totale breedte op basis van het aantal markers
    const totalMarkersWidth = (endYear - (startYear - 4)) * yearInterval;

    // Stel de breedte van de tijdlijn en stippenlijn in
    timelineLine.style.width = `7287px`; // Lengte van de tijdlijnlijn
    timelineDots.style.width = `7287px`; // Lengte van de stippellijn

    // Zorg ervoor dat de lijnen bij de "Start" beginnen
    const startMarker = document.querySelector('.start-marker');
    if (startMarker) {
        const startOffset = startMarker.offsetLeft + startMarker.offsetWidth / 2;
        timelineLine.style.left = `${startOffset}px`;
        timelineDots.style.left = `${startOffset}px`;
    }
}

// Scroll naar "Start" bij het laden van de pagina
let currentYearIndex = markersArray.findIndex(marker => {
    const yearLabel = marker.querySelector('.year-label').textContent;
    return yearLabel === "Start";
}); // Vind index van "Start"

window.addEventListener('load', () => {
    setTimeout(() => {
        const startMarker = markersArray[currentYearIndex];
        const scrollPosition = startMarker.offsetLeft - (800 / 2) + (startMarker.offsetWidth / 2);

        const scrollContainer = document.querySelector('.timeline-scroll');
        scrollContainer.scrollLeft = scrollPosition;

        updateArrowVisibility();
        popupStatic.style.visibility = "hidden";
        popupStatic.style.opacity = "0";
        popupLine.style.display = "none";

        adjustTimelineLines();
    }, 100);
});


function navigatePopup(direction) {
    if (currentPopupIndex === null) return; // Niets doen als er geen actieve popup is

    // Verkrijg alle beschikbare jaartallen
    const years = Object.keys(popupData).map(year => parseInt(year, 10)).sort((a, b) => a - b);

    // Zoek de huidige index en bereken de nieuwe index
    const currentIndex = years.indexOf(currentPopupIndex);
    const newIndex = currentIndex + direction;

    // Controleer of de nieuwe index binnen de beschikbare jaartallen ligt
    if (newIndex >= 0 && newIndex < years.length) {
        currentPopupIndex = years[newIndex]; // Update het huidige jaartal
        updatePopup(currentPopupIndex); // Toon de popup voor het nieuwe jaartal
    }
}

function highlightMarkerOnLine() {
    if (!popupLine) {
        console.error("popupLine is niet gevonden in de DOM.");
        return;
    }

    const popupLineRect = popupLine.getBoundingClientRect();

    markersArray.forEach((marker) => {
        const markerCircle = marker.querySelector('.circle');
        const markerRect = markerCircle.getBoundingClientRect();

        if (
            popupLineRect.bottom >= markerRect.top &&
            popupLineRect.top <= markerRect.bottom &&
            popupLineRect.left <= markerRect.right &&
            popupLineRect.right >= markerRect.left
        ) {
            // Marker aanraken
            if (lastActiveCircle && lastActiveCircle !== markerCircle) {
                lastActiveCircle.classList.remove('active');
            }
            markerCircle.classList.add('active');
            lastActiveCircle = markerCircle;
        } else {
            // Marker niet aanraken
            markerCircle.classList.remove('active');
        }
    });
}




// Update popup content
function updatePopup(year) {
    if (year === lastActiveYear) return; // Voorkom dubbele updates
    lastActiveYear = year;
    currentPopupIndex = 0; // Reset naar de eerste popup binnen het jaar

    if (!year) {
        popupStatic.style.visibility = "hidden";
        popupStatic.style.opacity = "0";
        popupLine.style.display = "none";
        return;
    }

    const popups = popupData[year];
    if (!popups || popups.length === 0) return;

    const data = popups[currentPopupIndex];

    popupStatic.style.visibility = "visible";
    popupStatic.style.opacity = "1";
    popupLine.style.display = "block";

    popupImage.src = data.image || "";
    popupImage.style.display = data.image ? "block" : "none";

    popupText.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.text}</p>
    `;

    const nextPopup = popups[currentPopupIndex + 1];
    const nextButton = nextPopup && (nextPopup.text || nextPopup.image || nextPopup.date)
        ? `<button class="popup-nav-button right" onclick="navigatePopupWithinYear(1)">Volgende &#x25B6;</button>`
        : "";

    const prevButton = currentPopupIndex > 0
        ? `<button class="popup-nav-button left" onclick="navigatePopupWithinYear(-1)">&#x25C0; Vorige</button>`
        : "";

    popupText.innerHTML += `
        ${prevButton}
        ${nextButton}
    `;

    // Update de bron alleen als deze beschikbaar is
    const imageContainer = document.querySelector('.popup-image-container');
    let sourceText = imageContainer.querySelector('.source-text');
    if (data.source && data.source.trim() !== "") {
        if (!sourceText) {
            sourceText = document.createElement('p');
            sourceText.className = "source-text";
            imageContainer.appendChild(sourceText);
        }
        sourceText.innerHTML = `<strong>Bron:</strong> ${data.source}`;
        sourceText.style.display = "block";
    } else if (sourceText) {
        sourceText.style.display = "none";
    }

    // Update de datum en info-icoon
    const popupDate = document.getElementById('popup-date');
    if (data.date) {
        popupDate.innerHTML = `
            <span class="popup-date-text">${data.date}</span>
            <span class="info-icon" onclick="showExtraInfo()">i</span>
        `;
        popupDate.style.display = "flex";
    } else {
        popupDate.innerHTML = "";
        popupDate.style.display = "none";
    }
}




function showExtraInfo() {
    const activePopup = popupData[lastActiveYear]?.[currentPopupIndex];

    if (!activePopup) {
        alert("Geen extra informatie beschikbaar.");
        return;
    }

    const extraInfoPopup = document.createElement('div');
    extraInfoPopup.classList.add('extra-info-popup');
    extraInfoPopup.innerHTML = `
        <div class="extra-info-content">
            <h3>Extra Informatie</h3>
            <p>${activePopup.extraInfo || "Geen extra informatie beschikbaar."}</p>
            <button class="close-extra-info" onclick="closeExtraInfo()">Sluiten</button>
        </div>
    `;
    document.body.appendChild(extraInfoPopup);
}

function closeExtraInfo() {
    const popup = document.querySelector('.extra-info-popup');
    if (popup) popup.remove();
}

function navigatePopupWithinYear(direction) {
    if (lastActiveYear === null) return; // Geen popup actief

    const popups = popupData[lastActiveYear];
    if (!popups || popups.length === 0) return; // Geen data voor dit jaar

    // Bereken de nieuwe popup-index
    const newIndex = currentPopupIndex + direction;

    // Controleer of de nieuwe index binnen de array ligt
    if (newIndex >= 0 && newIndex < popups.length) {
        currentPopupIndex = newIndex; // Update de index
        const data = popups[currentPopupIndex];

        // Update de afbeelding
        popupImage.src = data.image || "";
        popupImage.style.display = data.image ? "block" : "none";

        // Update de tekst
        popupText.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.text}</p>
        `;

        // Voeg navigatieknoppen alleen toe als de volgende popup inhoud heeft
        const nextPopup = popups[currentPopupIndex + 1]; // Check de volgende popup
        const nextButton = nextPopup && (nextPopup.text || nextPopup.image || nextPopup.date)
            ? `<button class="popup-nav-button right" onclick="navigatePopupWithinYear(1)">Volgende &#x25B6;</button>`
            : "";

        const prevButton = currentPopupIndex > 0
            ? `<button class="popup-nav-button left" onclick="navigatePopupWithinYear(-1)">&#x25C0; Vorige</button>`
            : "";

        popupText.innerHTML += `
            ${prevButton}
            ${nextButton}
        `;

        // Update de datum en info-icoon
        const popupDate = document.getElementById('popup-date');
        if (data.date) {
            popupDate.innerHTML = `
                <span class="popup-date-text">${data.date}</span>
                <span class="info-icon" onclick="showExtraInfo()">i</span>
            `;
            popupDate.style.display = "flex"; // Zorg dat het zichtbaar is
        } else {
            popupDate.innerHTML = ""; // Leegmaken als er geen datum is
            popupDate.style.display = "none"; // Verbergen als er geen datum is
        }
    }
}




// Scroll event
const scrollContainer = document.querySelector('.timeline-scroll');
scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const popupCenter = window.innerWidth / 2;

    // Vind de eerste en laatste markers
    const firstMarker = markersArray.find(marker => {
        const yearLabel = marker.querySelector('.year-label').textContent;
        return yearLabel === "Start";
    });

    const lastMarker = markersArray.find(marker => {
        const yearLabel = marker.querySelector('.year-label').textContent;
        return yearLabel === "2025";
    });

    if (!firstMarker || !lastMarker) return; // Controleer of markers bestaan

    // Bereken de grenzen
    const minScrollLeft = firstMarker.offsetLeft - popupCenter + firstMarker.offsetWidth / 2;
    const maxScrollLeft = lastMarker.offsetLeft - popupCenter + lastMarker.offsetWidth / 2;

    // Beperk de scrollpositie
    if (scrollLeft < minScrollLeft) {
        scrollContainer.scrollLeft = minScrollLeft; // Beperk naar "Start"
    } else if (scrollLeft > maxScrollLeft) {
        scrollContainer.scrollLeft = maxScrollLeft; // Beperk naar "2025"
    }

    // Highlight de marker die het dichtst bij het midden is
    highlightMarkerOnLine();
});


scrollContainer.addEventListener('scroll', () => {
    const scrollLeft = scrollContainer.scrollLeft;
    const popupCenter = window.innerWidth / 2;

    let closestIndex = -1;
    let closestDistance = Infinity;

    markersArray.forEach((marker, index) => {
        const markerLeft = marker.offsetLeft - scrollLeft + marker.offsetWidth / 2;
        const distance = Math.abs(popupCenter - markerLeft);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
        }
    });

    if (closestIndex !== -1 && closestIndex !== currentYearIndex) {
        currentYearIndex = closestIndex;
        const yearLabel = markersArray[currentYearIndex].querySelector('.year-label').textContent;
        updatePopup(yearLabel === "Start" ? null : parseInt(yearLabel, 10));
        updateArrowVisibility(yearLabel);
    }
});




// Pijlnavigatie
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Eventlistener voor de "Beginnen"-knop
const introOverlay = document.getElementById('intro-overlay');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    introOverlay.style.display = 'none'; // Verberg de overlay
    const yearIndex = markersArray.findIndex(marker => {
        const yearLabel = marker.querySelector('.year-label').textContent;
        return yearLabel === "2000";
    });

    if (yearIndex !== -1) {
        scrollToYear(yearIndex); // Scroll naar 1999
    }
});

// Eventlistener voor de "Naar rechts"-knop
rightArrow.addEventListener('click', () => {
    // Verberg de overlay
    introOverlay.style.display = 'none'; // Verberg de overlay bij het klikken op de rechterpijl
});


// Verberg linkerpijl alleen als de marker "Start" actief is
function updateArrowVisibility(activeMarkerLabel) {
    const firstMarkerIndex = markersArray.findIndex(marker => {
        const yearLabel = marker.querySelector('.year-label').textContent;
        return yearLabel === "Start";
    });

    const lastMarkerIndex = markersArray.findIndex(marker => {
        const yearLabel = marker.querySelector('.year-label').textContent;
        return yearLabel === "2025";
    });

    // Verberg de linker pijl als de actieve marker "Start" is
    if (currentYearIndex === firstMarkerIndex) {
        leftArrow.style.visibility = "hidden";
    } else {
        leftArrow.style.visibility = "visible";
    }

    // Verberg de rechter pijl als de actieve marker "2025" is
    if (currentYearIndex === lastMarkerIndex) {
        rightArrow.style.visibility = "hidden";
    } else {
        rightArrow.style.visibility = "visible";
    }
}


// Scroll naar het volgende jaar
rightArrow.addEventListener('click', () => {
    if (currentYearIndex < markersArray.length - 1) {
        currentYearIndex++;
        scrollToYear(currentYearIndex);
    }
});

// Scroll naar het vorige jaar
leftArrow.addEventListener('click', () => {
    if (currentYearIndex > 0) {
        currentYearIndex--;
        scrollToYear(currentYearIndex);
    }
});

// Functie om naar een specifiek jaar te scrollen
function scrollToYear(index) {
    const targetMarker = markersArray[index];
    const targetPosition = targetMarker.offsetLeft - (800 / 2) + (targetMarker.offsetWidth / 2);

    scrollContainer.scrollTo({
        left: targetPosition,
        behavior: "smooth",
    });

    const yearLabel = targetMarker.querySelector('.year-label').textContent;
    updatePopup(yearLabel === "Start" ? null : parseInt(yearLabel, 10));
    updateArrowVisibility(yearLabel);
}



// Bij laden van de pagina
window.addEventListener("load", () => updateArrowVisibility("Start"));
// Toon een tweede popup

// Functie om de modal te openen met de vergrote afbeelding
function openModal(imageSrc) {
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");

    modal.style.display = "block"; // Toon de modal
    modalImage.src = imageSrc; // Zet de bron van de afbeelding in de modal
}

// Functie om de modal te sluiten
function closeModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none"; // Verberg de modal
}

// Eventlistener om op afbeeldingen te klikken
document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => {
        openModal(img.src); // Open modal met de bron van de geklikte afbeelding
    });
});

// Sluit de modal als je buiten de afbeelding klikt
window.addEventListener("click", (event) => {
    const modal = document.getElementById("image-modal");
    if (event.target === modal) {
        closeModal(); // Sluit de modal
    }
});


function navigatePopupWithinYear(direction) {
    if (lastActiveYear === null) return; // Geen popup actief

    const popups = popupData[lastActiveYear];
    if (!popups || popups.length === 0) return; // Geen data voor dit jaar

    // Bereken de nieuwe popup-index
    const newIndex = currentPopupIndex + direction;

    // Controleer of de nieuwe index binnen de array ligt
    if (newIndex >= 0 && newIndex < popups.length) {
        currentPopupIndex = newIndex; // Update de index
        const data = popups[currentPopupIndex];
        // Update de bronvermelding
        const sourceText = document.querySelector(".source-text");
        if (data.source && data.source.trim() !== "") {
            sourceText.innerHTML = `<strong>Bron:</strong> ${data.source}`;
            sourceText.style.display = "block"; // Toon de bron
        } else {
            sourceText.style.display = "none"; // Verberg als er geen bron is
        }
        // Update de afbeelding
        popupImage.src = data.image || "";
        popupImage.style.display = data.image ? "block" : "none";
        // Update de afbeeldingbron
        if (data.image) {
            popupImage.src = data.image; // Zet de nieuwe bron
            popupImage.style.display = "block"; // Toon de afbeelding
        } else {
            popupImage.style.display = "none"; // Verberg als er geen afbeelding is
        }
        // Update de tekst
        popupText.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.text}</p>
        `;

        // Voeg navigatieknoppen alleen toe als de volgende popup inhoud heeft
        const nextPopup = popups[currentPopupIndex + 1]; // Check de volgende popup
        const nextButton = nextPopup && (nextPopup.text || nextPopup.image || nextPopup.date)
            ? `<button class="popup-nav-button right" onclick="navigatePopupWithinYear(1)">Volgende &#x25B6;</button>`
            : "";

        const prevButton = currentPopupIndex > 0
            ? `<button class="popup-nav-button left" onclick="navigatePopupWithinYear(-1)">&#x25C0; Vorige</button>`
            : "";

        popupText.innerHTML += `
            ${prevButton}
            ${nextButton}
        `;

        // Update de datum en info-icoon
        const popupDate = document.getElementById('popup-date');
        if (data.date) {
            popupDate.innerHTML = `
                <span class="popup-date-text">${data.date}</span>
                <span class="info-icon" onclick="showExtraInfo()">i</span>
            `;
            popupDate.style.display = "flex"; // Zorg dat het zichtbaar is
        } else {
            popupDate.innerHTML = ""; // Leegmaken als er geen datum is
            popupDate.style.display = "none"; // Verbergen als er geen datum is
        }
    }
}



