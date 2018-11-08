import React, {Component} from 'react';
import { Button } from 'reactstrap';
import queryString from 'query-string'

class Delete  extends Component{

    constructor(props){
        super(props);
        this.state = {id: 0,
                      name: "",
                      hero_type: "",
                      alter_ego: "",
                      species: ""};
        
        
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        var url = "http://localhost:3001/api/heroes/" + values.id
        
        fetch(url)
        .then(res => res.json())
        .catch(function(){
            window.location.href = "/404-Page";
        })
        .then(json => {

            var editHero = json;
            this.setState({
                id: editHero['id'],
                name: editHero['name'], 
                hero_type: editHero['hero_type'],
                alter_ego: editHero['alter_ego'],
                species: editHero['species'],
                src: editHero['src']
            })
        }) 
    }

    killHero(id){
        var url = "http://localhost:3001/api/heroes/" + id
        
        fetch(url, {method: 'delete'})
        .then(res => res.json())

         window.location.href = "/"
    }

    render(){
        const id = this.state.id

        return(
            <div className="Delete">
                <h1>Delete {this.state.name}</h1>
                <br></br>
                <br></br>
                <div className="offset-md-5">
                    <div className="col-md-4">
                        <dl>
                            <dt className="labelName">
                                <h2>Name</h2>
                            </dt>
                            <br></br>
                            <br></br>
                            <dd  className="labelName">
                                <h5>{this.state.name}</h5>
                            </dd>

                            <br></br>
                            <br></br>

                            <dt className="labelName">
                                <h2>Type</h2>
                            </dt>
                            <br></br>
                            <br></br>
                            <dd  className="labelName">
                                <h5>{this.state.hero_type}</h5>
                            </dd>
                        </dl>

                        <br></br>
                        <br></br>

                        <dl>
                            <dt className="labelName">
                                <h2>Alter Ego</h2>
                            </dt>
                            <br></br>
                            <br></br>
                            <dd  className="labelName">
                                <h5>{this.state.alter_ego}</h5>
                            </dd>

                            <br></br>
                            <br></br>

                            <dt className="labelName">
                                <h2>Species</h2>
                            </dt>
                            <br></br>
                            <br></br>
                            <dd  className="labelName">
                                <h5>{this.state.species}</h5>
                            </dd>
                        </dl>
                    </div>
                    
                </div>
                <br></br>
                <br></br>
                <Button color="danger" defaultValue={id} onClick={() => this.killHero(id)}>Eliminar</Button>
                <Button color="primary" href="/" >Retornar</Button>
            </div>
        );
    }
}


export default Delete;