import { useEffect, useMemo, useState } from "react"
import { usePasswordPrompt } from "../components/PasswordPrompt";
import HeaderComponent from "../components/Header"
import LoadingScreen from "../components/LoadingScreen";
import WeekCard from "../components/WeekCard";
import { Api } from "../models/api/Api";
import { Week } from "../models/Week";

export default function Index(){
    const [weeks, setWeeks] = useState<Week[]>();
    // För att ladda previews en vecka i taget uppifrån
    const [loadPreviewsForWeek, setLoadPreviewsForWeek] = useState(0); //index
    const passwordPrompt = usePasswordPrompt();

    useEffect(() => {
        Api.weeks.getAll()
            .then(weeks => setWeeks(weeks));
    },[])

    async function addWeek(presetName?: string | undefined){
        let apiKey = Api.key.get();
        apiKey ??= await passwordPrompt.show();
        if(apiKey === null) return;

        const weekName = prompt("Namn på vecka", presetName);
        if(weekName == null) return;

        try{
            const newWeek = await Api.weeks.add(weekName, apiKey);
            // Lägg ny week på första plats i arrayen
            setWeeks(weeks => [newWeek, ...weeks as []]);
        }
        catch(error){
            // Behåller namnet i input-rutan vid fel lösenord
            const onRetry = () => addWeek(weekName);
            Api.handleErrors(error, onRetry);
        }
    }

    function handleWeekDelete(id: number){
        // Om sista veckan tas bort måste weeks sättas till en tom array, inte undefined.
        // Annars blir det en oändlig LoadingScreen.
        setWeeks(weeks =>  weeks?.filter(week => week.id !== id) || []);
    }

    // Använder useMemo för att förhindra onödiga rerenders av Header som förstör animationen.
    // Endast sista halvan av animationen visas annars när man 
    // kommer till den här sidan från någon av recept-sidorna.
    // WeekCard animationerna verkar inte ha samma problem.
    const Header = useMemo(() => {
        if(weeks === undefined) return () => <HeaderComponent />
        else return () => (
            <HeaderComponent >
                <button className="add-week button-primary" onClick={() => addWeek()} >Ny vecka</button>
            </HeaderComponent>
        )
    }, [weeks])

    if(weeks === undefined){
        return(
            <>
            <Header />
            <LoadingScreen />
            </>
        )
    }
    else return (
        <>
        <Header />
        <main id="weeks">
            {weeks?.map((week, index) => {
                return(
                    <WeekCard 
                        id={week.id} key={week.id}
                        name={week.name} 
                        days={week.days}

                        animationDelayMs={index * 150}
                        loadPreviews={index === loadPreviewsForWeek}
                        onPreviewsLoaded={() => setLoadPreviewsForWeek(index + 1)}
                        onDelete={handleWeekDelete}
                    />
                )
            })}
        </main>
        </>
    )
}