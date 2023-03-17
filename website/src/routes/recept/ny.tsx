import { useNavigate, useSearchParams } from "react-router-dom"
import Header from "../../components/Header";
import { usePasswordPrompt } from "../../components/PasswordPrompt";
import RecipeForm from "../../components/RecipeForm";
import { Api } from "../../models/api/Api";
import { RecipeDto } from "../../models/Recipe";

export default function Ny(){
    const passwordPrompt = usePasswordPrompt();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // Ingen felhantering för felaktiga weekId
    const weekId = searchParams.get("vecka-id") as unknown as number;

    async function handleSubmit(recipe: RecipeDto){
        let apiKey = Api.key.get();
        apiKey ??= await passwordPrompt.show();
        if(apiKey === null) return;

        try{
            await Api.recipes.add(recipe, apiKey);
            navigate("/")
        }
        catch(error){
            const onRetry = () => handleSubmit(recipe);
            Api.handleErrors(error, onRetry);
        }
    }

    return(
        <>
        <Header />
        <RecipeForm 
            title="Lägg till recept"
            weekId={weekId} editWeek={false}
            handleSubmit={handleSubmit} 
        />
        </>
    )
}