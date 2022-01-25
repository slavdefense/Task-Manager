import React, { useState, useEffect,useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";


const emailReducer=(state,action)=>{

  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type==='INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value:'', isValid:false}

}

const passwordReducer(state,action)=>{

}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  //state is our last state snapchat
  //action is our action that was dispatched

// use emailState.value when setting the vales down below on functions

const [emailState, dispachEmail]=useReducer(emailReducer,{
  value: '',
  isvalid: false,
})

const [passwordState,dispachPassword]=useReducer(passwordReducer,{
  value:'',
  isValid:false
})


  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(
  //       emailState.isValid && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     clearTimeout(identifier);
  //   };
  // }, [emailState, enteredPassword]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispachEmail({type:'USER_INPUT', val:event.target.value})

    setFormIsValid(event.target.value.includes('@') && .trim().length>6)
  };

  const passwordChangeHandler = (event) => {
    dispachPassword({type:'USER_INPUT',val:event.target.value})
    setFormIsValid(event.target.value.trim().length>6 && emailState.value.trim()>6)
    
  };

  const validateEmailHandler = () => {
    dispachEmail({type:'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispachPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.isvalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.isvalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
