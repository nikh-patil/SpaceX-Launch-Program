import React from 'react';
import './App.css';
import Card from "./component/Card"
import Loader from 'react-loader-spinner'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      spaceXdata: [],
      launchYear: false,
      successLaunch: false,
      successLand: false,
      uniqueYear: [],
      showGloabalLoader: true,
    }
  }
  componentDidMount() {
    this.fetchData().then((finalResult) => {
      this.setState({ uniqueYear: finalResult.map(eachRes => eachRes.launch_year), showGloabalLoader: false })
    })

  }
  //all API calls
  fetchData = () => {
    this.setState({ showLoader: true })
    let urlString = "https://api.spacexdata.com/v3/launches?limit=100"
    if (this.state.launchYear !== false) {
      urlString += "&launch_year=" + this.state.launchYear
    }
    if (this.state.successLand !== false) {
      urlString += "&success_land=" + this.state.successLand
    }
    if (this.state.successLaunch !== false) {
      urlString += "&success_launch=" + this.state.successLaunch
    }
    let result = fetch(urlString)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            spaceXdata: result,
          });
          return result;
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    return result
  }
  handleClick = (filter, value) => {
    if (filter === "year") {
      this.setState({ launchYear: value, showLocalLoader: true },
        () => this.fetchData())
    } else if (filter === "success_launch") {
      this.setState({ successLaunch: value, showLocalLoader: true },
        () => this.fetchData())
    } else if (filter === "success_land") {
      this.setState({ successLand: value, showLocalLoader: true },
        () => this.fetchData())
    }
  }
  filterLaunchYear = (spaceXdata) => {
    return spaceXdata.map(eachRes => eachRes.launch_year)
  }
  render() {
    const { spaceXdata, successLand, successLaunch, launchYear, uniqueYear, showGloabalLoader} = this.state
    return (
      <div>
        <header>
          <h2 className="app-title">SpaceX Launch Program</h2>
        </header>
        {/* filter section */}
        {!showGloabalLoader ? <div className="container">
          <div className="filter">
            <span className="filter-title">Filters</span>
            <div className="filterHeader">Launch Year</div>
            <hr></hr>
            <div className="btn-wrap">
              {
                uniqueYear.filter((item, pos) => { return uniqueYear.indexOf(item) === pos }).map((eachYear, index) =>
                  <button className={launchYear !== eachYear ? "btn" : "btnClick"} type="button" key={eachYear} onClick={() => this.handleClick('year', eachYear)}>{eachYear}</button>)
              }
            </div>
            <br />
            <div className="filterHeader">Successful Launch</div>
            <hr></hr>
            <div className="btn-wrap">
              <button className={successLaunch !== 'true' ? "btn" : "btnClick"} type="button" onClick={() => this.handleClick('success_launch', 'true')}>True</button>
              <button className={successLaunch !== 'false' ? "btn" : "btnClick"} type="button" onClick={() => this.handleClick('success_launch', 'false')}>False</button>
            </div>
            <br />
            <div className="filterHeader">Successful Landing</div>
            <hr></hr>
            <div className="btn-wrap">
              <button className={successLand !== 'true' ? "btn" : "btnClick"} type="button" onClick={() => this.handleClick('success_land', 'true')}>True</button>
              <button className={successLand !== 'false' ? "btn" : "btnClick"} type="button" onClick={() => this.handleClick('success_land', 'false')}>False</button>
            </div>
          </div>
          {/* Record section */}
          <div className="product">
            <Card spaceXdata={spaceXdata} />
          </div>

        </div> :
          <Loader type="Circles" color="#00BFFF" className="spinner" height={100} width={100} />}
      </div>
    )
  }
}

export default App;
