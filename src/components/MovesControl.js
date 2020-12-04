import React from 'react';


export default class MovesControl extends React.Component {
    render() {
        return (
            <button
                onClick={() => this.props.onClick()}
                disabled={this.props.disabled} >
                {this.props.value}
            </button>
        )
    }
};

// export default function MovesControl() {
//     return (
//         <button onClick={() => this.props.onClick()} disabled={this.props.disabled}>
//             {this.props.value}
//         </button>
//     );
// }