import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import { FaUserAlt } from "react-icons/fa";
import { MdImportContacts } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { HiShoppingCart } from "react-icons/hi";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOutStart } from "../../redux/user/user.actions";

import {
  Wrapper,
  HeaderWrapper,
  Container,
  Links,
  NavLink,
  CartIconLink,
  MenuToggle,
  RotateContainer,
  MenuWrapper,
  Menu,
  MenuItem,
  MenuItemText,
  Icon,
} from "./header.styles";

const Header = ({ hidden, user, signOutStart }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOffClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleOffClick);
    return () => {
      window.removeEventListener("click", handleOffClick);
    };
  }, []);

  const onSignOutClick = () => {
    signOutStart();
  };

  return (
    <Wrapper>
      <HeaderWrapper id="header">
        <Container>
          <div className="logo-container">
            <Link className="logo-link" to="/">
              <Logo className="logo" />
            </Link>
          </div>
          <Links>
            <NavLink to="/shop">SHOP</NavLink>
            <NavLink to="/">CONTACT</NavLink>
            {user ? (
              <NavLink onClick={onSignOutClick} to="/">
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/signIn">SIGN IN</NavLink>
            )}
            <CartIconLink>
              <CartIcon />
            </CartIconLink>
            {hidden ? null : <CartDropdown />}
          </Links>
          <MenuToggle
            ref={wrapperRef}
            name="menu-toggle"
            onClick={() => {
              setOpen(!open);
            }}
            open={open}
          >
            <RotateContainer open={open}>
              <span />
              <span />
              <span />
            </RotateContainer>
          </MenuToggle>
        </Container>
      </HeaderWrapper>
      <MenuWrapper open={open}>
        <Menu open={open}>
          <MenuItem to="/shop">
            <Icon>
              <AiFillShopping />
            </Icon>
            <MenuItemText>Shop</MenuItemText>
          </MenuItem>
          <MenuItem to="/">
            <Icon>
              <MdImportContacts />
            </Icon>
            <MenuItemText>Contact</MenuItemText>
          </MenuItem>
          {!user ? (
            <MenuItem to="/signIn">
              <Icon>
                <FaUserAlt />
              </Icon>
              <MenuItemText>Sign In</MenuItemText>
            </MenuItem>
          ) : (
            <MenuItem to="/" onClick={onSignOutClick}>
              <Icon>
                <FaUserAlt />
              </Icon>
              <MenuItemText>Sign Out</MenuItemText>
            </MenuItem>
          )}
          <MenuItem to="/checkout">
            <Icon>
              <HiShoppingCart />
            </Icon>
            <MenuItemText>Checkout</MenuItemText>
          </MenuItem>
        </Menu>
      </MenuWrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  hidden: selectHidden(state),
  user: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
