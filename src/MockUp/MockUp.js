import commits from '../images/Screen Shot 2023-11-17 at 8.51 1.svg';
import pullRequest from '../images/Screen Shot 2023-11-17 at 8.51 2.svg';
import top from '../images/Top Badge NEW.svg';
import bottom from '../images/Bottom Badge New.svg';
import comments from '../images/image 8.svg';
import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import axios from "axios";
import './MockUp.scss';
import {Chart} from 'react-google-charts';
// import HomePage from '../HomePage/HomePage';
import gitHub from '../images/image 5.svg';
import { Link } from 'react-router-dom';




const octokit = new Octokit();


function Mockup (){

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
        <main>
            <section className='main'>
                <section className='main-leftSide'>
                <div className='github'>
    <div className='github-title'>
        <img className='github-logo'src={gitHub}></img>
        <h3 className='github_info'>Insert GitHub Information</h3>
    </div>
    <div className='insert_github'>
        <input id='owner' onChange={handleOwner} className='owner' placeholder='Search owner'></input>
        <input id="repo" onChange={handleRepo} className='repo' placeholder='Search link'></input>
       

            <button onClick={getAndListIssues} className='submit'>
                
                Submit</button>
     
    </div>    
    </div>
                    {/* <HomePage /> */}
                    <section className='engagement_container1'>
                        <div className='engagement_container'>
                            <h3 className='engagement_container-title'>Team Engagement</h3>
                            <p className='engagement_container-description'>Compare metrics</p>
                            <div className='engagement_container-buttons'>
                                <button onClick={getAndListIssues} className='engagement_container-buttonTotal'>Total</button>
                                <button onClick={makeAvg} className='engagement_container-buttonAverage'>Average</button>
                            </div>
                        </div>
                        <section className='engament_container2'>
                            <div className='commits_container'>
                                <img className='commitsLogo' src={commits}></img>
                                <h6 className='engament_container2-commits'>Commits</h6>
                                <p className='engament_container2-amount'>{totalCommits}</p>
                            </div>
                            <div className='pull_container'>
                                <img className='pullLogo' src={pullRequest}></img>
                                <h6 className='engament_container2-pull'>Pull Request</h6>
                                <p className='engament_container2-amount'>{totalPulls}</p>
                            </div>
                            <div className='comments_container'>
                                <img className='commentsLogo' src={comments}></img>
                                <h6 className='engament_container2-comments'>Comments</h6>
                                <p className='engament_container2-amount'>{totalComments}</p>
                            </div>
                        </section>
                    </section>
                </section>
                <section>
                <h2 className='title-my-team'>My Team</h2>
                <div class="whole-contr-div">
                    <div className='top'>
                        <img className='top3'src={top} />
                        <h2 class="top-bottom-contr-head">Top Contributors</h2>
                    </div>
                        <div class="top-contr-div">
                            {
                            
                            contributors.slice(0,3).map((contributor) => {
                                return(
                                    <>
                                    <div class="contr-card"
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
                                      }}>
                                <img class="contr-img"  src={contributor.avatar_url} alt=""/>
                                <p class="contr-name">{contributor.login}</p>
                                <p class="contr-contributions">{contributor.contributions}</p>
                            </div>
                                    </>
                                )
                            })}
                            
                            
                        </div>
                        <div className='not'>
                            <img className='not3'src={bottom} />
                            <h2 class="top-bottom-contr-head">Bottom Contributors</h2>
                        </div>
                        <div class="bottom-contr-div" >
                        
                        {
                            
                            contributors.slice(-3).map((contributor) => {
                                return(
                                    <>
                                    
                                <div class="contr-card"
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
                                    <img class="contr-img" src={contributor.avatar_url} alt=""/>
                                    <p class="contr-name">{contributor.login}</p>
                                    <p class="contr-contributions">{contributor.contributions}</p>
                                </div>
                                
                                    </>
                                )
                            })}
                            </div>

                </div>

            <div className='chart'>

                <Chart
                    chartType="PieChart"
                    data={data2}
                    options={options}
                    width={"100%"}
                    height={"400px"}
                    />

            </div>
                    </section>


            </section>
        </main>
        </>
    )
}

export default Mockup