import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%); 
    opacity: 0;
  }
`;

const ToastWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 0px;
  padding: 10px 20px;
  background: linear-gradient(to left, #5cb85c, #f6f4f3);
  color: #2b532b;
  border-radius: 10px 0 0 10px;
  animation: ${({ visible }) => (visible === "enter" ? slideIn : slideOut)} 0.3s
    ease forwards;
  transition: opacity 0.3s ease;
  z-index: 1000;
`;

const ToastMessage = ({ message, visible }) => {
  return visible ? (
    <ToastWrapper visible={visible}>{message}</ToastWrapper>
  ) : null;
};

export default ToastMessage;