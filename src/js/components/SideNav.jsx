import JwtDecode from "jwt-decode";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const SideNav = (props) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  //supression du token du localStorage
  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    props.history.push("/login");
  };

  const token = window.localStorage.getItem("authToken");
  let roles = "";
  if (token) {
    const jwtData = JwtDecode(token)
    console.log(jwtData)
    roles = jwtData.roles[0]
  }


  return (
    <>
      {isAuthenticated && (
        <nav className="sideNav">
          <ul className="sideNav-menu">
            <li className="nav-item">
              <button onClick={handleLogout} className="logout">
                Deconnection
              </button>
            </li>

            {roles === "ROLE_ADMIN" && (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboardAdmin" className="home">
                    home
              </NavLink>
                </li>
                <li>
                  <NavLink to="/coachs" >
                    Coachs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/players" >
                    Joueurs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/teams" >
                    Equipes
                  </NavLink>
                </li>
              </>
            )}
            {roles === "ROLE_COACH" && (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboardCoach" className="home">
                    home
              </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardCoach" >
                    Tous les Joueurs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardCoach" >
                    Mes Joueurs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardCoach" >
                    Formation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardCoach" >
                    Entrainement
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardCoach" >
                    Match
                  </NavLink>
                </li>
              </>
            )}
            {roles === "ROLE_PLAYER" && (
              <>
                <li className="nav-item">
                  <NavLink to="/dashboardPlayer" className="home">
                    home
              </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardPlayer" >
                    Entrainement
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboardPlayer" >
                    Match
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink to="/mail" >
                Messagerie
                  </NavLink>
            </li>
          </ul>
        </nav>
      )}

    </>
  );
};

export default SideNav;