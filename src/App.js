import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import Individual from "./IndiviualPullRequest/IndividualPull";
const octokit = new Octokit({
  auth: "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",
});

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [contributors, setContributors] = useState([]);
  const [avgPulls, setAvgPulls] = useState(0);
  const [avgCommits, setAvgCommits] = useState([]);
  const handleOwner = (e) => {
    setOwner(e.target.value);
  };

  const handleRepo = (e) => {
    setRepo(e.target.value);
  };
  const getAndListIssues = async () => {
    const contributions = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
    );
    {
      /*const pulls = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
    );*/
    }
    const pulls = await octokit.pulls.list({
      owner,
      repo,
      state: "all",
    });
    {
      /*const commits = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
    );*/
    }

    const comments = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/comments`,
    );
    const comments2 = await octokit.repos.listCommits({
      owner,
      repo,
    });

    setAvgPulls(pulls.data.length);

    setContributors(contributions.data);
  };
  useEffect(() => {
    if (contributors) {
      const getCommits = async () => {
        const commits = await octokit.repos.listCommits({
          owner,
          repo,
        });

        setAvgCommits(commits.data.length / contributors.length);
      };
      getCommits();
    }
  }, [contributors]);

  return (
    <>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <label htmlFor="owner">Owner:</label>
      <input onChange={handleOwner} id="owner" />
      <label htmlFor="repo">Repo:</label>
      <input onChange={handleRepo} id="repo" />
      <button onClick={getAndListIssues}>List Issues</button>
      <h2>Avg Pull</h2>
      <p>{avgPulls}</p>
      <h2>Avg Commits</h2>
      <p>{avgCommits}</p>
      <ul>
        {contributors.map((contributor) => {
          return (
            <>
              <li>
                <section>
                  <h2>{contributor.login}</h2>
                  <img src={contributor.avatar_url} />
                  <p>{contributor.contributions}</p>
                </section>
              </li>
            </>
          );
        })}
      </ul>
      <Individual repo={repo} contributors={contributors} owner={owner}/>
    </>
  );
}

export default App;
