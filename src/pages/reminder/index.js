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
    }, [params.id, reminderData]);

    const {reminder} = reminderData;

    return (
        <div className="reminder-info">
            <h1>{reminder.title}</h1>
            <p>{reminder.description}</p>
            <p><strong>Created At:</strong> {reminder.createdAt}</p>
            <p><strong>Period: </strong>{reminder.period}</p>
        </div>
    );
}