import React, {Component, useEffect, useState} from "react";

const CryptoScam = () => {
    const [scamList, setScamList] = useState(null);

    useEffect(() => {
        const getScams = async() => {
            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
                mode:'no-cors'
            };
              
            const response = await fetch("https://api.cryptoscamdb.org/v1/featured", requestOptions);
            const json = await response.json();
            console.log("SCAMMMMMM", json);
            setScamList(json);
        };

        getScams().catch(console.error);
    }, []);

    return(
        <div>
            <p>Here is a list of coins and platforms involved in recent crypto-related scams: </p>
            <ul className="side-list">
                {scamList && scamList.result.map((scam) => {
                    <li key={scam.name}>{scam.name}</li>
                })}
            </ul>
        </div>
    )
}

export default CryptoScam;