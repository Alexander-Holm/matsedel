import { ReactComponent as Logo} from "../icons/matsedel-logo.svg"
import "./Header.css";

interface props{
    children?: React.ReactNode
}
export default function Header( { children }: props ){
    return (
        <header id="header">
            <span id="header-logo">
                <Logo />
                <h1>Matsedel</h1>
            </span>
            <span id="header-slot">{children}</span>
        </header>
    )
}