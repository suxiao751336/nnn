import React, { Component } from "react";



class App extends Component {
  constructor(propos) {
    super(propos);
    this.state = {
      measure: [],
      name: "",
      logo: "",
      lengths: 0,
      width: 0,
      color: "",
      mark: "",
      time: "",
      descr: "",
      area: "",

      ID:""
    };
    this.addStuff = this.addStuff.bind(this);
    this.getMeasurement = this.getMeasurement.bind(this);
    this.show = this.show.bind(this);
    this.ClearTextArea = this.ClearTextArea.bind(this);
    this.delect1=this.delect1.bind(this);
    this.delect2=this.delect2.bind(this);
    this.ClearTextdelect=this.ClearTextdelect.bind(this);
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getMeasurement();
    this.interval = setInterval(() => {
      this.getMeasurement();
    }, 600);
    
  }


  getMeasurement() {
    fetch("http://localhost:5000/found")
      .then(response => response.json())
      .then(response => this.setState({ measure: response.data }))
      .catch(err => console.error(err));
  }

  addStuff() {
    var a = document.getElementById("name_input").value;
    var b = document.getElementById("logo_input").value;
    var c = document.getElementById("lengths_input").value;
    var d = document.getElementById("width_input").value;
    var e = document.getElementById("color_input").value;
    var f = document.getElementById("mark_input").value;
    var g = document.getElementById("time_input").value;
    var h = document.getElementById("descr_input").value;
    var i = document.getElementById("area_input").value;
    
    this.setState({
      name: a,
      logo: b,
      lengths: c,
      width: d,
      color: e,
      mark: f,
      time: g,
      descr: h,
      area: i,
    });

  }

  show() {
    fetch(
      "http://localhost:5000/found/add?name=" +this.state.name +"&logo=" +
        this.state.logo +
        "&lengths=" +
        this.state.lengths +
        "&width=" +
        this.state.width +
        "&color=" +
        this.state.color +
        "&mark=" +
        this.state.mark +
        "&time=" +
        this.state.time +
        "&descr=" +
        this.state.descr +
        "&area=" +
        this.state.area +
        ""
    )
      .then(this.getMeasurement)
      .catch(err => console.error(err));


  }

  delect1(){
    var i = document.getElementById("item_delect").value;
    this.setState({
      ID:i
    });
  }

  delect2(){
    
      fetch(
        "http://localhost:5000/found/delect?ID=" +this.state.ID+""
      )
        .then(this.getMeasurement)
        .then(this.ClearTextdelect)
        .catch(err => console.error(err));
  }


  ClearTextArea() {
    document.getElementById("name_input").value = "";
    document.getElementById("logo_input").value = "";
    document.getElementById("lengths_input").value = "";
    document.getElementById("width_input").value = "";
    document.getElementById("color_input").value = "";
    document.getElementById("mark_input").value = "";
    document.getElementById("time_input").value = "";
    document.getElementById("descr_input").value = "";
    document.getElementById("area_input").value = "";
  }

  ClearTextdelect(){
    document.getElementById("item_delect").value = "";
  }

  handleClick(){//跳转页面到 b.html
    const url = '/src/components/b.html';
    window.open(url, '_blank'); 
  }


  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              name:<input type="text" id="name_input" /> 
              logo:<input type="text" id="logo_input" /> 
              length:<input type="text" id="lengths_input" />
            </div>
            <div>
              width:<input type="text" id="width_input" /> 
              color:<input type="text" id="color_input" /> 
              mark:<input type="text" id="mark_input" />
            </div>
            <div>  
              time:<input type="text" id="time_input" /> 
              descr:<input type="text" id="descr_input" /> 
              area:<input type="text" id="area_input" />
            </div>
            <button onClick={this.addStuff}>Save</button>
          </div>
          <div><button onClick={this.show}>show new table</button> </div>
          <button onClick={this.ClearTextArea}>clear all text</button>
          <div style={{float:'right', width:'550px' }}><span style={{fontSize:'16px',color:'red'}}><strong>Input ID for remove:</strong></span><input type="text" id="item_delect" onChange={this.delect1} />
          <button onClick={this.delect2} >Delect Item</button></div>
          <table border="1" cellSpacing="0">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>logo</th>
                <th>lengths</th>
                <th>width</th>
                <th>color</th>
                <th>mark</th>
                <th>time</th>
                <th>descr</th>
                <th>area</th>
              </tr>
            </thead>
            <tbody>
              {this.state.measure.map(lostandfound => (
                <tr key={lostandfound.ID}>
                  <td>{lostandfound.ID} </td>
                  <td>{lostandfound.name} </td>
                  <td>{lostandfound.logo} </td>
                  <td>{lostandfound.lengths} </td>
                  <td>{lostandfound.width} </td>
                  <td>{lostandfound.color} </td>
                  <td>{lostandfound.mark} </td>
                  <td>{lostandfound.time} </td>
                  <td>{lostandfound.descr} </td>
                  <td>{lostandfound.area} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={this.handleClick}>click me!</button>
        </div>
      </div>
    );
  }
}

export default App;
