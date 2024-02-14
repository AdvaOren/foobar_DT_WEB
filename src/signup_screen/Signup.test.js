import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Signup from "./Signup";
import LoginBox from "../login_screen/login_box/LoginBox";
import {checkPassword, isDateValid} from './Signup'

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

test('check function checkPassword()', () => {
    expect(checkPassword("aaaaaa!Q")).toBeTruthy();
    expect(checkPassword("aaaa!@aa!Q")).toBeTruthy();
    expect(checkPassword("aaaaASDaa!Q")).toBeTruthy();
    expect(checkPassword("aaZXCa&Q")).toBeTruthy();
    expect(checkPassword("aaaaaa!Q")).toBeTruthy();
    expect(checkPassword("aaaaaa!Q")).toBeTruthy();
    expect(checkPassword("aaaaaa!Q")).toBeTruthy();
    expect(checkPassword("aaaaaa88!Q")).toBeTruthy();
    expect(checkPassword("nnbvcaaaaa88!Q")).toBeTruthy();


    expect(checkPassword("oa")).toBeFalsy()
    expect(checkPassword("1")).toBeFalsy()
    expect(checkPassword("")).toBeFalsy()
    expect(checkPassword("11111111")).toBeFalsy()
    expect(checkPassword("aaaaaaaa")).toBeFalsy()
    expect(checkPassword("2a2a2a2a")).toBeFalsy()
    expect(checkPassword("aaaaaaa!")).toBeFalsy()
    expect(checkPassword("aaaaaaaA")).toBeFalsy()
});

test('check function isDateValid()', () => {
    expect(isDateValid("1997-12-05")).toBeTruthy()
    expect(isDateValid("1998-12-30")).toBeTruthy()
    expect(isDateValid("2020-01-19")).toBeTruthy()
    expect(isDateValid("1997-02-18")).toBeTruthy()
    expect(isDateValid("1997-03-17")).toBeTruthy()
    expect(isDateValid("1997-04-12")).toBeTruthy()

    expect(isDateValid("10001205")).toBeFalsy()
    expect(isDateValid("1980a1405")).toBeFalsy()
    expect(isDateValid("1997125")).toBeFalsy()
    expect(isDateValid("1997-12-32")).toBeFalsy()
});