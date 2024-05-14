import React from "react";
import gifLoad from "../images/gif/loading-gear.gif";

export default function Loading() {
    return(
        <div className="loading">
            <h4>rooms data are loading...</h4>
            <img src={gifLoad} alt="Alternative gif" />
        </div>
    )
}