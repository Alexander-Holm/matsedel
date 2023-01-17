// React
import { useEffect, useMemo, useState } from "react"
// Components
import HeaderComponent from "../components/Header"
import LoadingScreen from "../components/LoadingScreen";
import WeekCard from "../components/WeekCard";
// Models
import { Api } from "../models/api/Api";
import { Week } from "../models/Week";

export default function Index(){
    const [weeks, setWeeks] = useState<Week[]>();
    // För att ladda previews en vecka i taget uppifrån
    const [loadPreviewsForWeek, setLoadPreviewsForWeek] = useState(0); //index

    useEffect(() => {
        Api.weeks.getAll()
            .then(weeks => setWeeks(weeks));
    },[])

    async function addWeek(){
        const weekName = prompt("Namn på vecka");
        if(weekName == null) return;
        const newWeek = await Api.weeks.add(weekName);
        // Lägg ny week på första plats i arrayen.
        setWeeks(weeks => [newWeek, ...weeks as []]);
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
                <button className="add-week button-primary" onClick={addWeek} >Ny vecka</button>
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