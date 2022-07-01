import { BarChart,ResponsiveContainer,CartesianGrid,XAxis,YAxis,Tooltip,Bar } from "recharts";


const Barchart = ({data}) => {
    return <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
            <CartesianGrid strokeDasharray="3 3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#2cb1bc" barSize={25} />
            
        </BarChart>
    </ResponsiveContainer>
};
export default Barchart;
