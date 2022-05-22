import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";

import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
 
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("hello i am comstructor");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} News24Live`;
  }
  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=18`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(70);
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }
  handleonprev = async () => {
    console.log("clicked on previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page - 1
    }&pageSize=18`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);

    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
  };
  handleonnext = async () => {
    console.log("clicked on next");
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 19)) {
    } else {
      let url = ` https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=${this.props.apikey}&page=${
        this.state.page + 1
      }&pageSize=18`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      console.log(parsedata);

      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
      });
    }
  };
  fetchMoreData = async () => {
    let url = ` https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=18`;
    
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);

    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedata.articles),
      
    });
  };

  render() {
    return (
      <>
        {this.state.loading && <Spinner />}
        <h1 className="text-center" style={{ marginTop:"90px" }}>
          NewsWala Top Headlines from {" "}
          {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
        <div className="container my-3">
          
            <div className="row my-3">
              {!this.state.loading &&
                this.state.articles.map((elements) => {
                  return (
                    <div className="col-md-4" key={elements.url}>
                      <Newsitems
                        title={elements.title.slice(0, 45)}
                        published={elements.publishedAt}
                        description={elements.content}
                        urlToImage={elements.urlToImage}
                        newsUrl={elements.url}
                        source={elements.source.name}
                      />
                    </div>
                  );
                })}
            </div>
        </div>
          </InfiniteScroll>

        {/*  Code of button */}

        {/* <div className="container d-flex justify-content-between my-3">
         <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleonprev}>Previous</button>
         <button type="button" className="btn btn-dark" onClick={this.handleonnext}>Next</button>
         </div> */}

        {/* <div className="row my-4">
        <div className="col-md-4">
          <Newsitems title="myTitle" description="myDesc" />
        </div>
        <div className="col-md-4">
          <Newsitems title="myTitle" description="myDesc" />
        </div>
        <div className="col-md-4">
          <Newsitems title="myTitle" description="myDesc" />
        </div>
        </div> */}
      </>
    );
  }
}


