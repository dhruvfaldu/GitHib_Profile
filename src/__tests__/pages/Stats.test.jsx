import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Stats from "../../pages/Stats";

// mock useParams
vi.mock("react-router-dom", () => ({
    useParams: () => ({
        username: "dhruv",
    }),
}));

// mock child components
vi.mock("../../components/charts/LanguageChart", () => ({
    default: () => <div>LanguageChart</div>,
}));

vi.mock("../../components/charts/TopRepos", () => ({
    default: () => <div>TopRepos</div>,
}));

vi.mock("../../components/charts/YearRepo", () => ({
    default: () => <div>YearRepo</div>,
}));

// mock hook
vi.mock("../../services/githubHooks", () => ({
    userStats: () => ({
        data: [
            {
                stargazers_count: 10,
                forks_count: 5,
            },
            {
                stargazers_count: 20,
                forks_count: 10,
            },
        ],
    }),
}));

describe("Stats Component", () => {

    test("renders all stat titles", () => {
        render(<Stats />);

        expect(screen.getByText("Total Stars")).toBeInTheDocument();
        expect(screen.getByText("Total Forks")).toBeInTheDocument();
        expect(screen.getByText("Average Stars/Repos")).toBeInTheDocument();
    });

    test("calculates total stars correctly", () => {
        render(<Stats />);

        expect(screen.getByText("30")).toBeInTheDocument();
    });

    test("calculates total forks correctly", () => {
        render(<Stats />);

        const elements = screen.getAllByText("15");
        expect(elements.length).toBe(2);
    });

    test("calculates average stars correctly", () => {
        render(<Stats />);

        const elements = screen.getAllByText("15");
        expect(elements.length).toBe(2);
    });

    test("renders chart components", () => {
        render(<Stats />);

        expect(screen.getByText("LanguageChart")).toBeInTheDocument();
        expect(screen.getByText("TopRepos")).toBeInTheDocument();
        expect(screen.getByText("YearRepo")).toBeInTheDocument();
    });

});