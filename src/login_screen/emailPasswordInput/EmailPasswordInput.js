import './EmailPasswordInput.css'

function EmailPasswordInput(){
    return (
        <>
            <div className="row m-t-15px ">
                <label htmlFor="validationCustom01" className="form-label"></label>
                <input type="text" className="form-control input-lg" id="validationCustom01"
                       placeholder="Email address or phone number" required></input>
                <div className="valid-feedback"></div>
            </div>
            <div className="row  m-t-0">
                <label htmlFor="validationCustom01" className="form-label"></label>
                <input type="password" className="form-control input-lg" id="validationCustom02"
                       placeholder="password" required></input>
                <div className="valid-feedback"></div>
            </div>
        </>
    );
}

export default EmailPasswordInput;