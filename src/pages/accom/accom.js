import React, { Component } from 'react';
import '../../css/accom.css';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

const style={
      marginBottom:"30px"
}
const styles = {
      marginLeft:"5px"
};
class Accom extends Component {
      constructor(props) {
      super(props);
      this.state = {
        open: false,
        user:{},
        required:false
      };
    }
  render() {
    return (
      <div className="Accom">
        <div className="intro">
          <ul>
            <li>
               Accommodation will be provided on first come first serve basis
            </li>
            <li>
              Accommodation charges will be Rs 200 for two days.
            </li>
            <li>
              Please contact +91-95602 97049 (Rajnish Prajapati) for further queries.
            </li>
          </ul>
        </div>
        <div className="accom-form">
                <TextField 
                    name="name"
                    hintText="Name" 
                    onChange={(eve)=>this.handleInput(eve)}
                    style={styles}
                />
                <TextField 
                    name="email" 
                    hintText="Email"
                    onChange={(eve)=>this.handleInput(eve)}
                    style={styles}
                />
                <TextField 
                    name="phno" 
                    hintText="Phoneno.(+91)"
                    onChange={(eve)=>this.handleInput(eve)}
                    style={styles}
                />
                <TextField 
                    name="collg" 
                    hintText="College"
                    onChange={(eve)=>this.handleInput(eve)}
                    style={styles}
                />
        </div>
        {this.state.required?
            <div className="warnings">**Required can't be empty or data is invalid</div>
          :''
        }
        <div className="accom-butt">
                <RaisedButton 
                    label="SubmitForm" 
                    primary={true} 
                    style={style} 
                    onClick={this.handleSubmit}
                />
        </div>
      </div>
    );
	}
  handleInput=(e)=>{
      let bar =this.state.user
          bar[e.target.name]=e.target.value
          this.setState({user:bar})
  }
  handleErrors=()=>{
      let bar=true
      let re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let ph=/^\d{10}$/
      let e=this.state.user
          if(e.name===''||e.email===''||e.phno===''||e.collg===''||!re.test(e.email)||!ph.test(e.phno)){
              this.setState({required:true})
              bar=false
          }
          return bar
  }
  handleSubmit=()=>{
    if(this.handleErrors()){
      axios({
        method:'post',
        url:`${window.location.origin}/acc.php`,
        data:this.state.user
      }).then(res=>{
          if(res.status===200){
                 window.location='http://terratechnica.in/instaa.php?req='+res.data
          }
          else{
            console.log(res)
              window.location='https://terratechnica.in/#/error?req=/accommodation'
          }
          
      }).catch(res=>{
          console.log(res)
              window.location='https://terratechnica.in/#/error?req=/accommodation'
      })
    }
  }
}

export default Accom;
