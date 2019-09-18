import React from "react";

export class Home extends React.Component {
    render() {
        console.log(this.props);

        return (
            <div>
                <h1>Hello!</h1>
                <p>Welcome to your new single-page application, built with React</p>
            </div>
        )
    }
}