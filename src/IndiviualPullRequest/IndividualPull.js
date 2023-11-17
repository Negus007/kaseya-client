import { useEffect, useState } from "react"
import axios from "axios";

function Individual({owner, repo}) {
   
    const [totalContributors, setTotalContributors] = useState([]);
    const [top3, setTop3] = useState([]);
    console.log(top3)
    

    useEffect(() => {
      async function contributors() {
        try {
          const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
  
          setTotalContributors(response.data);
          console.log(response.data);
          
          const sortedContributors = totalContributors.sort(
               (a, b) => b.contributions - a.contributions )
      
         const top3Contributors = sortedContributors.slice(0, 3);
         setTop3(top3Contributors)
         console.log(top3Contributors)
        } catch (error) {
          console.error("Error fetching pull requests:", error);
        }
      }

  
      contributors();
    }, [owner, repo]);



    return (
        <main>
            <h2>Top 3 Contributors</h2>
        {top3?.map((contributor) => (
          <p key={contributor.id}>{contributor.login}</p>
        ))}


       </main>
        

    )
}

export default Individual