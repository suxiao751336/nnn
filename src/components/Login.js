import React,{Component} from 'react';
import {Bar,Line,Pie} from 'react-chartjs-2';
import {Redirect} from "react-router-dom";
import {Redirect1} from "react-router-dom";

class Chart extends Component{
	

	constructor(props){ 
	    
	
		 super(props);
		
		
		
		 this.state={
			 measure: [],
             redirect: false,
             redirect1: false,
             user:'',
             password:''
		 }
         this.userChange = this.userChange.bind(this);
         this.passwordChange = this.passwordChange.bind(this);
		 this.submit = this.submit.bind(this);
	}	
    
    
	
	
    componentDidMount() {
       
        this.submit();
       
        
    }


    userChange(e){
        this.setState({ user : e.target.value })
    }

    passwordChange(e){
        this.setState({ password : e.target.value })
    }
	
    submit(){


      const myuser=this.state.user;
     // alert(myuser);
      const mypassword=this.state.password;
      //alert(mypassword);





         const userName="huang";
         const passWrold="123";

        
     fetch("http://localhost:5000/measurement/login?username="+myuser+"&passWord="+mypassword+"")
            .then(response =>response.json())
            .then(response =>this.setState({ measure: response.data }))
            .catch(err => console.error(err))

             var pp=JSON.stringify(this.state.measure);
             //alert(pp);
			 const mynum=pp[10];
           //alert(mynum);
            if(mynum=="0"){
		       this.setState({redirect:true});
              }
              if(mynum=="1"){
                this.setState({redirect1:true});
               }
 
	 }
	 


	
	 
	

	 
	render(){
		
        if(this.state.redirect){
           
            return (<Redirect to={'/Detail'}/>)
         }
 
         if(this.state.redirect1){
            
             return (<Redirect to={'/Found'}/>)
          }
         
 
         return(
         <div style={{margin:'10px'}}>
           
                 <h2>please login</h2>
                
     <input id='user' 
                     placeholder='userName' 
                     
                     onChange={this.userChange}/>  
     
     <br/>
     
     <input  id='password' 
                     type='password' 
                     placeholder='password' 
                    
                     onChange={this.passwordChange}/>  
                 <br/>
                 
                 
     
     <button width="200" onClick = { this.submit}>login</button> 
            
         </div>
     )
		
		
	
	}
}
export default Chart;