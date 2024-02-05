import React from "react";

let imgRef;

function Image({img,setImg}) {

    imgRef = React.useRef(null);

    return (
        <>
            <label className="form-label" htmlFor="imgFile">Default file input example</label>
            <input type="file" className="form-control" id="imgFile" required ref={imgRef}
                   onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))}></input>
            <img src={img} className="rounded m-t-10px" alt=""></img>
        </>
    );
}

export function updateValuesImage(img) {
    imgRef.current.value = img;
}

export default Image;