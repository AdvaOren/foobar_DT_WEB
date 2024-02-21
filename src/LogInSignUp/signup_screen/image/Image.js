import React from "react";

let imgInputRef;
let imgRef;

function Image({img,setImg}) {
    imgInputRef = React.useRef(null);
    imgRef = React.useRef();

    return (
        <>
            <label className="form-label" htmlFor="imgFile">Default file input example</label>
            <input type="file" className="form-control" id="imgFile" required ref={imgInputRef} title="img-input"
                   onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}></input>
            <img src={img} className="rounded m-t-10px signup-img" alt="" ref={imgRef}></img>
        </>
    );
}

/** The function update the input img and the img
 * Input: the new values for the input img and the img
 */
export function updateValuesImage(imgU) {
    imgInputRef.current.value = imgU;
    imgRef.current.src = imgU;
}

export default Image;