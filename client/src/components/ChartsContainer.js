import { useState } from "react";
import { useAppContext } from "../context/appContext";

import Wrapper from "../wrappers/ChartsContainer"
import AreaChart from "./AreaChart";
import BarChart from "./BarChart";

const ChartsContainer = () => {
    const [barChart, setBarChart] = useState(true);

    const { monthlyApplications } = useAppContext();

    return <Wrapper>
        <h4>monthly applications</h4>

        <button type="button" onClick={() => setBarChart(!barChart)}>
            {barChart?"AreaChart":"BarChart"}
        </button>

        {barChart ?
        <BarChart data={monthlyApplications} />
        :
        <AreaChart data={monthlyApplications} />
    }

        
    </Wrapper>;
};
export default ChartsContainer;
