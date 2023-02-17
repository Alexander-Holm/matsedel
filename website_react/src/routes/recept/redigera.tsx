import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import LoadingScreen from "../../components/LoadingScreen";
import { usePasswordPrompt } from "../../components/PasswordPrompt";
import RecipeForm from "../../components/RecipeForm";
import { Api } from "../../models/api/Api";
import { Recipe, RecipeDto } from "../../models/Recipe";

export default function Redigera(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();
    const navigate = useNavigate();
    const passwordPrompt = usePasswordPrompt();

    useEffect(() => {
        Api.recipes.get(Number(id))
            .then(recipe => setRecipe(recipe));
    },[id])

    async function handleSubmit(updatedRecipe: RecipeDto){
        let apiKey = Api.key.get();
        apiKey ??= await passwordPrompt.show();
        if(apiKey === null) return;

        try{
            await Api.recipes.update(updatedRecipe, apiKey);
            navigate("/");
        }
        catch(error){
            const onRetry = () => handleSubmit(updatedRecipe)
            Api.handleErrors(error, onRetry);
        }
    }

    if(recipe === undefined) return(
        <>
        <Header />
        <LoadingScreen/>
        </>
    )

    return(
        <>
        <Header />
        <RecipeForm 
            title="Redigera recept"
            recipe={recipe} 
            weekId={recipe.weekId} editWeek={true}
            handleSubmit={handleSubmit} 
        />
        </>
    )
}