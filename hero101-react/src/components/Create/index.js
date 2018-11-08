import React, {Component} from 'react'
import { Button,
        Form,
        FormGroup,
        Label,
        Input,
        Container } from 'reactstrap';

import './index.css'


class Create extends Component{
   

    saveHero(){
       
        var name =  document.getElementById('Name').value;
        var hero_type = document.getElementById('Type').value;
        var alter_ego =  document.getElementById('Alter_Ego').value;
        var species = document.getElementById('Species').value;
        var src = document.getElementById('Imagen').value;
        

        var newHero = {name: name,
                        hero_type: hero_type,
                        alter_ego: alter_ego,
                        species: species,
                        src: src
                        }
        

        var url = "http://localhost:3001/api/heroes"

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(newHero), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .then(response => console.log('Success:', response));
       window.location.href = "/"
    }


    render(){

        return(
            <div className="Edit">
                <h1>Create new hero</h1>
                <Container>
                    <Form>
                        <FormGroup>
                            <Label  for="Nombre de Heroe" className="labelName">Name</Label>
                            <Input className="InputText" type="text"   name="Name" id="Name" placeholder="Nombre del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Tipo de Heroe" className="labelName">Type</Label>
                            <Input className="InputText" type="text" name="Type" id="Type" placeholder="Tipo de Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Nombre Real del Heroe" className="labelName">Alter Ego</Label>
                            <Input className="InputText"  type="text" name="Alter_Ego" id="Alter_Ego" placeholder="Nombre Real del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Especie" className="labelName">Species</Label>
                            <Input className="InputText" type="text" name="Species" id="Species" placeholder="Especie del Heroe" />
                        </FormGroup>
                        <FormGroup>
                            <Label  for="Imagen" className="labelName">Imagen</Label>
                            <Input className="InputText" type="text" name="Imagen" id="Imagen" placeholder="Imagen del Heroe" />
                        </FormGroup>
                    </Form>

                    <br>
                </br>
                <Button color="success"  onClick={() => this.saveHero()}> Guardar</Button>
                <Button color="danger" href="/"> Cancelar</Button>
                </Container>

            </div>
        );
    }
};

export default Create;
