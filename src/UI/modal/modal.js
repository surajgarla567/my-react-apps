import React from 'react';
import classes from './modal.module.css';
import Backdrop from '../backdrop/backdrop';

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} click={props.modalClosed}/>
            <div className={classes.Modal}
                    style={{
                        opacity : props.show ? 1 : 0,
                        transform : props.show ? 'translateY(0)' : 'translateY(-100vh)'
                    }}>
                {props.children}
            </div>
        </React.Fragment>
    );
};

export default modal;
