import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import Mockup from "./MockUp/MockUp";
const octokit = new Octokit();

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [contributors, setContributors] = useState([]);
  const [totalPulls, setTotalPulls] = useState(0);
  const [totalCommits, setTotalCommits] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [current, setCurrent] = useState("");
  const [contributorPulls, setContributorPulls] = useState(0);
  const [contributorCommits, setContributorCommits] = useState(0);
  const [contributorComments, setContributorComments] = useState(0);

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
    const userPulls = pulls.data.filter((pull) => pull.user.login === current);
    setContributorPulls(userPulls.length);
    {
      /*const commits = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
    );*/
    }
    const commits = await octokit.paginate(octokit.rest.repos.listCommits, {
      owner,
      repo,
    });
    const filterNull = commits.filter((commit) => commit.author !== null);

    const userCommits = filterNull.filter(
      (commit) => commit.author.login === current,
    );
    console.log(userCommits);
    setContributorCommits(userCommits.length / 2);

    setTotalCommits(commits.length);

    const comments = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/pulls/comments`,
    );
    const commentPulls = comments.data.filter(
      (comment) => comment.user.login === current,
    );
    setContributorComments(commentPulls.length);

    console.log(comments.data);
    setTotalComments(comments.data.length);
    const comments2 = await octokit.repos.listCommits({
      owner,
      repo,
    });

    setTotalPulls(pulls.data.length);

    setContributors(contributions.data);
    setCurrent(contributions.data[0].login);
  };
  const makeAvg = () => {
    setTotalComments(totalComments / contributors.length);
    setTotalCommits(totalCommits / contributors.length);
    setTotalPulls(totalPulls / contributors.length);
  };

  return (
    <>
      <Mockup />
    </>
  );
}

export default App;
