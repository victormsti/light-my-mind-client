import React, {useLayoutEffect, useState} from 'react';

import api from '../../services/api';
import { getUserId } from "../../services/auth";

import {Link} from 'react-router-dom';

import './styles.css';

const Main = () => {

    const [mainForm, setMainForm] = useState({
        reminders : [],
        reminderInfo: {},
        page: 1,
        userId: getUserId()
    });

    useLayoutEffect(() => {
        loadReminders();
    }, []);

    const loadReminders = async (page = 1) =>{
        const {userId} = mainForm;

        const response = await api.get(`/reminders/users/id/${userId}?page=${page}`);

        const {docs, ...reminderInfo} = response.data;

        setMainForm({...mainForm, reminders: docs, reminderInfo, page});
    };

    const prevPage = () => {
        const {page} = mainForm;

        if(page ===1) return;

        const pageNumber = page - 1;

        loadReminders(pageNumber);
    }

    const nextPage = () => {
        const {page, reminderInfo} = mainForm;

        if(page === reminderInfo.pages) return;

        const pageNumber = page + 1;

        loadReminders(pageNumber);
    }

    const deleteReminder = async (id) => {
        try {
            await api.delete(`/reminders/${id}`);
            window.location.reload(false);
        } catch (err) {
            setMainForm({
                ...mainForm,
                error: err
            });
        }
    };

    const {reminders, page, reminderInfo} = mainForm;

    return (
        <div className="reminder-list" data-testid="main-list">
            <div className="button-insert" data-testid="main-button-insert">
                <Link to={'/reminders/new-reminder'}>Insert New Reminder</Link>
            </div>
            {reminders.map(reminder => (
                <article key={reminder._id}>
                    <strong>{reminder.title}</strong>
                    <p>{reminder.description}</p>

                    <div id="actions-button" data-testid="main-actions-button">
                        <Link to={`/reminders/${reminder._id}`} data-testid="main-link-to-reminder">Access</Link>
                        <button id="delete-button" onClick={(e) => deleteReminder(reminder._id)}
                                key={reminder._id} data-testid="main-button-delete-reminder">Delete</button>
                    </div>
                </article>
            ))}

            <div className="actions">
                <button data-testid="main-previous" disabled={page ===1} onClick={prevPage}>Previous</button>
                <button data-testid="main-next" disabled={page === reminderInfo.pages} onClick={nextPage}>Next</button>
            </div>
        </div>
    );
}

export default Main;