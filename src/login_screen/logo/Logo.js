import './Logo.css'


function Logo(){
    return (
        <div>
            <div id={"logo"} className="row logo">
                <div className="col-2"></div>
                <div className="col-2 fw-bolder text-primary ">foobar_DT</div>
            </div>
            <div className="row logo">
                <div className="col-2"></div>
                <div className="col-4 fs-3">Foobar_DT helps you connect and share with the people in your life.
                </div>
            </div>
        </div>
    );
}

export default Logo;
