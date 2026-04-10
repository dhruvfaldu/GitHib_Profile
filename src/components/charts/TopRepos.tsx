import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { Repo } from "../../types/github";

type Props = {
    repos: Repo[];
}

function TopRepos({ repos }: Props) {
    const topRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 10);

    return (
        <>
            <h2 className="text-text mb-4">Top Repos by Stars</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={topRepos}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 30,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="name" angle={(-20)} tick={{fontSize: 12}} textAnchor="end" style={{}}/>
                    <YAxis tick={{fontSize: 12}} domain={[0,5000]}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="stargazers_count" fill="#8884d6" barSize={40}  activeBar={{fill: "#344224"}} radius={[8,8,0,0]} animationDuration={800}/>
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default TopRepos