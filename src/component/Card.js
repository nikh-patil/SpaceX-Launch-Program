
import React from 'react';
function Card(props) {
    return (
        <div className="flex-container">
            {
                props.spaceXdata.map((eachMission, id) =>
                    <div className="card" key={id}>
                        <div className="img">
                            <img src={eachMission.links.mission_patch_small} alt="Logo" width="200" />
                        </div>
                        <h4 className="mission-name">{eachMission.mission_name + " #" + eachMission.flight_number}</h4>
                        <div className="info">
                            <div className="wrap">
                                <span className="head-key">Mission Ids: </span>
                                <ul>
                                    {eachMission.mission_id.map((eachId, key) =>
                                        <li key={key} className="head-value">{eachId}</li>)
                                    }
                                </ul>
                            </div>
                            <div className="wrap">
                                <span className="head-key">Launch Year:</span>
                                <span className="head-value">{eachMission.launch_year}</span>
                            </div>
                            <div className="wrap">
                                <span className="head-key">Successful Launch: </span>
                                <span className="head-value">{eachMission.launch_success ? eachMission.launch_success.toString() : 'status not available'}</span>
                            </div>
                            <div className="wrap">
                                <span className="head-key">Successful Land: </span>
                                <span className="head-value">{eachMission.launch_success ? eachMission.launch_success.toString() : 'status not available'}</span>
                            </div>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default Card; 