import React, {useEffect, useState} from 'react';
import api from '../../services/api';

import './styles.css';
import {useParams} from "react-router-dom";

export default function Reminder () {
    const params = useParams();

    const [reminderData, setReminderData] = useState({
        reminder: {}
    });

    useEffect(  () => {
        async function fetchData() {
            const response = await api.get(`reminders/${params.id}`);
            setReminderData({...reminderData, reminder: response.data});
        }
        fetchData();
        // return () => {
        //     setReminderData({reminder: {}});
        // }
    // }, [params.id, reminderData]);
    }, []);

    const {reminder} = reminderData;

    return (
        <div className="reminder-info" data-testid="reminder-info">
            <h1 data-testid="reminder-title">{reminder.title}</h1>
            <p data-testid="reminder-description">{reminder.description}</p>
            <p data-testid="reminder-createdAt"><strong>Created At:</strong> {reminder.createdAt}</p>
            <p data-testid="reminder-period"><strong>Period: </strong>{reminder.period}</p>
        </div>
    );
}