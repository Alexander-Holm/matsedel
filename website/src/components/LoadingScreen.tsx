import lottie from "lottie-web"
import { useCallback, useEffect, useState } from "react";
import animation from "../icons/loading-animation.json";
import "./LoadingScreen.css";

export default function LoadingScreen(){
    const [delayComplete, setDelayComplete] = useState(false);
    // Måste vänta på att animationContainer finns i DOM innan animationen kan startas
    const animationContainer = useCallback((node: HTMLElement | null) => {
        if(node != null){
            lottie.loadAnimation( {
                container: node,
                animationData: animation,
                renderer: "svg",
                autoplay: true,
                loop: true,
            });
        }
    }, []);

    // Det ser inte bra ut när animationen visas en väldigt kort stund.
    // Väntar lite med att visa animationen så att den inte visas när det går väldigt fort att ladda.
    useEffect(() => {
        const renderDelay = 500; //ms
        const timer = setTimeout(() => {
            setDelayComplete(true);
        }, renderDelay);
        return () => clearTimeout(timer);
    },[])

    if(delayComplete === false) 
        return null;
    else return(
        <div id="loadingScreen">
            <span id="loadingAnimation" ref={animationContainer} />
            <h2>Laddar recept</h2>
        </div>
    )
}
