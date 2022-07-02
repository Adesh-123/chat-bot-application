import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import logo from "../assets/logo.png"
import {useHistory} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"


export default function Register() {
  const history=useHistory();
  useEffect(() => {
    if(localStorage.getItem("user")){
       history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit=async(event)=>{
    event.preventDefault();
    if(handlevalidation()){
      try{
        const { email, username, password } = values;
        console.log({email,username,password});
        const res= await axios.post("https://messging-application.herokuapp.com/api/auth/register", {
          username,
          email,
          password,
        });
        if(res.data.status){
          toast.success("Successfully Registered",toastOptions);
          localStorage.setItem("user",JSON.stringify(res.data.user));
          history.push('/setAvatar');
          window.location.reload(false);
        }else{
          toast.error(res.msg,toastOptions);
        }
      }catch(err){
        toast.error("Server error please try later",toastOptions);
      }
    }
  }

  const handlevalidation=()=>{
    const {username,email,password,confirmPassword}= values;
    if(password!==confirmPassword){
      toast.error("Password is not matched",toastOptions);
      return false;
    }else if(username.length<3){
      toast.error("Username should have minimum length 3",toastOptions);
      return false;
    }else if(email===""){
      toast.error("Email is required for Registeration",toastOptions);
      return false;
    }else if(password===""){
      toast.error("password is required",toastOptions);
      return false;
    }else {
      return true;
    }
  }
  const handleclick=()=>{
    history.push("/login");
    window.location.reload(false);
  }
  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chat-Bot</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <span onClick={handleclick}>Login.</span>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


// style part
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items:center;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    span{
      color: #4e0eff;
      cursor: pointer;
      text-decoration: none;
      font-weight: bold;
    }
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
