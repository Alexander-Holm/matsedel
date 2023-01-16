import { Link } from "react-router-dom";
import { ReactComponent as Logo} from "../icons/matsedel-logo.svg"
import "./Header.css";

interface props{
    children?: React.ReactNode
}
export default function Header( { children }: props ){
    return (
        <header id="header">
            <Link id="header-logo" to={"/"}>
                <Logo />
                <h1>Alexanders matsedel</h1>
            </Link>
            <span id="header-slot">{children}</span>
        </header>
    )
}