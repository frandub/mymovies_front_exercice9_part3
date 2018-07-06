import React, { Component } from 'react';
//import de la librairie bootstrap
import 'bootstrap/dist/css/bootstrap.css';
//import des composants bootstrap utilisés dans cette appli
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import { Container, Row, Col } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
//import de ma feuille CSS de ce projet
import './App.css';



//COMPOSANT PRINCIPAL QUI SERA EXPORTE
class Plus_grand_poupee_russe extends Component {

        // LE CONSTRUCTOR: attention il ne peut y avoir qu'un seul constructor par composant !!!!
        constructor(props) {

                 //LES BINDS DU CONSTRUCTOR:
                        //je bind l'action BOUTON POP OVER  avec la fct TOGGLE
                        super(props);
                        this.toggle = this.toggle.bind(this);
                        this.state = {popoverOpen: false};
                        //je bind l'action de mon compteur de likes avec ...la fct handleclick
                        this.handleClick = this.handleClick.bind(this);
                        // je bind l'ACTION DU BOUTON "MYMOVIES" avec la fct voirMesFilmsFavoris
                        this.voirMesFilmsFavoris = this.voirMesFilmsFavoris.bind(this);
                        //CREATION D'UN ETAT  existant par défaut :
                        this.state = {
                          viewOnlyLike: false ,
                          movieCount:0,
                          movieNameList:[]
                        };
                         // je bind l'ACTION DU BOUTON "LAST RELEASES" avec la fct nePasVoirMesFilmsFavoris
                         this.nePasVoirMesFilmsFavoris = this.nePasVoirMesFilmsFavoris.bind(this);


                        //----------------------------------------------------------

        } // fin du constructor



        //LES FONCTIONS
                // LA fonction TOGGLE (bouton pop over)
                //rappel: ceci est une fonction ASYNCHRONE declenchee par un truc ...
                toggle() {
                  this.setState({
                    popoverOpen: !this.state.popoverOpen
                  });
                };



                //la fonction HANDLECLICK attend 2 valeurs, qui , recues dans l'ordre vont venir remplir les 2 bocaux prevus a cet effet.
                    //le remplissage est automatique! donc l'ordre d'envoi des parametres ets primordial!!
                    //je les appele receptacleTOTOversParent car c'est des toto que j'envoie du composant movie vers son parent, et que j'encapsule dans les "receptacles" "receptacletotoversparent"
                    handleClick(ReceptacleSelectedVersPArent,ReceptacleFilmNameVersParent) {
                      // mise a jour de movieCount et de movieNameList
                            //si le film est liké,
                            if (ReceptacleSelectedVersPArent==false){
                               //je l'ajoute à la liste de films favoris
                                this.setState({movieCount: this.state.movieCount+1});
                                //et je crée un tableau temporaire pour...
                                var Temporary_table = [...this.state.movieNameList];
                                Temporary_table.push(ReceptacleFilmNameVersParent);
                                //pour pouvoir remplir mon STATE ( movieNameList) avec plusieurs valeurs à la fois, câd une liste de films...
                                this.setState({movieNameList:Temporary_table});

                            //Sinon:
                          }else if (ReceptacleSelectedVersPArent==true) {
                                //je décrémente le state MovieCount
                                this.setState({ movieCount: this.state.movieCount-1});
                                //et je supprime le film de la liste
                                  //pour cela je dois mettre le state movienamelist dans un tabeau temporaire, pour pouvoir le travailler aisément
                                  var Temporary_table = [...this.state.movieNameList];
                                  //puis je repere l'index de film qui est a retirer et je le retire
                                  var indexfilmAretirer = Temporary_table.indexOf(ReceptacleFilmNameVersParent);
                                  console.log(indexfilmAretirer);
                                  Temporary_table.splice(indexfilmAretirer,1);
                                  this.setState({ movieNameList: Temporary_table});

                            };



                };//fin de la fonction HANDLECLICK


                // La fonction voirMesFilmsFavoris (bouton MYMOVIES )
                //rappel: ceci est une fonction ASYNCHRONE declenchee par un truc ...
                voirMesFilmsFavoris(){
                           this.setState({ viewOnlyLike : true });
                };




                // la fonction voirMesFilmsFavoris (bouton MYMOVIES )
                //rappel: ceci est une fonction ASYNCHRONE declenchee par un truc ...
                nePasVoirMesFilmsFavoris(){
                             this.setState({ viewOnlyLike : false });
                };









  render() {

      var Etat_viewOnlyLike = this.state.viewOnlyLike;
      var tousLesFilms = [
        { nom:'Blade Runner' ,  real :'Ridley Scott', description: "Dans les dernières années du 20ème siècle, des milliers d'hommes et de femmes partent à la conquête de l'espace, fuyant les mégalopoles devenues insalubres",  annee :1982, interditMoins16ans:true } ,
        { nom:'Budapest' ,  real :'Toto', description: "Les cartels mexicains font régner la terreur à la frontière entre le Mexique et les États-Unis. Rien ni personne ne semble pouvoir les contrer. L'agent ",  annee :2018, interditMoins16ans:false  } ,
        { nom:'Les Affamés' ,  real :'Steeve mc queen ', description: "Vincent et Arnaud, deux amis qui s’ennuient dans leur travail, décident de tout plaquer pour créer « Crazy Trips » : ",  annee :2017 , interditMoins16ans:false } ,
        { nom:'Love Simon' ,  real :'Ryan Gosling', description: "Zoé a 21 ans. Et Zoé en a sa claque d'entendre « c'est normal, t'es jeune ! ». Alors qu’elle emménage en colocation, elle prend conscience qu’elle n’est ",  annee :2019, interditMoins16ans:true  } ,

      ];






     // la GROSSE astuce est ici: pour que dans le MAP je puisse me servir du This du composant parent, ben il faut encapsuler le This dans une variable temporaire
     //c'est une astuce javascript...
      var ctx = this;

              //--------------------------------------------------------------------------------------------------
              //BOUCLE: on parcourt ce tableau "tousLesFilms" avec une fonction ".map"
              //Remarque : on pouvait aussi le faire avec une boucle classique come celle ci
                      //var filmList = [];
                      //for(var i=0; i<tousLesFilms.length; i++){
                        //ci dessous je demande à mettre dans ma variable filmList: le composant Fiche_film (a qui je passe comme parametre filmName et filmNumber)
                        //filmName  recoit  les infos du tableau     ;   filmNumber   recoit le numero de la place occupé dans cette boucle
                        //filmList.push(<Fiche_film filmName={tousLesFilms[i].nom}    filmDescr={tousLesFilms[i].description}  filmReal={tousLesFilms[i].real} filmAnnee={tousLesFilms[i].annee}  filmNumber={i}/>);
                      //}

                  var filmList = tousLesFilms.map(function(filmName, i) {
                  //je fais un prétraitement juste pour savoir si ce film est filminterditMoins16ans:
                              var interdiction ='';
                              if (tousLesFilms[i].interditMoins16ans == true) {
                              interdiction= 'Film interdit aux moins de 16 ans';
                               } else {
                              interdiction='';
                              }
                  //ci dessous je mets dans ma variable filmList: le composant Fiche_film (a qui je passe comme parametre filmName et filmNumber)
                  //attention, le viewonlylike ici c'est  la valeur d'un Etat qui est envoyé dans une propriété , donc derriere faudra le recuperer en .props
                  //je suis donc en train de parser le tableau movielist  avec un MAP, et a chaque ligen du tableau j'envoie des propriétés à l'autre composant nomé boite_a_films,
                  //et j'en profite pour lui passer  Propriété_viewOnlyLike que j'ai mis ds une variable juste avant la boucle car sinon le mot this.state aurait rendu "undefined", car la boucle a elle meme son this qui n'a rien a voir..
                  //propriété argumentEnfantVersParent={this.handleClick}   --> là je lui envoie une partie du parent pour que l'enfant puisse communiquer avec son parent (voir cours lacapsule)
                  return <Fiche_film  argumentEnfantVersParent={ctx.handleClick}   key={i} Propriété_viewOnlyLike={Etat_viewOnlyLike} filmName={tousLesFilms[i].nom}  filmDescr={tousLesFilms[i].description}  filmReal={tousLesFilms[i].real} filmAnnee={tousLesFilms[i].annee}  filmInterdiction={interdiction} filmNumber={i}     />;
              })
              //--------------------------------------------------------------------------------------------------

              //--------------------------------------------------------------------------------------------------
              // VARIABLE A ENVOYER AU BOUTON POP OVER POUR AFFICHER LES 3 DERNEIRS FILMS SELECTIONNES
              //je fais un prétraitement pour concaténer els 3 derniers films séléctionnés en favoris par l'utilsateur :
              //bon la on imagine que
              var myFavoriteMovies = [...this.state.movieNameList];
              //traitement pour ne retenir que les 3 derniers :
              var moviesLast = " ";

              //je stocke le nb d films mis en favoris dans une VARIABLE
              var nombreFilmsAjoutes = this.state.movieCount + ' favoris';
              // je compte le nb de ligens ds le tableau,
              if (myFavoriteMovies.length >=3) {
                console.log('plus de 3 flms')
                //si >=3 --> je prendrai els 3 dernierees
                moviesLast = myFavoriteMovies[myFavoriteMovies.length - 1];
                moviesLast = moviesLast +', '+ myFavoriteMovies[myFavoriteMovies.length - 2];
                moviesLast = moviesLast +', '+ myFavoriteMovies[myFavoriteMovies.length - 3]+"...";
              } else if (myFavoriteMovies.length ==2){
                //si 2 je prends les 2 denreires et j'affiche "..."
                moviesLast = myFavoriteMovies[myFavoriteMovies.length - 1];
                moviesLast = moviesLast + ', '+myFavoriteMovies[myFavoriteMovies.length - 2];
              } else if (myFavoriteMovies.length ==1){
                //si 1 je prends le seul existant
                moviesLast = myFavoriteMovies[myFavoriteMovies.length - 1];
              } else if (myFavoriteMovies.length ==0){
                //si 0 j'affiche "pas de films en favoris"
                moviesLast = "Aucun film mis en favori";
              };
              //--------------------------------------------------------------------------------------------------





    return (
            // ma page HTML ICI :
            <div className="monBody">
                    <div  id="monHeader">
                            <img src="./logo.png" />
                            <Button className="font_menu" onClick={this.nePasVoirMesFilmsFavoris}>  Last releases </Button>
                            <Button className="font_menu" onClick={this.voirMesFilmsFavoris}>  My movies </Button>
                            <div>
                                <Button id="Popover1" onClick={this.toggle}>
                                {nombreFilmsAjoutes}

                                </Button>
                                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                                  <PopoverHeader>Derniers films ajoutés</PopoverHeader>
                                  <PopoverBody>{moviesLast}</PopoverBody>
                                </Popover>
                            </div>
                    </div>






                            <div className="monConteneurdeFilms">
                                      {filmList}

                          </div>


            </div>
          ); // fin du RETURN
      } // fin du RENDER
}  //fin du COMPOSANT PRINCIPAL QUI SERA EXPORTE










































//  COMPOSANT fiche_film
class Fiche_film extends Component {



        //LE CONSTRUCTOR
        constructor() {
            super();
             //LES BINDS
             //le bind de la fct ecoute_like
             this.ecoute_like = this.ecoute_like.bind(this);
             //CREATION D'UN ETAT:
             //au lieu d'ecrire ça je pouvais aussi ecrire this.setState({like:!this.state.like})  , câd que j'inverse le statut à chaque clic.
             this.state = {
               selected: '' ,
               etat_du_like:'far fa-heart like_FD'};
            //le bind de la fct handleclick
        }


        //MES FONCTIONS
        //atention ces fonctions sont ASYNCHRONEs

        //la fonction ecoute_like
        ecoute_like(){
              //et ici code qui change les etats du coeur en fonction de si on a liké ou pas ce bouton
               if (this.state.selected==false) {
                      //ici je mets a jour un etat constitué d'un objet
                       this.setState({ selected : true , etat_du_like:'fas fa-heart like_FD'  });
               }else{
                     //ici je mets a jour un etat constitué d'un objet
                       this.setState({ selected : false , etat_du_like:'far fa-heart like_FD' });
                 };
                 //-------------------------------------

                 // j'active la fct handleclick localisée plus haut dans mon composant Parent , quand je clique sur mon icone Coeur  ((et je lui envoie des parametres))
                 var FilmNameVersParent = this.props.filmName;
                 var SelectedVersPArent = this.state.selected;
                 this.props.argumentEnfantVersParent(SelectedVersPArent,FilmNameVersParent);
                 //---------------------------------
          };   //---fin de la fonction ecoute_like-------------------------------------------------------





  render() {

              // VAriable isDISPLAY
              var isDisplay;
              if (this.props.Propriété_viewOnlyLike == true  && this.state.selected== false){
                  isDisplay = {display:"none"}
              };




    return (

      <div className="boite_A_film"  style={isDisplay} >
          <Card>
            <CardImg top  src="http://www.megarex.fr/films/affiches/N0000148485.jpg" alt="Card image cap"  className="films_image"/>
            <CardBody>
              <i class={this.state.etat_du_like}   onClick={this.ecoute_like} >{this.state.like}  Likes</i>

              <CardTitle className="font_film_titre" >{this.props.filmName} </CardTitle>
              <CardSubtitle className="font_realisateur" >{this.props.filmReal}</CardSubtitle>
              <CardText>{this.props.filmDescr}</CardText>
              <CardTitle>{this.props.filmInterdiction}</CardTitle>
              <Button>Voir la bande annonce</Button>
            </CardBody>
          </Card>
      </div>





    );
  }
}
// fin du COMPOSANT fiche_film













export default Plus_grand_poupee_russe;
