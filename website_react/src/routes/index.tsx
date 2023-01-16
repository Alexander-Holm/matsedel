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

    const [isLoading, setIsLoading] = useState(true);
    const [weeks, setWeeks] = useState<Week[]>([]);
    // För att ladda previews en vecka i taget uppifrån
    const [loadPreviewsForWeek, setLoadPreviewsForWeek] = useState(0); //index

    useEffect(() => {
        Api.weeks.getAll().then(weeks => {
            setWeeks(weeks);
            setIsLoading(false);
        })
    },[])

    async function addWeek(){
        const weekName = prompt("Namn på vecka");
        if(weekName == null) return;
        const newWeek = await Api.weeks.add(weekName);
        // Lägg ny week på första plats i arrayen.
        setWeeks(weeks => [newWeek, ...weeks]);
    }

    function handleWeekDelete(id: number){
        setWeeks(weeks =>  weeks.filter(week => week.id !== id));
    }

    // Använder useMemo för att förhindra onödiga rerenders av Header som förstör animationer
    const Header = useMemo(() => {
        if(isLoading) return () => <HeaderComponent />
        else return () => (
            <HeaderComponent >
                <button className="add-week button-primary" onClick={addWeek} >Ny vecka</button>
            </HeaderComponent>
        )
    }, [isLoading])

    if(isLoading){
        return(
            <>
            <Header />
            <LoadingScreen />
            </>
        )
    }

    return (
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