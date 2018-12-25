import React from "react";
import $ from "jquery";

const colorPalette = [
  "#11AD9D",
  "#003B36",
  "#ECE5F0",
  "#59114D",
  "#FFA230",
  "#875053",
  "#D2BF55",
  "#514C44",
  "#403A6D",
  "#FBBFCA",
  "#0B3C49",
  "#C2E812",
  "#91F5AD",
  "#94B0DA",
  "#684551",
  "#B74F6F",
  "#ADBDFF",
  "#646B66",
  "#34E5FF",
  "#9CAEA9"
];

class QuoteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: ""
    };
    this.fetchData = this.fetchData.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.changeHref = this.changeHref.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    document.body.style.backgroundColor = "#B4B8AB";
    if (this.mounted) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
    this.mounted = false;
  }

  changeColor() {
    var colorChoice = Math.floor(Math.random() * colorPalette.length);
    console.log(colorChoice);
    setTimeout(
      () =>
        (document.body.style = "background-color:" + colorPalette[colorChoice]),
      1000
    );
  }
  //making external API call to forismtic for quote and authot. Make sure to have proxy appended to prevent no cors error
  fetchData() {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    )
      .then(Response => Response.json())
      .then(data =>
        this.setState({
          quote: data.quoteText,
          author: data.quoteAuthor
        })
      )
      .catch(error => console.log(error));
    this.changeColor();
  }
  //changing twitter link upon click
  changeHref() {
    $("#tweet-quote").attr(
      "href",
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
        encodeURIComponent('"' + this.state.quote + '" ' + this.state.author)
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-10 mx-auto d-flex flex-column justify-content-center">
          <div className="card rounded shadow" id="quote-box">
            <div className="card-body">
              <h2 className="card-title" id="text">
                <q>
                  {this.state.quote ? this.state.quote : "Please try again:)"}
                </q>
              </h2>
              <h5 className="card-subtitle text-right" id="author">
                - {this.state.author ? this.state.author : "unknown"}
              </h5>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-primary float-right"
                id="new-quote"
                onClick={this.fetchData}
              >
                New Quote
              </button>
              <a
                href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
                target="_blank"
                className="btn btn-info float-left rounded"
                id="tweet-quote"
                onClick={this.changeHref}
              >
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>
          <p className="text-center mt-2 mb-0 creation">by Kevin.G</p>
          <p className="text-center creation">Powered using forismatic API</p>
        </div>
      </div>
    );
  }
}

export default QuoteGenerator;
