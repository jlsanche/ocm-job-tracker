import React from "react";
import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import {useNavigate} from 'react-router-dom'

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState);

  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  //global state and useNavigate
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} =values
    if(!email || !password || (!isMember && !name))
    {
      displayAlert()
      return
    }
    console.log(values)

    const currentUser = { name, email, password}
    if(isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login successful'
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'Account created'
      })
    }
    
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')  //navigate to dashboard
      }, 2000)
    }
  }, [user, navigate]) //dependency array 

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />

        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}
        {/* name input */}

        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
