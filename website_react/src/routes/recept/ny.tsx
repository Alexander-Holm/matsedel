import { useNavigate, useSearchParams } from "react-router-dom"
import Header from "../../components/Header";
import RecipeForm from "../../components/RecipeForm";
import { Api } from "../../models/api/Api";
import { RecipeDto } from "../../models/Recipe";

export default function Ny(){
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // Ingen felhantering för felaktiga weekId
    const weekId = searchParams.get("vecka-id") as unknown as number;

    async function handleSubmit(recipe: RecipeDto){
        await Api.recipes.add(recipe);
        navigate("/")
    }

    return(
        <>
        <Header />
        <RecipeForm 
            title="Lägg till recept"
            weekId={weekId} 
            handleSubmit={handleSubmit} 
        />
        </>
    )
}