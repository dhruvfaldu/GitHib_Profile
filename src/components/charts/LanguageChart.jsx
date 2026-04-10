import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

function LanguageChart({ repos }) {
    const getLanguageData = (repos) => {
        const langCount = {};
        repos.forEach((repo) => {
            const lang = repo.language;
            if (!lang) return;
            if (langCount[lang]) {
                langCount[lang] += 1;
            } else {
                langCount[lang] = 1;
            }
        });

        return Object.keys(langCount).map((lang) => ({
            language: lang,
            count: langCount[lang],
        }));
    };

    const data = getLanguageData(repos);

    return (
        <>
            <div>
                <h2 className="text-left mb-3 text-text">Most Use Languages</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={500} height={300} data={data} margin={{ top: 5, right: 30, left: 30, bottom: 5, }}>
                        <XAxis dataKey="language" tick={{ fontSize: 12 }} style={{}} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" activeBar={{ fill: "#344224" }} fill="#8884d8" radius={[8,8,0,0]} animationDuration={800} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default LanguageChart