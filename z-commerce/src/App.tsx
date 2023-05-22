import { Link, Outlet } from "react-router-dom";
import { Navbar, Container, Nav, Button, Badge } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./Store";

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };
  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amaZiv</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>

            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>

      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>

      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
