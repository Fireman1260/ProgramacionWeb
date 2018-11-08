import React, {Component} from 'react';
import './index.css'

import {Button} from 'reactstrap';



class Home  extends Component{
    constructor(props){
        super(props);
        this.state = {
            heroList: [], 
            id: 0,
            name: "",
            hero_type: "",
            alter_ego: "",
            species: "",
            linkEdit: ""
        };

    }

    componentDidMount() {
        var url = "http://localhost:3001/api/heroes"
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                heroList: json
            })
        }) 
      }


    render(){
        const Heroes = this.state.heroList;

        const heroes = Heroes.map((hero) => {
            var edit = "/Edit?id=" + hero.id;
            var eliminar = "/Delete?id=" + hero.id;
            
            return(
                <div className="col-md-6" key={hero.id}>
                    <div className="card mt-5">
                        <div className="card-header">
                            <h3>{hero.name}</h3>
                            <h4>
                                <span className="badge badge-pill badge-danger ml-2">
                                    {hero.hero_type}
                                </span>
                            </h4>
                        </div>
                        <div className = "card-body">
                            <img src={hero.src} alt={hero.name}/>
                        </div>
                        <div className = "card-footer">
                            <h2>{hero.alter_ego}</h2>
                            
                            <span className="badge badge-pill badge-primary ml-2">
                                {hero.species}
                            </span>
                            <br></br>
                            <br></br>
                            <Button color="primary" href={edit}>Editar</Button ><Button color="danger" href={eliminar}>Eliminar</Button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            
            <div className="Home">
                <br></br>
                <Button color="success" href="/Create">Crear Nuevo Heroe</Button>
                <div className="row mt-4">
                    {heroes}
                </div>
            </div>
            
          );
      
    }
};

export default Home;