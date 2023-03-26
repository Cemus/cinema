//Variable
let listeActuelle = [];
let nav = 0;

//Preload
async function loadData() {
    const url ="https://docs.google.com/spreadsheets/d/1OeoL8SLc6uDoicWNEbwT4qwVMq9gEz0euL19bSqcp7g/edit#gid=0";
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if(xmlhttp.readyState == 4 && xmlhttp.status==200){
        document.getElementById("googlesheet").innerHTML = xmlhttp.responseText;
        tousLesFilms();
      }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
}

loadData();



let Film = function (quiPropose, titre,  plateforme, realisateur, acteur, notePresse, filmnoteSpectateur, synopsis, vuKevouche, vuHelo, vuEnsemble, image){
    let film = {};
    film.quiPropose = quiPropose;
    film.titre = titre;
    film.plateforme = plateforme;
    film.realisateur = realisateur;
    film.acteur = acteur;
    film.notePresse = notePresse;
    film.filmnoteSpectateur = filmnoteSpectateur;
    film.synopsis = synopsis;
    film.vuKevouche = vuKevouche;
    film.vuHelo = vuHelo;
    film.vuEnsemble = vuEnsemble
    film.image = image;
}

function usineObjet(quiPropose){
    let titre, plateforme, realisateur, acteur, notePresse, noteSpectateur, synopsis, vuKevouche, vuHelo, vuEnsemble, image;
    titre = quiPropose.nextElementSibling;
    plateforme = titre.nextElementSibling;
    realisateur = plateforme.nextElementSibling;
    acteur = realisateur.nextElementSibling;
    notePresse = acteur.nextElementSibling;
    noteSpectateur = notePresse.nextElementSibling;
    synopsis = noteSpectateur.nextElementSibling;
    vuKevouche = synopsis.nextElementSibling;
    vuHelo = vuKevouche.nextElementSibling;
    vuEnsemble = vuHelo.nextElementSibling;
    image = vuEnsemble.nextElementSibling;

    return{
        quiPropose: quiPropose.textContent,
        titre: titre.textContent,
        plateforme: plateforme.textContent,
        realisateur: realisateur.textContent,
        acteur: acteur.textContent,
        notePresse: notePresse.textContent,
        noteSpectateur: noteSpectateur.textContent,
        synopsis: synopsis.textContent,
        vuKevouche: vuKevouche.textContent,
        vuHelo: vuHelo.textContent,
        vuEnsemble: vuEnsemble.textContent,
        image: image.textContent,
    }
}

function detruireLoading(){
    const containerLoading = document.getElementById("circle-container");
    if (containerLoading !== null) {
        const loading = document.getElementById("circle");
        const loadingComputed = window.getComputedStyle(loading);
    
        let computedLoadingOpacity = loadingComputed.getPropertyValue("opacity");
        loading.classList.add("out");
        containerLoading.classList.add("out-container");
        const interval = setInterval(() => {
            computedLoadingOpacity = loadingComputed.getPropertyValue("opacity");        
            if (computedLoadingOpacity <= 0){
                clearInterval(interval);
                containerLoading.remove();
            }
        }, 500);
    }
}

function listeObjet(){
    let i = 1;
    let quiPropose;
    let listeFilm = [];
    let film;
    array = [];
    while (document.getElementById("0R" + i).nextElementSibling.textContent == "Helo" || document.getElementById("0R" + i).nextElementSibling.textContent == "Kevouche"){
        quiPropose = document.getElementById("0R" + i).nextElementSibling;
        film = usineObjet(quiPropose);
        listeFilm.push(film)
        i++;
    }
    return listeFilm;
}

function navPlus(){
    if (nav + 1 > listeActuelle.length){
        nav = 1;
    }
    else{
        nav = nav + 1;
    }

    createCard(listeActuelle);
}

function navMoins(){
    if (nav - 1 < 0){
        nav = listeActuelle.length - 1;
    }
    else{
        nav = nav - 1;
    }
    createCard(listeActuelle);
}

function Visiblity(mode){
    const cardContainer = document.getElementById("card-container")
    const hasardContainer = document.getElementById("hasard-container");
    switch (mode){
        case "on":

            //Anim
            hasardContainer.classList.remove("comingIn");
            hasardContainer.classList.add("comingOut");
            //Anim
            cardContainer.classList.remove("comingOut");
            cardContainer.classList.add("comingIn");
            break;
        
        case "off":

            //Anim
            hasardContainer.classList.add("comingIn");
            hasardContainer.classList.remove("comingOut");

            //Anim
            cardContainer.classList.remove("comingIn");
            cardContainer.classList.add("comingOut");

            break;
    }
}

function boutonActif(numeroActif){
    const bouton = document.getElementsByClassName("bouton-menu");
    for (let i = 0; i < 3; i++) {
        if (i == numeroActif){
            bouton[i].classList.add("bouton-actif");
        }
        else{
            bouton[i].classList.remove("bouton-actif");           
        }
    }
}

function tousLesFilms(){
    Visiblity("on");
    detruireLoading();
    nav = 0;
    let listeFilm = [];       
    listeFilm = listeObjet();
    listeActuelle = listeFilm;
    createCard(listeActuelle);
}

function filmHasard(){
    boutonActif(0);
    Visiblity("off");
    //Interaction avec la carte
    const cards = document.getElementsByClassName("card");
    const card = cards[3];
    if (!card.children[0].classList.contains("secret")){
        card.children[0].classList.add("secret");
    }
    card.style.backgroundImage = "url(img/surprise.jpg)";
    card.addEventListener("click", () =>{
        card.classList.remove("secret-card");
        card.classList.add("spin");
        setTimeout(() => {
            card.classList.add("secret-card");
            card.classList.remove("spin");
            const listeFilm = listeObjet();
            let listeTriee = []; 
            listeActuelle = [];
            for (let i = 0; i < listeFilm.length; i++) {
                if (listeFilm[i].vuEnsemble == "Non"){
                     listeTriee.push(listeFilm[i]);
                } 
            }
            const randomNumber = Math.floor(Math.random() * listeTriee.length + 1);
            listeActuelle.push(listeTriee[randomNumber]);
            createRandomCard(listeActuelle);
            card.children[0].classList.remove("secret");
        }, 1000);
    });
}

function filmsPasVus(){
    boutonActif(1);
    Visiblity("on");
    nav = 0;
    const listeFilm = listeObjet();
    let listeTriee = []; 
    for (let i = 0; i < listeFilm.length; i++) {
        if (listeFilm[i].vuEnsemble == "Non"){
             listeTriee.push(listeFilm[i]);
        } 
    }
    listeActuelle = listeTriee;
    createCard(listeActuelle);
}

function filmsVus(){
    boutonActif(2);
    Visiblity("on");
    nav = 0;
    let listeTriee = []; 
    const listeFilm = listeObjet();
    for (let i = 0; i < listeFilm.length; i++) {
        if (listeFilm[i].vuEnsemble == "Oui"){
             listeTriee.push(listeFilm[i]);
        } 
    }
    listeActuelle = listeTriee;
    createCard(listeActuelle);
}

function createCard(array){
    const listeFilm = [...array];
    const card = document.getElementsByClassName("card");
    const titre = document.getElementsByClassName("titre");
    const synopsis = document.getElementsByClassName("synopsis");
    const notePresse = document.getElementsByClassName("note-presse");
    const noteSpectateur = document.getElementsByClassName("note-spectateur");
    for (let i = 0; i < 3; i++) {
        let navigation = nav;
        if (navigation + i >= listeFilm.length){
            navigation = navigation - listeFilm.length + i;
        }
        else{
            navigation = navigation + i;
        }
        if (listeFilm[navigation].image !== ""){
            card[i].style.backgroundImage = `url(${listeFilm[navigation].image})`
        }
        else{
            card[i].style.backgroundImage = `url(https://www.ulyces.co/wp-content/uploads/2018/01/posters_2_1500-400x600.jpg)`
        }
        titre[i].innerHTML = listeFilm[navigation].titre;
        listeFilm[navigation].synopsis !== "" ? synopsis[i].innerHTML = listeFilm[navigation].synopsis : synopsis[i].innerHTML = "Il n'y a pas de description ;)";
        listeFilm[navigation].notePresse !== "" ? notePresse[i].innerHTML = listeFilm[navigation].notePresse : notePresse[i].innerHTML = "abs";
        listeFilm[navigation].noteSpectateur !== "" ? noteSpectateur[i].innerHTML = listeFilm[navigation].noteSpectateur : noteSpectateur[i].innerHTML = "abs";
    }
}

function createRandomCard(array){
    const listeFilm = [...array];
    const card = document.getElementsByClassName("card");
    const titre = document.getElementsByClassName("titre");
    const synopsis = document.getElementsByClassName("synopsis");
    const notePresse = document.getElementsByClassName("note-presse");
    const noteSpectateur = document.getElementsByClassName("note-spectateur");

    if (listeFilm[0].image !== ""){
        card[3].style.backgroundImage = `url(${listeFilm[0].image})`
    }
    else{
        card[3].style.backgroundImage = `url(https://www.ulyces.co/wp-content/uploads/2018/01/posters_2_1500-400x600.jpg)`
    }
    titre[3].innerHTML = listeFilm[0].titre;
    listeFilm[0].synopsis !== "" ? synopsis[3].innerHTML = listeFilm[0].synopsis : synopsis[3].innerHTML = "Il n'y a pas de description ;)";
    listeFilm[0].notePresse !== "" ? notePresse[3].innerHTML = listeFilm[0].notePresse : notePresse[3].innerHTML = "abs";
    listeFilm[0].noteSpectateur !== "" ? noteSpectateur[3].innerHTML = listeFilm[0].noteSpectateur : noteSpectateur[3].innerHTML = "abs";
}
