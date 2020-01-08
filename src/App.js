import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      msg: ''
    }
  };

  evento(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
      this.setState({
        lista: this.state.lista.concat({label: e.target.value, done: false})
      });
      e.target.value = "";

      fetch('https://assets.breatheco.de/apis/fake/todos/user/nandinha', {
        method: 'PUT',
        body: JSON.stringify(this.state.lista),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          this.setState({
            msg: data
          })
        })
  
        .catch(error => {
          console.log(error);
        });

    }
  }

  trash(y) {
    const { lista } = this.state;
    lista.splice(y, 1);
    this.setState({
      lista: lista
    })

    fetch('https://assets.breatheco.de/apis/fake/todos/user/nandinha', {
        method: 'PUT',
        body: JSON.stringify(this.state.lista),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then(resp => resp.json())
        .then(data => {
          console.log(data);
          this.setState({
            msg: data
          })
        })
  
        .catch(error => {
          console.log(error);
        });

  }

  componentDidMount() {
    console.log();
    this.getlist('https://assets.breatheco.de/apis/fake/todos/user/nandinha');

  }

  getlist(url) {

    fetch(url, {
      method: 'GET',
      //body: JSON.stringify(datos),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          lista: data
        })
      })

      .catch(error => {
        console.log(error);
      });


    /*
    fetch (url, {})
    then (  => { respuesta del servidor
      console.log (resp)
      return.resp.json ()
    })
  
    then (  => { informacion del pedido
      console.log (data);
    })
  
    then (  => { errores
      console.log (error);
    })
    */
  }

  render() {
    return (
      <div className="container paper">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center" >TO DO LIST</h1>
            <input type="text" className="form-control" placeholder="Ingrese Tarea" onKeyDown={e => this.evento(e)} />
            <br />
            <ul className="list-group">
              {
                this.state.lista.length > 0 &&
                this.state.lista.map((lista, i) => {
                  return (
                    <li key={i} className="list-group-item- d-flex justify-content-between border-bottom border-success mb-2">
                      {lista.label}
                      <i className="fas fa-trash" onClick={y => this.trash(i)}></i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default App;
