import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }



  fetchPets = () => {
    if (this.state.filters.type === 'all'){
    fetch('/api/pets')
      .then(resp => resp.json())
        .then(json => this.setState({pets: json}))
    }
    else if (this.state.filters.type === 'cat'){
      fetch('/api/pets?type=cat')
        .then(resp => resp.json())
          .then(json => this.setState({pets: json}))
    }
    else if (this.state.filters.type === 'dog'){
      fetch('/api/pets?type=dog')
        .then(resp => resp.json())
          .then(json => this.setState({pets: json}))
    }
    else if (this.state.filters.type === 'micropig'){
      fetch('/api/pets?type=micropig')
        .then(resp => resp.json())
          .then(json => this.setState({pets: json}))
    }

  }


  handleChange = e => {
    this.setState({
      filters: {type: e.target.value}
    }) 

  }

  onAdoptPet = id => {
  
    let pets = this.state.pets.map(pet => {
      return (pet.id === id) ? {...pet, isAdopted: true} : pet;});
    this.setState({ pets })
    // const pets = this.state.pets.map(p => {
    //   return p.id === id ? { ...p, isAdopted: true } : p;
    // });
    // this.setState({ pets });

   };
  

  render() {
    console.log('app.js state',this.state.pets)
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChange} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
