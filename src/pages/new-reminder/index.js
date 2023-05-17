import React, {useState} from 'react';
import api from '../../services/api';
import { getUserId } from "../../services/auth";
import './styles.css';
import {useHistory} from "react-router-dom";

export default function Reminder () {
    const history = useHistory();

    const [newReminderForm, setNewReminderForm] = useState({
        error: "",
        title: "",
        description: "",
        period: "",
        hour: "",
        userId: getUserId()
    });

    const createReminder = async e => {
        e.preventDefault();
        const { title, description, period, hour, userId } = newReminderForm;
        if (!title || !description || !period || !hour) {
          setNewReminderForm({ ...newReminderForm, error: "Fill all inputs to create a new reminder" });
        } else {
          try {
            await api.post("/reminders", { title, description,
            period, hour, userId });
            history.push("/main");
            window.location.reload(false);
          } catch (err) {
              setNewReminderForm({
                  ...newReminderForm,
                  error: err
              });
          }
        }
      };
    
        return (
            <form onSubmit={createReminder}>
            <div className="reminder-info">
                <h1>New Reminder</h1>
                {newReminderForm.error && <p id="error-msg">{newReminderForm.error}</p>}
                <br></br>
                <p><strong>Title: </strong>
                    <input
                        type="text" 
                        placeholder="Type the title here..."
                        onChange={e => setNewReminderForm({ ...newReminderForm, title: e.target.value })}
                    ></input>
                </p>
                <p><strong>Description: </strong>
                    <textarea 
                        placeholder="Type a description here..."
                        onChange={e => setNewReminderForm({ ...newReminderForm, description: e.target.value })}
                    ></textarea>
                </p>
                <p><strong>Period: </strong> 
                    <input 
                        type="text" 
                        placeholder="Daily"
                        onChange={e => setNewReminderForm({ ...newReminderForm, period: e.target.value })}
                    ></input>
                </p>
                <p><strong>Hour of Day: </strong> 
                    <input 
                        type="time" 
                        onChange={e => setNewReminderForm({ ...newReminderForm, hour: e.target.value })}
                    ></input>
                </p>
                <button type="submit">Create</button>
            </div>
            </form>
        );
}