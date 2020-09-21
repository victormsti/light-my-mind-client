import React, {Component} from 'react';
import api from '../../services/api';

import './styles.css';

export default class Reminder extends Component{
    state = {
        reminder: {}
    }
    
    async componentDidMount(){

        const {id} = this.props.match.params;

        const response = await api.get(`reminders/${id}`);

        this.setState({reminder : response.data});
    }

    render(){
        const {reminder} = this.state;

        return (
            <div className="reminder-info">
                <h1>{reminder.title}</h1>
                <p>{reminder.description}</p>
                <p><strong>Created At:</strong> {reminder.createdAt}</p>
                <p><strong>Period: </strong>{reminder.period}</p>
            </div>
        );
    }
}