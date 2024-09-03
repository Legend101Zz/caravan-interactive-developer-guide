import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const SidebarContainer = styled(motion.nav)`
  width: 250px;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 2rem;
  height: 100vh;
`;

const SidebarLink = styled(motion(Link))<{ active: boolean }>`
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};

  &:hover {
    text-decoration: underline;
  }
`;

const sidebarVariants = {
  initial: { x: -250 },
  in: { x: 0 },
  out: { x: -250 },
};

const linkVariants = {
  hover: { scale: 1.1 },
};

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <SidebarContainer
      initial="initial"
      animate="in"
      exit="out"
      variants={sidebarVariants}
      transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Caravan Guide
      </motion.h2>
      <SidebarLink
        to="/"
        active={location.pathname === "/"}
        variants={linkVariants}
        whileHover="hover"
      >
        Home
      </SidebarLink>
      <SidebarLink
        to="/bitcoin"
        active={location.pathname === "/bitcoin"}
        variants={linkVariants}
        whileHover="hover"
      >
        Bitcoin Guide
      </SidebarLink>
      <SidebarLink
        to="/psbt"
        active={location.pathname === "/psbt"}
        variants={linkVariants}
        whileHover="hover"
      >
        PSBT Guide
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
