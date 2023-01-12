import lottie from "lottie-web"
import { useEffect, useRef, useState } from "react";
import animation from "../icons/loading-animation.json";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen(){
    const [animationStarted, setAnimationStarted] = useState(false);
    const [waitingForServer, setWaitingForServer] = useState(false);
    const animationContainer = useRef(null);

    useEffect(() => {
        if(animationContainer.current == null){
            console.log("animationContainer null");
            return;
        }

        lottie.loadAnimation( {
            container: animationContainer.current,
            animationData: animation,
            renderer: "svg",
            autoplay: true,
            loop: true,
        });
        setAnimationStarted(true);

        const timer = setTimeout(() => {
            setWaitingForServer(true);
        }, 4000);

        return () => clearTimeout(timer);
    },[])

    return(
        <div id={styles.loadingScreen}>
            <span id={styles.loadingAnimation} ref={animationContainer} />
            <h2 className={animationStarted ? styles.show : styles.hide} >
                Laddar recept
            </h2>
            <p className={waitingForServer ? styles["show"] : styles["hide"]} >
                Servern behöver startas. Detta kan ta över 30 sekunder.
            </p>
        </div>
    )
}
