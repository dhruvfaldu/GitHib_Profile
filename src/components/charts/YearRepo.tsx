import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Repo } from "../../types/github";

type Props = {
    repos: Repo[];
}

function YearRepo({ repos }: Props) {
    const years = repos.reduce((total: Record<number, number>, repo) => {
        const year = new Date(repo.created_at).getFullYear();
        total[year] = total[year] ? total[year] + 1 : 1;
        return total;
    }, {});

    // const sortedYears = Object.keys(years).map(year => ({ year, count: years[parseInt(year)] }));
    const sortedYears = Object.keys(years)
        .map(year => ({ year: parseInt(year), count: years[parseInt(year)] }))
        .sort((a, b) => a.year - b.year);

    return (
        <>
            <h2 className="text-left mb-3 text-text">Repos created per Year</h2>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                    width={500}
                    height={300}
                    data={sortedYears}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

export default YearRepo