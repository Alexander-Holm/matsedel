<script lang="ts">
    import lottie from "lottie-web"
    import { onMount } from "svelte";
    import Logo from "./Logo.svelte";
    import animation from "../icons/preparing-food.json"


    let animationContainer: HTMLElement;
    // Texten ska inte visas innan animationen har startat
    let animationStarted = false;
    // Tar det lång tid att ladda beror det på att servern behöver startas
    let waitingForServer = false;

    onMount(() => {
        lottie.loadAnimation( {
            container: animationContainer,
            animationData: animation,
            renderer: "svg",
            autoplay: true,
            loop: true,
        });
        animationStarted = true;

        const timer = setTimeout(() => {
            waitingForServer = true;
        }, 4000);

        return () => clearTimeout(timer);
    })
</script>

<header>    
    <Logo /> 
</header>
<main>
    <span bind:this={animationContainer} id="loading-animation" />
    <h2 class="scale-in" class:show={animationStarted} >Laddar recept</h2>
    <p class="scale-in" class:show={waitingForServer} >Servern behöver startas. Detta kan ta över 30 sekunder.</p>
</main>

<style>
    main{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    #loading-animation{
        width: 200px;
        height: 200px;
        /* Animationen har mycket white-space runt sig */
        margin-top: -10%;
        margin-bottom: -40px;
    }
    h2{
        margin-bottom: 50px;
        font-variation-settings: "wght" 400;
    }
    .scale-in{
        transform: scale(0);
        transition: 500ms cubic-bezier(.46,1.14,.46,1.14);
    }
        .scale-in.show{
            transform: scale(1);
        }
</style>