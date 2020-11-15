import "./index.scss";
import React from "react";

export default class Loading extends React.Component{
    render(){
        return (
            <div className="loading-container">
                <div className="loading-wrapper">
                    <div className="loading-body">加载中...</div>
                </div>
            </div>
        )
    }
}