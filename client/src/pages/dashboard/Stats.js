import { useEffect } from "react";
import ChartsContainer from "../../components/ChartsContainer";
import Spinner from "../../components/Spinner";
import StatsContainer from "../../components/StatsContainer";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
    const { getAllStats, isLoading, monthlyApplications } = useAppContext();

    useEffect(() => {
        getAllStats();
    }, []);

    if (isLoading) {
        return <Spinner center />;
    }

    return (
        <div>
            <StatsContainer />

            {monthlyApplications.length > 0 && <ChartsContainer />}
        </div>
    );
};
export default Stats;
