import "./App.css";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import Individual from "./IndiviualPullRequest/IndividualPull";
import Mockup from "./MockUp/MockUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import HomePage from "./HomePage/HomePage";
const octokit = new Octokit();

function App() {
  // const [owner, setOwner] = useState("");
  // const [repo, setRepo] = useState("");
  // const [contributors, setContributors] = useState([]);
  // const [avgPulls, setAvgPulls] = useState(0);
  // const [avgCommits, setAvgCommits] = useState([]);
  // const handleOwner = (e) => {
  //   setOwner(e.target.value);
  // };

  // const handleRepo = (e) => {
  //   setRepo(e.target.value);
  // };
  // const getAndListIssues = async () => {
  //   const contributions = await axios.get(
  //     `https://api.github.com/repos/${owner}/${repo}/contributors`,
  //   );
  //   {
  //     /*const pulls = await axios.get(
  //     `https://api.github.com/repos/${owner}/${repo}/pulls`,
  //   );*/
  //   }
  //   const pulls = await octokit.pulls.list({
  //     owner,
  //     repo,
  //     state: "all",
  //   });
  //   {
  //     /*const commits = await axios.get(
  //     `https://api.github.com/repos/${owner}/${repo}/commits`,
  //   );*/
  //   }

  //   const comments = await axios.get(
  //     `https://api.github.com/repos/${owner}/${repo}/pulls/comments`,
  //   );
  //   const comments2 = await octokit.repos.listCommits({
  //     owner,
  //     repo,
  //   });

  //   setAvgPulls(pulls.data.length);

  //   setContributors(contributions.data);
  // };
  // useEffect(() => {
  //   if (contributors) {
  //     const getCommits = async () => {
  //       const commits = await octokit.repos.listCommits({
  //         owner,
  //         repo,
  //       });

  //       setAvgCommits(commits.data.length / contributors.length);
  //     };
  //     getCommits();
  //   }
  // }, [contributors]);

  return (
    <>
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path={'/'} element={<Mockup/>} />
      </Routes>
    </BrowserRouter>   
    </>
  );
}

export default App;
