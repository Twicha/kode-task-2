import React from 'react';
import classes from './Message.module.scss';

const Message = ({message, background = '', color = ''}) => {
    const styles = {
        background: background,
        color: color
    }

    return (
        <div className={classes.Message} style={styles}>
            {message}
        </div>
    )
}

export default Message;
