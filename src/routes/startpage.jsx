import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { loggedInState } from "../atoms/loggedIn.js";
import Register from "../Components/Register.jsx";

const sessionStorageKey = "chappy-jwt";

const StartPage = () => {
  console.log("StartPage komponent renderad");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loggedInState); // Funderar på om det är bättre att använda recoil här.
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(sessionStorageKey)) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = async () => {
    let body = { username, password };
    let options = {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/login", options);

    if (response.status !== 200) {
      setMessage("Det gick inte att logga in!");
      console.log("Login failed with status: ", response.status);
      return;
    }

    const data = await response.json();
    let jwt = data.token;
    sessionStorage.setItem(sessionStorageKey, jwt);

    setIsLoggedIn(true);
    console.log(sessionStorageKey, jwt);
  };

  function handleOpenRegister() {
    console.log("handleOpen körs");
    if (!openRegister) {
      setOpenRegister(true);
    } else {
      setOpenRegister(false);
    }
  }

  return (
    <>
	
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>Logga in</h2>
          <label>namn</label>
          <input
            type="text"
            placeholder="Användarnamn"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <label>Lösenord</label>
          <input
            type="text"
            placeholder="Lösenord"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="button" onClick={handleLogin}>
            Logga in
          </button>

          <p>Ny användare?</p>

          <button
            type="button"
            onClick={() => {
              console.log("Registrera-knappen klickad");
              handleOpenRegister();
            }}>
            Registrera dig här!
          </button>
        </div>
      ) : null}
    </>
  );
};

export default StartPage;
