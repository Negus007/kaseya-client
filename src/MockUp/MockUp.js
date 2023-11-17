import porfile from "../images/Mask group.svg";
import question from "../images/material-symbols_question-mark.svg";
import setting from "../images/material-symbols-light_settings.svg";
import bell from "../images/ic_outline-notifications.svg";
import gitHub from "../images/image 5.svg";
import commits from "../images/Screen Shot 2023-11-17 at 8.51 1.svg";
import pullRequest from "../images/Screen Shot 2023-11-17 at 8.51 2.svg";
import comments from "../images/image 8.svg";
import "./MockUp.scss";
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import axios from "axios";

import { Chart } from "react-google-charts";
const octokit = new Octokit();

function Mockup() {
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

  const data2 = [
    ["Task", "Hours per Day"],
    ["Pulls", contributorPulls],
    ["Commits", contributorCommits],
    ["Comments", contributorComments],
  ];
  const options = {
    title: "My Daily Activities",
  };

  const handleOwner = (e) => {
    setOwner(e.target.value);
  };

  const handleRepo = (e) => {
    setRepo(e.target.value);
  };
  const getTotal = async () => {
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
      <header>
        <section className="nav_bar">
          <h2 className="nav_bar-title">Dashboard</h2>
          <div className="nav_bar-aside">
            <img className="nav_bar-setting" src={setting}></img>
            <img className="nav_bar-bell" src={bell}></img>
            <img className="nav_bar-question" src={question}></img>
            <img className="nav_bar-porfile" src={porfile}></img>
          </div>
        </section>
      </header>
      <main>
        <section className="main">
          <section className="main-leftSide">
            <div className="github">
              <div className="github-title">
                <img className="github-logo" src={gitHub}></img>
                <h3 className="github_info">Insert GitHub Information</h3>
              </div>
              <div className="insert_github">
                <input
                  className="owner"
                  id="owner"
                  onChange={handleOwner}
                  placeholder="Search owner"
                ></input>
                <input
                  className="repo"
                  onChange={handleRepo}
                  placeholder="Search link"
                ></input>
                <button onClick={getTotal} className="submit">
                  Submit
                </button>
              </div>
            </div>
            <section className="engagement_container1">
              <div className="engagement_container">
                <h3 className="engagement_container-title">Team Engagement</h3>
                <p className="engagement_container-description">
                  Compare metrics
                </p>
                <div className="engagement_container-buttons">
                  <button
                    onClick={getTotal}
                    className="engagement_container-buttonTotal"
                  >
                    Total
                  </button>
                  <button
                    onClick={makeAvg}
                    l
                    className="engagement_container-buttonAverage"
                  >
                    Average
                  </button>
                </div>
              </div>
              <section className="engament_container2">
                <div className="commits_container">
                  <img className="commitsLogo" src={commits}></img>
                  <h6 className="engament_container2-commits">Commits</h6>
                  <p className="engament_container2-amount">{totalCommits}</p>
                </div>
                <div className="pull_container">
                  <img className="pullLogo" src={pullRequest}></img>
                  <h6 className="engament_container2-pull">Pull Request</h6>
                  <p className="engament_container2-amount">{totalPulls}</p>
                </div>
                <div className="comments_container">
                  <img className="commentsLogo" src={comments}></img>
                  <h6 className="engament_container2-comments">Comments</h6>
                  <p className="engament_container2-amount">{totalComments}</p>
                </div>
              </section>
            </section>
          </section>
          <section>
            <h1>{current}</h1>
            <h2>Pulls</h2>
            <p>{contributorPulls}</p>
            <h2>Commits</h2>
            <p>{contributorCommits}</p>
            <h2>Comments</h2>
            <p>{contributorComments}</p>
            <ul>
              {contributors.map((contributor) => {
                return (
                  <>
                    <li>
                      <section>
                        <h2
                          onClick={async () => {
                            setCurrent(contributor.login);
                            const pulls = await octokit.pulls.list({
                              owner,
                              repo,
                              state: "all",
                            });
                            const userPulls = pulls.data.filter(
                              (pull) => pull.user.login === current,
                            );
                            setContributorPulls(userPulls.length);
                            const commits = await octokit.paginate(
                              octokit.rest.repos.listCommits,
                              {
                                owner,
                                repo,
                              },
                            );
                            const filterNull = commits.filter(
                              (commit) => commit.author !== null,
                            );

                            const userCommits = filterNull.filter(
                              (commit) => commit.author.login === current,
                            );

                            setContributorCommits(
                              Math.trunc(userCommits.length / 2) + 1,
                            );
                            const comments = await axios.get(
                              `https://api.github.com/repos/${owner}/${repo}/pulls/comments`,
                            );

                            const commentPulls = comments.data.filter(
                              (comment) => comment.user.login === current,
                            );
                            setContributorComments(commentPulls.length);
                          }}
                        >
                          {contributor.login}
                        </h2>
                        <p> {contributor.contributions}</p>
                      </section>
                    </li>
                  </>
                );
              })}
            </ul>
            <Chart
              chartType="PieChart"
              data={data2}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </section>
        </section>
      </main>
    </>
  );
}
export default Mockup;
