import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button';
import AuthRequests from '../../fetch/AuthRequests';
import { useState, useEffect } from 'react';

function Navegacao() {
    // Estado para controlar a autenticação
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const username = localStorage.getItem('username');  // Pega o nome do usuário armazenado no localStorage

    /**
    * Verifica a autenticação do usuário
    */
    useEffect(() => {
        const token = localStorage.getItem('token');  // Recupera o token do localstorage
        if (token && AuthRequests.checkTokenExpiry()) {  // Verifica a validade do token
            setIsAuthenticated(true);  // Se o token for válido, autentica o usuário
        } else {
            setIsAuthenticated(false);  // Se o token for inválido, desautentica
        }

    }, []);

    const estiloNavbar = {
        backgroundColor: 'var(--primaryColor)',
    };

    const estiloNavOptions = {
        color: 'var(--fontColor)',
    };

    // Função de logout
    const logout = () => {
        AuthRequests.removeToken();  // Remove o token ao sair
    };

    return (
        <>
            <Navbar style={estiloNavbar}>
                <Container>
                    {/* Opção Home para todos os usuários */}
                    <Navbar.Brand href="/" style={estiloNavOptions}>Home</Navbar.Brand>

                    {isAuthenticated ? ( // Se o usuário estiver autenticado
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href="/pessoas" style={estiloNavOptions}>Pessoas</Nav.Link>
                            </Nav>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {/* Texto "Seja bem vindo" separado do botão */}
                                <Nav style={estiloNavOptions}>Seja bem vindo, {username}</Nav> 
                                <Button variant='light' onClick={logout} style={{ marginLeft: '10px' }}>Sair</Button>
                            </div>
                        </>
                    ) : (
                        // Para usuário não autenticado
                        <Button href='/login' variant='light'>Login</Button>
                    )}
                </Container>
            </Navbar>
        </>
    );
}

export default Navegacao;
