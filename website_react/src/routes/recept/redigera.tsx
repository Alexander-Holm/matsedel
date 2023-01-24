import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import LoadingScreen from "../../components/LoadingScreen";
import RecipeForm from "../../components/RecipeForm";
import { Api } from "../../models/api/Api";
import { Recipe, RecipeDto } from "../../models/Recipe";

export default function Redigera(){
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe>();
    const navigate = useNavigate();

    useEffect(() => {
        Api.recipes.get(Number(id))
            .then(recipe => setRecipe(recipe));
    },[])

    async function handleSubmit(updatedRecipe: RecipeDto){
        await Api.recipes.update(updatedRecipe);
        navigate("/");
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