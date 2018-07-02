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
  //PARTIE JS DU BOUTON POP OVER
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }
  // fin de PARTIE HTML DU BOUTON POP OVER




  render() {
      var tousLesFilms = [
        { nom:'Blade Runner' ,  real :'Ridley Scott', description: "Dans les dernières années du 20ème siècle, des milliers d'hommes et de femmes partent à la conquête de l'espace, fuyant les mégalopoles devenues insalubres",  annee :1982, interditMoins16ans:true } ,
        { nom:'Budapest' ,  real :'Toto', description: "Les cartels mexicains font régner la terreur à la frontière entre le Mexique et les États-Unis. Rien ni personne ne semble pouvoir les contrer. L'agent ",  annee :2018, interditMoins16ans:false  } ,
        { nom:'Les Affamés' ,  real :'Steeve mc queen ', description: "Vincent et Arnaud, deux amis qui s’ennuient dans leur travail, décident de tout plaquer pour créer « Crazy Trips » : ",  annee :2017 , interditMoins16ans:false } ,
        { nom:'LOve Simon' ,  real :'Ryan Gosling', description: "Zoé a 21 ans. Et Zoé en a sa claque d'entendre « c'est normal, t'es jeune ! ». Alors qu’elle emménage en colocation, elle prend conscience qu’elle n’est ",  annee :2019, interditMoins16ans:true  } ,

      ];

      //on parcourt ce tableau "tousLesFilms" avec une fonction ".map"
      var filmList = tousLesFilms.map(function(filmName, i) {

      //je fais un prétraitement juste pour savoir si ce film est filminterditMoins16ans:
          var interdiction ='';
          if (tousLesFilms[i].interditMoins16ans == true) {
          interdiction= 'Film interdit aux moins de 16 ans';
          console.log('Film interdit aux moins de 16 ans');
           } else {
          interdiction='';
          }

      // VARIABLE A ENVOYER AU BOUTON POP OVER POUR AFFICHER LES 3 DERNEIRS FILMS SELECTIONNES
      //je fais un prétraitement pour concaténer els 3 derniers films séléctionnés en favoris par l'utilsateur :
      //bon la on imagine que
      var myFavoriteMovies = [ "Blade Runner", "Budapest", "Les Affamés", 'LOve Simon'] ;
      //traitement pour ne retenir que les 3 derniers :
      var moviesLast = " ";
      moviesLast = myFavoriteMovies[myFavoriteMovies.length - 1];
      moviesLast = moviesLast + myFavoriteMovies[myFavoriteMovies.length - 1];
      moviesLast = moviesLast + myFavoriteMovies[myFavoriteMovies.length - 1];
      console.log(moviesLast);



      //ci dessous je mets dans ma variable filmList: le composant Fiche_film (a qui je passe comme parametre filmName et filmNumber)
      return
      <Fiche_film   filmName={tousLesFilms[i].nom}  filmDescr={tousLesFilms[i].description}  filmReal={tousLesFilms[i].real} filmAnnee={tousLesFilms[i].annee}  filmInterdiction={interdiction} filmNumber={i}/>;
      <Header  moviesLast={moviesLast}  />;

      })


      //Remarque : on pouvait aussi le faire avec une boucle classique come celle ci
              //var filmList = [];
              //for(var i=0; i<tousLesFilms.length; i++){
                //ci dessous je demande à mettre dans ma variable filmList: le composant Fiche_film (a qui je passe comme parametre filmName et filmNumber)
                //filmName  recoit  les infos du tableau     ;   filmNumber   recoit le numero de la place occupé dans cette boucle
                //filmList.push(<Fiche_film filmName={tousLesFilms[i].nom}    filmDescr={tousLesFilms[i].description}  filmReal={tousLesFilms[i].real} filmAnnee={tousLesFilms[i].annee}  filmNumber={i}/>);
              //}





    return (
            // ma page HTML ICI :
            <div className="monBody">
                <Header  moviesLast={moviesLast}/>
                <div className="monConteneurdeFilms">{filmList}</div>
            </div>
          ); // fin du RETURN
      } // fin du RENDER
}  //fin du COMPOSANT PRINCIPAL QUI SERA EXPORTE


















//  COMPOSANT fiche_film
class Fiche_film extends Component {
  render() {
    return (

      <div className="boite_A_film">
          <Card>
            <CardImg top  src="http://www.megarex.fr/films/affiches/N0000148485.jpg" alt="Card image cap" />
            <CardBody>
              <CardTitle>{this.props.filmName}</CardTitle>
              <CardSubtitle>{this.props.filmReal}</CardSubtitle>
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







//  COMPOSANT mon header
class Header extends Component {
  render() {
    return (
            <div  id="monHeader">
              <h1>  LES FILMS DE LA SEMAINE  </h1>
              //PARTIE HTML DU BOUTON POP OVER
                <div>
                  <Button id="Popover1" onClick={this.toggle}>
                    Launch Popover
                  </Button>
                  <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
                    <PopoverHeader>Popover Title</PopoverHeader>
                    <PopoverBody>Sed posuere consectetur est at qsfkj sklqj sqklj s ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
                  </Popover>
                </div>
            </div>
          );
        }
      }
// fin du COMPOSANT fiche_film







export default Plus_grand_poupee_russe;
