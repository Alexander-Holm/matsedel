import App from './App';
import { useLayoutEffect } from "react";
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, useLocation } from 'react-router-dom';

// Scrollar till top varje gång url ändras.
// React-router-dom behåller annars scrollpositionen mellan sidor
const RouteScrollPositionTop = () => {
    const { pathname } = useLocation();
    useLayoutEffect(() => {
    // behaviour: auto = instant
    try{ window.scroll( {top: 0, left: 0, behavior: "auto"} ); }
    catch{ window.scrollTo(0, 0); }    
    }, [pathname]);
    return null;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <RouteScrollPositionTop />
        <App />
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
