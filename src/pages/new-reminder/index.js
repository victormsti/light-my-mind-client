import React, {Component} from 'react';
import api from '../../services/api';
import { getUserId } from "../../services/auth";
import './styles.css';

export default class Reminder extends Component{
    state = {
        error: "",
        title: "",
        description: "",
        period: "",
        hour: "",
        userId: getUserId()
    }

    createReminder = async e => {
        e.preventDefault();
        const { title, description, period, hour, userId } = this.state;
        if (!title || !description || !period || !hour) {
          this.setState({ error: "Fill all inputs to create a new reminder" });
        } else {
          try {
            await api.post("/reminders", { title, description,
            period, hour, userId });
            this.props.history.push("/main");
            window.location.reload(false);
          } catch (err) {
            this.setState({
              error:
                err
            });
          }
        }
      };
    
    render(){
        return (
            <form onSubmit={this.createReminder}>
            <div className="reminder-info">
                <h1>New Reminder</h1>
                {this.state.error && <p id="error-msg">{this.state.error}</p>}
                <br></br>
                <p><strong>Title: </strong>
                    <input
                        type="text" 
                        placeholder="Type the title here..."
                        onChange={e => this.setState({ title: e.target.value })}
                    ></input>
                </p>
                <p><strong>Description: </strong>
                    <textarea 
                        placeholder="Type a description here..."
                        onChange={e => this.setState({ description: e.target.value })}
                    ></textarea>
                </p>
                <p><strong>Period: </strong> 
                    <input 
                        type="text" 
                        placeholder="Daily"
                        onChange={e => this.setState({ period: e.target.value })}
                    ></input>
                </p>
                <p><strong>Hour of Day: </strong> 
                    <input 
                        type="time" 
                        onChange={e => this.setState({ hour: e.target.value })}
                    ></input>
                </p>
                <button type="submit">Create</button>
            </div>
            </form>
        );
    }
}