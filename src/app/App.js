import Logo from "../login_screen/logo/Logo";
import LoginBox from "../login_screen/login_box/LoginBox";


function App() {

    const members =[{
        "firstName":"a",
        "lastName":"aa",
        "email":"zxc",
        "password":"zz",
        "day":"1",
        "month":"2",
        "year":"2024",
        "gender":"M"
    }, {
        "firstName": "q",
        "lastName": "qq",
        "email": "qwe",
        "password": "ww",
        "day": "11",
        "month": "3",
        "year": "2022",
        "gender": "F"
    }]
    console.log(members)
    return (
        <form className="container-fluid  g-3 needs-validation" noValidate id="loginForm">
            <Logo />
            <div className="row">
                <div className="col-7"></div>
                <LoginBox loginMembers={members}/>
            </div>
        </form>
    );
}

export default App;
