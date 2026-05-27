import React from "react";

function Hero(){
    return(
        <div
      className="container text-center mb-5 mt-5"
      style={{ maxWidth: "1200px" }}
    >
      <div className="row align-items-center">
        
        <div className="col-4">
          <img
            src="images/mobile.png"
            className="img-fluid"
            alt="mobile"
            style={{
              height: "400px",
              width: "100%",
              objectFit: "contain"
            }}
          />
        </div>

        <div className="col-8">
           <img
            src="images/pc.png"
            className="img-fluid"
            alt="pc"
            style={{
              height: "400px",
              width: "100%",
              objectFit: "contain"
            }}
          />
        </div>

      </div>
    </div>
    );
}

export default Hero;