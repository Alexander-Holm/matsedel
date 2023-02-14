import { Link } from "react-router-dom";
import { Recipe } from "../models/Recipe";
import styles from "./RecipeCard.module.css";
import { ReactComponent as NotesIcon } from "../icons/message.svg";
import { SyntheticEvent } from "react";

const defaultImage = "/images/default-recipe-image.svg"
interface props{
    recipe: Recipe,
}
export default function RecipeCard( props: props ){
    const { id, linkPreview, notes } = props.recipe; 

    function onImageError(event: SyntheticEvent<HTMLImageElement>){
        const image = event.currentTarget;
        // Förhindra oändlig loop om det skulle vara något fel på default-bilden
        image.onerror = null; 
        image.src = defaultImage;
        // Uppdaterar linkPreview för att få en bild på detaljsidan.
        // Man bör egentligen inte modifiera props men det funkar här.
        if(props.recipe.linkPreview)
            props.recipe.linkPreview.imageUrl = defaultImage;
    }

    if(linkPreview != null){
        const { title, description, imageUrl } = linkPreview;
        return(
            <div className={styles.recipePreview}>    
                <Link to={`/recept/${id}`} state={props.recipe} className={styles.card} >
                    <img src={imageUrl} alt="" className={styles.image} onError={onImageError} />
                    <div className={styles.textContainer}>
                        <h4 className={styles.title}>{title}</h4>
                        <p className={styles.description}>{description}</p>
                    </div>
                </Link>
                {notes && (
                    <div className={styles.notes}>
                        <NotesIcon />
                        <span>{notes}</span>
                    </div>
                )}
            </div>
        )
    } 
    else return(
        // Loading skeleton
        <div className={`${styles.recipePreview} ${styles.loading}`}>    
            <div className={styles.card} >
                <span className={styles.image} />
                <div className={styles.textContainer}>
                    <span className={styles.title} />
                    <div className={styles.description}>
                        <span />
                        <span />
                        <span />
                    </div>
                </div>
            </div>
        </div>
    )
}