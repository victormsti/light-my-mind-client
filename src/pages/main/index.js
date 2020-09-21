import React, {Component} from 'react';

import api from '../../services/api';
import { getUserId } from "../../services/auth";

import {Link} from 'react-router-dom';

import './styles.css';

export default class Main extends Component{

    state = {
        reminders : [],
        reminderInfo: {},
        page: 1,
        userId: getUserId()
    };

    componentDidMount(){
        this.loadReminders();
    };

    loadReminders = async (page = 1) =>{
        const {userId} = this.state;

        const response = await api.get(`/reminders/users/id/${userId}?page=${page}`);

        const {docs, ...reminderInfo} = response.data;

        this.setState({reminders: docs, reminderInfo, page});
    };

    prevPage = () => {
        const {page} = this.state;

        if(page ===1) return;

        const pageNumber = page - 1;

        this.loadReminders(pageNumber);
    }

    nextPage = () => {
        const {page, reminderInfo} = this.state;

        if(page === reminderInfo.pages) return;

        const pageNumber = page + 1;

        this.loadReminders(pageNumber);
    }

    deleteReminder = async (id) => {
          try {
            await api.delete(`/reminders/${id}`);
            window.location.reload(false);
          } catch (err) {
            this.setState({
              error:
                err
            });
          }
      };

    render(){
        const {reminders, page, reminderInfo} = this.state;
        return (
            <div className="reminder-list">
                <div className="button-insert">
                <Link to={'/reminders/new-reminder'}>Insert New Reminder</Link>
                </div>
                {reminders.map(reminder => (
                    <article key={reminder._id}>
                        <strong>{reminder.title}</strong>
                <p>{reminder.description}</p>
                
                <div id="actions-button">
                    <Link to={`/reminders/${reminder._id}`}>Access</Link>
                    <button id="delete-button" onClick={(e) => this.deleteReminder(reminder._id)} 
                            key={reminder._id}>Delete</button>
                </div>
                    </article>
        ))}
        
            <div className="actions">
                <button disabled={page ===1} onClick={this.prevPage}>Previous</button>
                <button disabled={page === reminderInfo.pages} onClick={this.nextPage}>Next</button> 
            </div>
        </div>
        );
    }
}