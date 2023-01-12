import { redirect, useLocation, useNavigate, useParams } from "react-router-dom"
import Header from "../../components/Header";
import { ReactComponent as ExternalLink} from "../../icons/external-link.svg";
import { ReactComponent as NoteIcon} from "../../icons/message.svg";
import { ReactComponent as Edit} from "../../icons/edit.svg";
import { ReactComponent as Delete} from "../../icons/delete.svg";
import { Api } from "../../models/api/Api";
import "./recept.css"

export default function Id(){    
    const navigate = useNavigate();
    const recipe = useLocation().state;
    const domain = new URL(recipe.url).hostname; 
    // TODO: hämta recept om det inte skickas som state med <Link>
    //const { id } = useParams();

    async function clickDelete(){
        if(recipe?.id == null) return;
        const confirmDelete = window.confirm("Vill du ta bort det här receptet?");
        if(confirmDelete){
            await Api.recipes.delete(recipe.id);
            navigate("/");
        }
    }

    return(
        <>
        <Header>
            <a href={recipe.url} className="open-recipe icon-button button-primary">
                <span className="text">Öppna recept</span>
                <span className="icon"><ExternalLink /></span>
                {/* position: absolute */}
                <span className="domain">{domain}</span>
            </a>
        </Header>
        <article id="recipe">    
            <h2>{recipe.linkPreview?.title}</h2>
            {recipe.notes && (
                <div className="notes">
                    <span className="icon"><NoteIcon /></span>            
                    <p>{recipe.notes}</p>
                </div>
            )}
            <img src={recipe.linkPreview?.imageUrl} alt="" />
            <p className="description">{recipe.linkPreview?.description}</p>
            <div className="buttons">
                {/* REDIGERA SIDAN EJ KLAR */}
                <a href="#" className="icon-button button-secondary">
                    <span className="text">Redigera</span>
                    <span className="icon"><Edit /></span>
                </a>
                <button onClick={clickDelete} className="icon-button button-secondary">
                    <span className="text">Ta bort</span>
                    <span className="icon"><Delete /></span>
                </button>
            </div>
        </article>
        </>
    )
}