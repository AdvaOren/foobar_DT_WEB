import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginBox from "./LoginBox";


//The test is testing the login screen and check if it recognizes that the user is exists in the system
test('check if user exists', () => {
    const members = [
        {
            "firstName": "testF",
            "lastName": "testL",
            "email": "test",
            "password": "test123",
            "date": "2000-10-05",
            "gender": "M",
            "img":""
        }
    ];
    const logSpy = jest.spyOn(console, 'log');
    render(<LoginBox loginMembers={members}/>);
    fireEvent.change(screen.getByPlaceholderText("Password"),{target: {value: 'test123'}});
    fireEvent.change(screen.getByPlaceholderText("Email address or phone number"),{target: {value: 'test'}});
    fireEvent.click(screen.getByText("Log in"))
    expect(logSpy).toHaveBeenCalledWith('exists');
});