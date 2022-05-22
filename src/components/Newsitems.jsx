import React from "react";

const Newsitems=(props)=> {
  
    let { title, description, urlToImage, newsUrl, published,source } = props;
    return (
      <>
        <div>
          <div className="card my-3" style={{ width: "18rem" }}>
            <img src={urlToImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">
                {title}{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{left:"90",zIndex:"1"}}>
                  {source}
                </span>
              </h5>
              <p className="card-text">{description}</p>
              <p className="card-text">{new Date(published).toGMTString()}</p>
              <a href={newsUrl} target="__blank" className="btn btn-dark">
                Read More
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
export default Newsitems
