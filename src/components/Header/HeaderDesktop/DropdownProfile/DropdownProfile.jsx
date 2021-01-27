import './_dropdown-profile.scss';
import React from 'react';
// import { Transition, animated } from 'react-spring/renderprops';


export default class DropdownProfile extends React.Component {
    state = { show: false };
    toggle = () => this.setState(state => ({ show: !state.show }));

    render() {
        return (
            <div className="dropdown-profile">
                <a
                    className="dropdown-profile-button"
                    href="/site/login"
                    // target="_blank"
                    rel="noopener noreferrer"
                >
                    Вход
                </a>
                {/*<div className="dropdown-profile-button" onClick={this.toggle}>Войти</div>*/}
                {/*<Transition*/}
                {/*    // native*/}
                {/*    items={this.state.show}*/}
                {/*    trail={10}*/}
                {/*    from={{ opacity: 0, transform: 'scale(0.9, 1) translateY(0px)',}}*/}
                {/*    enter={{ opacity: 1, transform: 'scale(1, 1) translateY(10px)' }}*/}
                {/*    leave={{ opacity: 0 }}*/}
                {/*>*/}
                {/*    {show =>*/}
                {/*        show && (props =>*/}
                {/*            <animated.div*/}
                {/*                className="dropdown-profile-menu"*/}
                {/*                style={props}*/}
                {/*            >*/}
                {/*                */}
                {/*            </animated.div>*/}
                {/*        )*/}
                {/*    }*/}
                {/*</Transition>*/}
            </div>
        )
    }
}