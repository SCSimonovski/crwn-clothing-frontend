import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div``;

export const HeaderWrapper = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: auto;
  height: 6rem;
  padding: 0 1rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: black;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  justify-content: flex-end;

  @media (max-width: 43em) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  margin: 0 0 0 2rem;
  color: white;
  cursor: pointer;
`;

export const CartIconLink = styled.div`
  text-decoration: none;
  margin: 0 0 0 2rem;
  color: white;
  cursor: pointer;
`;

export const MenuToggle = styled.div`
  display: none;
  z-index: 9999;
  width: 25px;
  height: 25px;
  transform: rotate(0deg);
  transition: all 0.25s ease-in;
  cursor: pointer;
  margin-left: auto;
  span {
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: white;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: ${(props) =>
      props.open ? "all 0.25s ease-in" : "all 0.25s ease-out"};
  }
  span:nth-child(1) {
    top: ${(props) => (props.open ? "calc(50% - 2px)" : "10%")};
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: ${(props) => (props.open ? 0 : "calc(50% - 2px)")};
    left: ${(props) => (props.open ? "calc(50% - 2px)" : null)};
    width: ${(props) => (props.open ? "4px" : null)};
    height: ${(props) => (props.open ? "100%" : null)};
    transform-origin: left center;
  }
  span:nth-child(3) {
    top: calc(90% - 4px);
    transform-origin: left center;
    width: ${(props) => (props.open ? 0 : null)};
    opacity: ${(props) => (props.open ? 0 : 1)};
  }

  @media (max-width: 43em) {
    display: block;
  }
`;

export const Title = styled.div``;

export const RotateContainer = styled.div`
  height: 100%;
  width: 100%;
  transition: ${(props) =>
    props.open ? "all 0.25s ease-in-out" : "all 0.25s ease-in-out"};
  transform: ${(props) => (props.open ? "rotate(-45deg)" : "none")};
`;

export const MenuWrapper = styled.div`
  position: fixed;
  overflow: hidden;
  background: white;
  top: ${(props) => (props.open ? "0" : "-100%")};
  left: 0;
  z-index: 2;
  margin-top: 6rem;
  width: 100%;
  transition: ${(props) =>
    props.open ? "all 0.25s ease-out" : "all 0.6s ease-out"};
  box-shadow: 0px 4px 20px -5px #e8e8e8;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 5px;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled(Link)`
  text-align: center;
  padding: 8px 0;
  text-decoration: none;
  color: #666;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;

  &:hover {
    background: #ded;
  }
`;

export const MenuItemText = styled.span`
  flex: 1;
  text-align: left;
`;

export const Icon = styled.i`
  text-align: right;
  flex: 1;
  color: #999;
  font-size: 20px;
  margin: 0 5px;
`;
