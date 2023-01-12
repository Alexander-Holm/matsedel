import { Route, Routes } from "react-router-dom"
import Index from './routes';
import Ny from './routes/recept/ny';
import Id from './routes/recept/[id]';

function App() {
  return (
    <Routes>
        <Route path='/' element={<Index />} />
        <Route path="recept" >
            <Route path="ny" element={<Ny />} />
            <Route path=":id" element={<Id />} />
        </Route>
    </Routes>
  );
}

export default App;
