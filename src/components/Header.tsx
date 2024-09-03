import React from "react";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Home";
      case "/bitcoin":
        return "Bitcoin Guide";
      case "/multisig":
        return "Multisig Guide";
      case "/psbt":
        return "PSBT Guide";
      case "/fees":
        return "Fees Guide";
      default:
        return "Caravan Interactive Guide";
    }
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{getPageTitle()}</h1>
      </div>
    </header>
  );
};

export default Header;
