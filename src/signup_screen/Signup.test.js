import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Signup from "./Signup";
import LoginBox from "../login_screen/login_box/LoginBox";

//The function check that the user succeed to add new user to the system
test('add user', () => {
    const members = [];
    const logSpy = jest.spyOn(console, 'log');
    global.URL.createObjectURL = jest.fn();
    render(<Signup loginMembers={members}/>);
    fireEvent.change(screen.getByPlaceholderText("First name"),{target: {value: 'nameF'}});
    fireEvent.change(screen.getByPlaceholderText("Last name"),{target: {value: 'nameL'}});
    fireEvent.change(screen.getByPlaceholderText("Mobile number or email address"),{target: {value: 'email'}});
    fireEvent.change(screen.getByPlaceholderText("password"),{target: {value: 'asdasd!Q'}});
    fireEvent.change(screen.getByPlaceholderText("password verification"),{target: {value: 'asdasd!Q'}});
    fireEvent.change(screen.getByDisplayValue("Day"),{target: {value: '15'}});
    fireEvent.change(screen.getByDisplayValue("Month"),{target: {value: '5'}});
    fireEvent.change(screen.getByDisplayValue("Year"),{target: {value: '2000'}});
    fireEvent.change(screen.getByTitle("img-input"),{target: {files: ['C:\\','']}});
    fireEvent.click(screen.getByTitle("submit-btn"));
    expect(logSpy).toHaveBeenCalledWith('add new member');
});


//The function check that the user succeed to add new user to the system and then to do log in
test('check login and signup compatibility', () => {
    const members = [];
    const logSpy = jest.spyOn(console, 'log');
    global.URL.createObjectURL = jest.fn();
    render(<Signup loginMembers={members}/>);
    fireEvent.change(screen.getByPlaceholderText("First name"),{target: {value: 'nameF'}});
    fireEvent.change(screen.getByPlaceholderText("Last name"),{target: {value: 'nameL'}});
    fireEvent.change(screen.getByPlaceholderText("Mobile number or email address"),{target: {value: 'email'}});
    fireEvent.change(screen.getByPlaceholderText("password"),{target: {value: 'asdasd!Q'}});
    fireEvent.change(screen.getByPlaceholderText("password verification"),{target: {value: 'asdasd!Q'}});
    fireEvent.change(screen.getByDisplayValue("Day"),{target: {value: '15'}});
    fireEvent.change(screen.getByDisplayValue("Month"),{target: {value: '5'}});
    fireEvent.change(screen.getByDisplayValue("Year"),{target: {value: '2000'}});
    fireEvent.change(screen.getByTitle("img-input"),{target: {files: ['C:\\','']}});
    fireEvent.click(screen.getByTitle("submit-btn"));

    render(<LoginBox loginMembers={members}/>);
    fireEvent.change(screen.getByPlaceholderText("Password"),{target: {value: 'asdasd!Q'}});
    fireEvent.change(screen.getByPlaceholderText("Email address or phone number"),{target: {value: 'email'}});
    fireEvent.click(screen.getByText("Log in"))
    expect(logSpy).toHaveBeenCalledWith('exists');
});