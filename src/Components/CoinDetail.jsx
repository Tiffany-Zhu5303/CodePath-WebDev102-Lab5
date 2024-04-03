import React, {Component, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../routes/NotFound";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinDetail = () => {
    const [fullDetails, setFullDetails] = useState(null);
    let params = useParams();

    useEffect(() => {
        const getCoinDetails = async() => {
            const details = await fetch(
                `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${params.symbol}&tsyms=USD&api_key=${API_KEY}`);
            const description = await fetch(
                `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${params.symbol}&api_key=${API_KEY}`);

            const detailsJson = await details.json();
            console.log("DetailsJson: ", detailsJson);
            const descriptionJson = await description.json();
            console.log("DescriptionJson: ", descriptionJson);

            setFullDetails({"numbers": detailsJson.DISPLAY, "textData": descriptionJson.Data});
        }

        getCoinDetails().catch(console.error);
    }, [params.symbol])

    return(
        <div>
            {fullDetails && fullDetails.textData ? (
            <div>
                <h1>{fullDetails.textData[params.symbol].FullName}</h1>
                <img className="images" src={`https://www.cryptocompare.com/${fullDetails.numbers[params.symbol].USD.IMAGEURL}`}
                alt={`Small icon for ${params.symbol} crypto coin`} />

                <div>{fullDetails.textData[params.symbol].Description}</div>
                <br></br>
                <div>
                    This coin was built with the algorithm {" "}
                    {fullDetails.textData[params.symbol].Algorithm}{" "}
                </div>

                <table>
                    <tbody> 
                        <tr>
                            <th>Launch Date </th>
                            <td>{fullDetails.textData[params.symbol].AssetLaunchDate}</td>
                        </tr>
                        <tr>
                            <th>Website </th>
                            <td><a href={fullDetails.textData[params.symbol].AssetWebsiteUrl}>
                                {fullDetails.textData[params.symbol].AssetWebsiteUrl}</a></td>
                        </tr>
                        <tr>
                            <th>Whitepaper </th>
                            <td><a href={fullDetails.textData[params.symbol].AssetWhitepaperUrl}>
                                {fullDetails.textData[params.symbol].AssetWhitepaperUrl}</a></td>
                        </tr>
                        <tr>
                            <th>Monetary Symbol </th>
                            <td>{fullDetails.numbers[params.symbol].USD.TOSYMBOL}</td>
                        </tr>
                        <tr>
                            <th>Market </th>
                            <td>{fullDetails.numbers[params.symbol].USD.MARKET}</td>
                        </tr>
                        <tr>
                            <th>Last Transaction </th>
                            <td>{fullDetails.numbers[params.symbol].USD.LASTMARKET}</td>
                        </tr>
                        <tr>
                            <th>Last Transaction Value</th>
                            <td>{fullDetails.numbers[params.symbol].USD.LASTVOLUMETO}</td>
                        </tr>
                        <tr>
                            <th>Volume </th>
                            <td>{fullDetails.numbers[params.symbol].USD.TOTALVOLUME24HTO}</td>
                        </tr>
                        <tr>
                            <th>Today's Open Price </th>
                            <td>{fullDetails.numbers[params.symbol].USD.OPENDAY}</td>
                        </tr>
                        <tr>
                            <th>Highest Price during the Day </th>
                            <td>{fullDetails.numbers[params.symbol].USD.HIGHDAY}</td>
                        </tr>
                        <tr>
                            <th>Lowest Price during the Day </th>
                            <td>{fullDetails.numbers[params.symbol].USD.LOWDAY}</td>
                        </tr>
                        <tr>
                            <th>Change from Previous Day </th>
                            <td>{fullDetails.numbers[params.symbol].USD.CHANGEDAY}</td>
                        </tr>
                        <tr>
                            <th>Market Cap </th>
                            <td>{fullDetails.numbers[params.symbol].USD.MKTCAP}</td>
                        </tr>
                    </tbody>
                </table>
            </div>):(<NotFound />)}
        </div>
    );
}

export default CoinDetail;