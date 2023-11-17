import { useEffect, useState } from "react"

function Individual({repo, contributors, owner}) {

    const [pulls, setPulls] =  useState([]);

useEffect (() => {
    async function pullRequest(){
        const response = `https://api.github.com/repos/${owner}/${repo}/pulls`;
        setPulls(response.data)
        console.log(response.data)

    }
    pullRequest()
    }, [])

    return (
        <>
        
        </>

    )
}

export default Individual