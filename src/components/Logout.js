import React from "react";
import { useHistory} from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
export default function Logout() {
  const history = useHistory();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem("user")
    )._id;
    const data = await axios.get(`https://chatbotapplicationbackend.onrender.com/api/auth/logout/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      history.push("/login");
      window.location.reload(false);
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;