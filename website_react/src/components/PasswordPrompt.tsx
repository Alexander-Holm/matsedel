import { createContext, FormEvent, PropsWithChildren, useContext, useRef, useState } from "react";
import { Api } from "../models/api/Api";
import "./PasswordPrompt.css";


type PromptCallback = (userInput: string | null) => void;
type ShowPrompt = () => Promise<string | null>;
const Context = createContext<ShowPrompt | null>( null );

/**
    Provides a context for getting the ApiKey.

    Wrap components that need access to ApiKey.
    Used together with {@link usePasswordPrompt} hook.
    @example
    <PasswordPromptProvider>
        <App />
    </PasswordPromptProvider>
    @see {@link usePasswordPrompt} for how to interact with the prompt.
*/
export function PasswordPromptProvider(props: PropsWithChildren){
    const [promptCallback, setPromptCallback] = useState<PromptCallback | null>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const checkbox = useRef<HTMLInputElement>(null);

    function showPrompt(){
        // Ett Promise som är pending tills resolve anropas manuellt när prompt stängs
        return new Promise<string | null>(resolve => {
            // Spara resolve i state för att kunna anropa senare.
            // Måste vara arrow-function för att spara en funktion i state,
            // fungerar inte med setState(resolve).
            setPromptCallback(() => resolve);
        })
    }

    function handleSubmit(event: FormEvent){
        event.preventDefault();
        const key = passwordInput.current!.value;
        const remember = checkbox.current!.checked;
        Api.key.set(key, remember);
        
        promptCallback!(key);
        setPromptCallback(null); // Stänger prompt
    }
    function handleCancel(){
        promptCallback!(null);
        setPromptCallback(null);// Stänger prompt
    }

    return(
        <Context.Provider value={showPrompt}>        
            {/* Öppnar och stänger prompt genom att sätta promptCallback */}
            { promptCallback !== null &&
                <div id="modal-container">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="password-input">Ange lösenord</label>
                        <input id="password-input" type="password" ref={passwordInput} autoFocus required/>
                        <label htmlFor="remember-input">Kom ihåg</label>
                        <input id="remember-input" type="checkbox" ref={checkbox} />
                        <button type="button" onClick={handleCancel}>Avbryt</button>
                        <button type="submit">Spara</button>
                    </form>
                </div>
            }

            {props.children}            
        </Context.Provider>
    )
}


/**
    Hook used to interact with the input prompt from {@link PasswordPromptProvider}.

    The component using this needs to be a child of {@link PasswordPromptProvider}.
    @example
    const passwordPrompt = usePasswordPrompt();
    const key = await passwordPrompt.show();
*/
export function usePasswordPrompt(){
    const showPrompt = useContext(Context);    
    /**
        Shows an input prompt that can be awaited.
        @return
        Returns a promise that resolves when the prompt is closed or submitted. 
        Resolved value is the key if submitted or null if cancelled.
    */
    async function show(){
        if(showPrompt === null)
            throw new Error("The component that showApiKeyPrompt was called from is not a child of ApiKeyPromptProvider");
        return await showPrompt();
    }

    return { show };
}