<script lang="ts">
    import type { Recipe } from "src/models/Recipe";

    export let recipe: Recipe;
</script>

<a href={`/recept/${recipe.id}`} class="recipe-preview" class:loading={recipe.linkPreview == null}>
    <img src={recipe.linkPreview?.imageUrl} alt="" />
    <div class="text-container">
        <h4 class="title limit-text-lines">{recipe.linkPreview?.title}</h4>
        <p class="description limit-text-lines">{recipe.linkPreview?.description}</p>
    </div>
</a>

<style>
    @font-face{
        font-family: "Merienda";
        src: url("fonts/Merienda-VariableFont_wght.ttf");
    }
    
    .recipe-preview{
        --image-size: 6rem;        
        height: 8rem;
        width: 16rem;
        background-color: #ffeee9;

        display: flex;
        gap: 10px;
        text-decoration: none;
        color: black;        
    }
        .recipe-preview.loading{
            background-color: coral;
        }

    img{
        height: 100%;
        aspect-ratio: 1;
        object-fit: cover;
    }
    
    .text-container{
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .title{
        font-family: "Merienda";
        font-variation-settings: "wght" 700;
        font-size: 0.9rem;
        --text-lines: 2;
    }
    .description{
        font-family: "Merienda";
        font-variation-settings: "wght" 400;
        font-size: 0.75rem;
        color: #373737;
        --text-lines: 4;         
    }
    .title, .description{
        /* Bryter av text som är för lång */
        display: -webkit-box !important;
        -webkit-line-clamp: var(--text-lines);
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

</style>