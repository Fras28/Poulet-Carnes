import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { asyncComandas, asyncLogIn } from '../redux/slice';
import './LoginComponent.css'; // Importa tu archivo de estilos CSS

const LoginComponent = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { comandas } = useSelector((state) => state.alldata);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = () => {
    dispatch(asyncLogIn(credentials));
    setModalIsOpen(false);
    onLoginSuccess();
  };

  return (
    <div>
      <Modal
        isOpen={comandas.length === 0}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Login Modal"
      >
        <div className="login-container">
          <h2 className="login-heading">Log In</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="form-input"
              />
            </div>
            <button type="button" onClick={handleLogin} className="login-submit">
              Log in
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginComponent;
