import lottie from "lottie-web"
import { useCallback, useEffect, useState } from "react";
import animation from "../icons/loading-animation.json";
import "./LoadingScreen.css";

export default function LoadingScreen(){
    const [delayComplete, setDelayComplete] = useState(false);
    const [waitingForServer, setWaitingForServer] = useState(false);
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

    useEffect(() => {
        const renderDelay = 500; //ms
        const timer1 = setTimeout(() => {
            setDelayComplete(true);
        }, renderDelay);

        const timer2 = setTimeout(() => {
            setWaitingForServer(true);
        }, 4000);

        function cleanup(){
            clearTimeout(timer1);
            clearTimeout(timer2);
        }

        return cleanup;
    },[])

    if(delayComplete === false) 
        return null;
    else return(
        <div id="loadingScreen">
            <span id="loadingAnimation" ref={animationContainer} />
            <h2 className="text-animation show">Laddar recept</h2>
            <p className={`text-animation ${waitingForServer ?"show" :""}`} >
                Servern behöver startas. Det tar ungefär 30 sekunder.
            </p>
        </div>
    )
}
