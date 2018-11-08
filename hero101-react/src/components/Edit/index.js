import React, {Component} from 'react'
import { Button, 
        Form,
        FormGroup, 
        Label, 
        Input, 
        Container } from 'reactstrap';
import queryString from 'query-string'

import './index.css'


class Edit  extends Component{
    constructor(props){
        super(props);
        this.state = {id: 0,
                      name: "",
                      hero_type: "",
                      alter_ego: "",
                      species: "",
                      src: ""};
        
        
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

    saveHero(id){
        id = parseInt(id, 10)
        var name =  document.getElementById('Name').value;
        var hero_type = document.getElementById('Type').value;
        var alter_ego =  document.getElementById('Alter_Ego').value;
        var species = document.getElementById('Species').value;
        var src = document.getElementById('Imagen').value;

        var newHero = {
            name: name,
            hero_type: hero_type,
            alter_ego: alter_ego,
            species: species,
            src: src
            }

            var url = "http://localhost:3001/api/heroes/" + id;
            fetch(url, {
                method: 'PUT', // or 'PUT'
                body: JSON.stringify(newHero), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(response => console.log('Success:', response));
        
         window.location.href = "/"
    }


    render(){
        const id = this.state.id
        console.log(this.state.src)

        return(
            <div className="Edit">
                <h1>Edit {this.state.name}</h1>
                <Container>
                    <Form>
                        <FormGroup>
                            <Label  for="Nombre de Heroe" className="labelName">Name</Label>
                            <Input className="InputText" defaultValue={this.state.name} type="text"   name="Name" id="Name" placeholder="Nombre del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Tipo de Heroe" className="labelName">Type</Label>
                            <Input className="InputText" defaultValue={this.state.hero_type} type="text" name="Type" id="Type" placeholder="Tipo de Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Nombre Real del Heroe" className="labelName">Alter Ego</Label>
                            <Input className="InputText" defaultValue={this.state.alter_ego} type="text" name="Alter_Ego" id="Alter_Ego" placeholder="Nombre Real del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Especie" className="labelName">Species</Label>
                            <Input className="InputText" defaultValue={this.state.species} type="text" name="Species" id="Species" placeholder="Especie del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Imagen" className="labelName">Imagen</Label>
                            <Input className="InputText" defaultValue={this.state.src} type="text" name="Imagen" id="Imagen" placeholder="Imagen del Heroe" />
                        </FormGroup>
                    </Form>

                    <br>
                </br>
                <Button color="success" defaultValue={id} onClick={() => this.saveHero(id)}> Guardar</Button>
                <Button color="danger" href="/"> Cancelar</Button>
                </Container>
                
            </div>
        );
    }
};

export default Edit;
