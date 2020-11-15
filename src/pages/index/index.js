import "./index.scss";
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const login = gql`
    query {
        viewer {
            login
        }
    }
`;

export default function Index() {
    const { loading, error, data } = useQuery(login);
    
    console.log(loading);
    console.log(data);
    
    return (
        <div className="page page-index">
            <div className="page-index-container">
                <div>Hello, React!</div>
                <div>
                    <Link to="/test">Click here</Link>
                </div>
            </div>
        </div>
    );
}
