import './Gender.css'

function Gender({member,setGender}) {
    return (
        <div>
            <p className=" mini m-t-15px">Gender</p>
            <div className="row ">
                <div className="form-check border rounded col-5 border-secondary-subtle">
                    <input className="form-check-input border-secondary-subtle"
                           type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked={true}
                            value={"M"} onChange={(e) => setGender(e.target.value)}></input>
                    <label className="form-check-label "
                           htmlFor="flexRadioDefault1">
                        Male
                    </label>
                </div>
                <div className="col-1"></div>
                <div className="form-check border rounded col-5 border-secondary-subtle">
                    <input className="form-check-input border-secondary-subtle"
                           type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={"F"}
                           onChange={(e) => setGender(e.target.value)}></input>
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Female
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Gender;