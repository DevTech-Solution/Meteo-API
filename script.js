//---------------------------------------------------------------------//
                    // SCRIPT JS SITE METEO //
//---------------------------------------------------------------------//
// API URL (https://open-meteo.com/)
let url = "https://api.open-meteo.com/v1/forecast?latitude=45.9897&longitude=4.7196&daily=weather_code,temperature_2m_min,apparent_temperature_max&hourly=temperature_2m,rain,weather_code,wind_speed_10m,apparent_temperature,precipitation,snowfall,snow_depth,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,soil_temperature_0cm,soil_moisture_0_to_1cm,wind_speed_80m,wind_speed_120m,wind_speed_180m,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,is_day&current=weather_code,is_day,rain,wind_direction_10m,wind_speed_10m,wind_gusts_10m,apparent_temperature,precipitation,temperature_2m,snowfall&timezone=auto";
//---------------------------------------------------------------------//
                        // SELECTEURS //
//---------------------------------------------------------------------//
// DATE
let dateTme = document.querySelector(".date-time");
// JOUR/NUIT
let dayJourElement = document.querySelector(".day-jour");
let dayNuitElement = document.querySelector(".day-nuit");
// METEO ACTUEL
let ConditionMeteoActuel = document.querySelector(".condition-meteo");
let imgMeteoActuel = document.querySelector(".img-weather");
let TempActuel = document.querySelector(".temperature");
// VENTS
let wind = document.querySelector(".vitesse-wind");
// TEMPERATURE PAR HEURE
let temperatureHeure = document.querySelector(".cards-temp");
// TEMPS PAR JOUR AVEC DATE + TEMPERATURE + IMG EN FONCTION DU TEMPS
let cardsWeather = document.querySelector(".cards-weather");
//
//--- TABLEAU CODE WEATHER METEO
//
let tableauMeteoActuel = {
    0: { description: "Ciel dégagé", image: "./images/meteo-actuel/soleil.png", background:"./images/background/degagé.jpg" },
    1: { description: "Principalement clair", image: "./images/meteo-actuel/couvert.png", background:"./images/background/principalement_clair.jpg" },
    2: { description: "Partiellement nuageux", image: "./images/meteo-actuel/couvert.png", background:"./images/background/nuageux.jpg" },
    3: { description: "Couvert", image: "./images/meteo-actuel/couvert.png", background:"./images/background/couvert.jpg" },
    45: { description: "Brouillard", image: "./images/meteo-actuel/nuage.png", background:"./images/background/nuageux.jpg" },
    48: { description: "Brouillard givrant", image: "./images/meteo-actuel/nuage.png", background:"./images/background/nuageux.jpg" },
    51: { description: "Bruine légère", image: "./images/meteo-actuel/nuage.png", background:"./images/background/nuageux.jpg" },
    53: { description: "Bruine modérée", image: "./images/meteo-actuel/nuage.png", background:"./images/background/nuageux.jpg" },
    55: { description: "Bruine dense", image: "./images/meteo-actuel/nuage.png", background:"./images/background/nuageux.jpg" },
    61: { description: "Pluie légère", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    63: { description: "Pluie modérée", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    65: { description: "Pluie forte", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    66: { description: "Pluie verglaçante légère", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    67: { description: "Pluie verglaçante forte", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    71: { description: "Neige faible", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    73: { description: "Neige modérée", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    75: { description: "Neige forte", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    77: { description: "Grains de neige", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    80: { description: "Averses légères", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    81: { description: "Averses modérées", image: "./images/meteo-actuel/nuage-pluie-soleil.png", background:"./images/background/nuageux.jpg" },
    85: { description: "Averses de neige légères", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    86: { description: "Averses de neige fortes", image: "./images/meteo-actuel/neige.png", background:"./images/background/neige.jpg" },
    95: { description: "Orages", image: "./images/meteo-actuel/orage.png", background:"./images/background/eclair.jpg" },
    96: { description: "Orages avec grêle faible", image: "./images/meteo-actuel/orage.png", background:"./images/background/eclair.jpg" },
    99: { description: "Orages avec grêle forte", image: "./images/meteo-actuel/orage.png", background:"./images/background/eclair.jpg" },
};
//---------------------------------------------------------------------//
//
        // CHARGEMENT DES DONNEES API/JSON (Méthode AJAX) //
//
//---------------------------------------------------------------------//
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        //---------------------------------------------------------------------//
        //----- Fonction pour mettre à jour l'heure dynamiquement
        function updateTime() {
            let heure = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            document.querySelector('.date p:last-child').textContent = heure;
        }
        //---------------------------------------------------------------------//
        //
        // Affichage de l'heure actuelle et des données horaires
        let heure = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        //
        // Affichage date actuelle au format jj/mm/aaaa
        let currentDate = new Date();
        let day = currentDate.getDate().toString().padStart(2, '0'); 
        let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
        let year = currentDate.getFullYear(); 
        // Format de la date FINAL
        let DateFormat = `${day}/${month}/${year}`;
        //
        // Création du contenu HTML pour afficher l'heure actuelle
        let contentHTMLTime = `
            <div class="date">
                <p>${DateFormat}</p>
                <p>${heure}</p>
            </div>
        `;
        //
        // Affichage dans le DOM
        dateTme.innerHTML = contentHTMLTime;
        //
        // Actualisation de l'heure toutes les secondes 1000 millisecondes = 1seconde
        setInterval(updateTime, 1000);
        //
        //---------------------------------------------------------------------//
                            // AFFICHAGE FUNCTIONS //
        //---------------------------------------------------------------------//
        // JOUR ET NUIT
        AffichageJourNuit(data);
        // METEO ACTUEL
        MeteoActuel(data);
        // VENT ACTUEL
        Wind(data);
        // TEMPERATURE PAR HEURE
        tempHeure(data);
        // TEMPS PAR JOUR + HEURE
        TempsJoursDate(data)
    });
    //
    //---------------------------------------------------------------------//
    //--- Function Affichage Jour/Nuit
    function AffichageJourNuit(data) {
        //
        //
        if (data.current.is_day == 1) {
            // JOUR
            dayJourElement.style.display = 'block';
            dayNuitElement.style.display = 'none';
        } else {
            // NUIT
            dayJourElement.style.display = 'none';
            dayNuitElement.style.display = 'block';
        };
    };
    //---------------------------------------------------------------------//
    //--- Function Meteo Actuel
    //
    function MeteoActuel(data) {
        //
        // Affichage des valeurs du tableauMeteoActuel dans la console
        for (let key in tableauMeteoActuel) {

            if (data.current.weather_code == key) {

            // Affichage clef + valeur recupéré et affiché dans la console
            console.log("Code récupéré:" + " " + key + " " + tableauMeteoActuel[key].description);

            // Création du contenu HTML en fonction du code météo actuel
            let contentHTMLActuel = `
            <div class="title-temps-actuel">
                <p>${tableauMeteoActuel[key].description}</p>
                <img src="${tableauMeteoActuel[key].image}">
                <p>${data.current.apparent_temperature} ${data.current_units.temperature_2m}</p>
            </div>
            `;
            //-----------------------------------------------------------//
            // Affichage dans le DOM
            ConditionMeteoActuel.innerHTML = contentHTMLActuel;
            //
            //BACKGROUND BODY
            document.body.style.backgroundImage = `url('${tableauMeteoActuel[key].background}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundRepeat = "no-repeat";
            //-----------------------------------------------------------//
            };
        };
    };
    //---------------------------------------------------------------------//
    //--- Function Vitesse Vent
    function Wind(data){
        //
        // Création du contenu HTML en fonction du code météo actuel
        let contentHTMLWind = `
        <div class="wind-vitesse">
            <p>${data.current.wind_speed_10m} m/s</p>
        </div>
        `;
        wind.innerHTML = contentHTMLWind;
    };
    //---------------------------------------------------------------------//
    //--- Function Temperature Par Heure
    function tempHeure(data) {
        //
        // VARIABLES
        let heuresTemperatures = data.hourly.temperature_2m;
        let dateHeure = data.hourly.time;
        let heuresPrecipitation = data.hourly.precipitation;
        //
        // SLICE PERMET d'extraire une partie du contenu du tableau
        let temperatures = heuresTemperatures.slice(0, 24);
        let heureParis = dateHeure.slice(0, 24);
        let precipitationTemps = heuresPrecipitation.slice(0, 24);
        //
        // Vider l'affichage avant d'ajouter du nouveau contenu
        temperatureHeure.innerHTML = "";
        //
        for (let index in temperatures) {

            let dateObj = new Date(heureParis[index]); // Convertir la chaîne en Date
        
            let content = `
                <div class="item">
                    <div class="temp-meteo-temp">
                        <img src="./images/pictos/heures/thermometer.png">
                        <p>${temperatures[index]}°C</p>
                    </div>
                    <div class="temp-meteo-pluies">
                        <img src="./images/pictos/heures/umbrella.png">
                        <p>${precipitationTemps[index]} mm</p>
                    </div>
                    <p>${dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            `;
            temperatureHeure.innerHTML += content;
        };
    };
    //---------------------------------------------------------------------//
    //--- Function Meteo par jour (+ Temperature + IMG en fonction du temps)
    //
    function TempsJoursDate(data) {
        //
        //Affichage en degrès (Min et Max)
        let degresMin = data.daily_units.temperature_2m_min;
        let degresMax = data.daily_units.apparent_temperature_max;
        //
        // Vider le tableau
        let contentTempsDays = "";
        //
        // Boucle pour récupérer les données
        for (let indexTemps in data.daily.time) {

            for (let indexJourMeteo in tableauMeteoActuel) {

                if(indexJourMeteo == data.daily.weather_code[indexTemps]){

                // Contenu HTML
                contentTempsDays += `
                    <div class="item">
                        <p>${ data.daily.time[indexTemps] }</p>
                        <img src="${ tableauMeteoActuel[indexJourMeteo].image }">
                        <p>${ data.daily.apparent_temperature_max[indexTemps] + degresMax }</p>
                        <p>${ data.daily.temperature_2m_min[indexTemps] + degresMin }</p>
                    </div>
                `;
                }
            }
        }
        // Ajouter du contenu "contentTempsDays" dans le DOM "cards-weather"
        cardsWeather.innerHTML = contentTempsDays;
    }
    //----------------------------------------------------------------------------------------------------------------//