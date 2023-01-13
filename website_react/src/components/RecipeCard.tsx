import { Link } from "react-router-dom";
import { Recipe } from "../models/Recipe";
import styles from "./RecipeCard.module.css";
import { ReactComponent as NotesIcon } from "../icons/message.svg";

interface props{
    recipe: Recipe,
}
export default function RecipeCard( props: props ){
    const { id, linkPreview, notes } = props.recipe; 

    if(linkPreview != null){
        const { title, description, imageUrl } = linkPreview;
        return(
            <div className={styles.recipePreview}>    
                <Link to={`/recept/${id}`} state={props.recipe} className={styles.card} >
                    <img src={imageUrl} alt="" className={styles.image} />
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