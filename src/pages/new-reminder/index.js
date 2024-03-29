import React, {useState} from 'react';
import api from '../../services/api';
import { getUserId } from "../../services/auth";
import './styles.scss';
import "react-widgets/styles.css";
import {useHistory} from "react-router-dom";
import {DropdownList} from "react-widgets/cjs";

export default function NewReminder () {
    let frequency = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    // const [value, setValue] = useState('Daily')
    const history = useHistory();

    const [newReminderForm, setNewReminderForm] = useState({
        error: "",
        title: "",
        description: "",
        period: "Daily",
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
            window.location.reload();
          } catch (err) {
              setNewReminderForm({
                  ...newReminderForm,
                  error: err
              });
          }
        }
      };
    
        return (
            <form onSubmit={createReminder} data-testid="new-reminder-form">
            <div className="reminder-info" data-testid="new-reminder-info">
                <h1>New Reminder</h1>
                {newReminderForm.error &&
                    <p data-testid="new-reminder-error-msg" id="error-msg">{newReminderForm.error}</p>
                }
                <br></br>
                <p><strong>Title: </strong>
                    <input
                        data-testid="new-reminder-title"
                        type="text" 
                        placeholder="Type the title here..."
                        onChange={e => setNewReminderForm({ ...newReminderForm, title: e.target.value })}
                    ></input>
                </p>
                <p><strong>Description: </strong>
                    <textarea
                        data-testid="new-reminder-text-area"
                        placeholder="Type a description here..."
                        onChange={e => setNewReminderForm({ ...newReminderForm, description: e.target.value })}
                    ></textarea>
                </p>
                <p><strong>Frequency: </strong></p>
                <DropdownList
                    data-testid="new-reminder-period"
                    value={newReminderForm.period}
                    onChange={value => setNewReminderForm({ ...newReminderForm, period: value })}
                    data={frequency}
                />
                <p><strong>Hour of Day: </strong>
                    <input
                        data-testid="new-reminder-hour"
                        type="time" 
                        onChange={e => setNewReminderForm({ ...newReminderForm, hour: e.target.value })}
                    ></input>
                </p>
                <button type="submit">Create</button>
            </div>
            </form>
        );
}