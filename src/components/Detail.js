import React, { Component } from 'react';
import {Redirect} from "react-router-dom";

class App extends Component{
    constructor(propos) {
        super(propos);
        this.state = {
            measure: [],
			measureDetail: [],
			ID:"",
            myId:"",
            search:"",
            redirect: false
        } 

        this.sortBy = this.sortBy.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
      
        this.getMeasurement();
        

        this.interval = setInterval(() => {
          
            this.getMeasurement();
            
          }, 600)
    }

  handleChange(){
			var text = "";
			//实时筛选，不用点击按钮
			setInterval(function(){
				text = ('.area').val();//获取文本框输入
				if(text != ""){
					("table tbody tr").hide().filter(":contains('"+text+"')").show();
				}else{
					('table tr').show();//当删除文本框的内容时，又重新显示表格所有内容
				}
			},100);
		};



 

    

    sortBy(key){
         console.log(key)
         if(key=="unit_id"){
             alert("you click ID");
         }else if(key=="temperature"){
            alert("you click temperature");
         }else if(key=="unix_timestamp"){
            alert("you click timestamp");
         }
  
    
      }
	  
   getMeasurement(){
        
     fetch('http://localhost:5000/measurement')
            .then(response =>response.json())
            .then(response =>this.setState({ measure: response.data }))
            .catch(err => console.error(err))
    };
   

   

updateSearch(event){
	this.setState({search: event.target.value.substr(0,20)});
}






handleClick (huangId) { 

 fetch(
        "http://localhost:5000/measurement/detail?ID="+huangId+""
		
      )
         .then(response =>response.json())
            .then(response =>this.setState({ measureDetail: response.data }))
            .catch(err => console.error(err))
			
			
			
			
}

submit(){
         
        this.setState({redirect:true});

      }

      mobilsubmit(){
         
        window.location.href = 'https://morning-basin-93922.herokuapp.com/m'

      }




  
    render() {
        if(this.state.redirect){
           
            return (<Redirect to={'/Chart'}/>)
         }
		const {huangId} = this.state;
		
		let filterContacts =this.state.measure.filter(
		    (measurement) => {
				return measurement.area.indexOf(this.state.search) !== -1;
			}
		);
		
		let filterContacts1 =this.state.measureDetail.filter(
		    (measurementdetail) => {
				return measurementdetail.area.indexOf(this.state.search) !== -1;
			}
		);
		
		
        return (
            <div >
                <div >
				area<input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>  
				<br/><br/>
				
                    <table border="1" cellSpacing="0">
                        <thead>
						
						
						
                            <tr>
                                <th onClick={() => this.sortBy('unit_id')}
                                    >
                                       id
                                   
                                </th>
                                <th
                                    onClick={() => this.sortBy('temperature')}
                                    >
                                       area
                                </th>
                                <th
                                
                                    onClick={() => this.sortBy('unix_timestamp')}
                                    >
                                       logo
                              
                                </th>
								 <th
                                
                                    onClick={() => this.sortBy('unix_timestamp')}
                                    >
                                       detailButton
                              
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterContacts.map(measurement=>
                                <tr  >
                                    <td ><input type="text" id="transID" value={measurement.id} /></td>
                                    <td>{measurement.area} </td>
                                    <td>{measurement.logo} </td>
									<td><button value={measurement.id}   onClick = {()=> this.handleClick(measurement.id)}>clickDetail</button> </td>
									
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
					
					
					
					
					detail about lose
			
				
                    <table border="1" cellSpacing="0">
                        <thead>

                            <tr>
                                <th >id</th>
                                <th>area</th>
                                <th> logo</th>
								
                            </tr>
                        </thead>
                        <tbody>
                            {filterContacts1.map(measureDetail=>
                                <tr >
                                    <td>{measureDetail.id} </td>
                                    <td>{measureDetail.area} </td>
                                    <td>{measureDetail.logo} </td>
								
                                </tr>
                            )}
                        </tbody>
                    </table>
					
                    <button width="200" onClick = { this.submit}>Chart</button> 

                    <button width="200" onClick = { this.mobilsubmit}>mobil</button> 
                </div>
				
				</div>
				
				
				
				
				
          
        );
    }
}

export default App;