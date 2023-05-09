import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Papa from 'papaparse';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Plot from 'react-plotly.js';
import { feature_importance_data } from '../Data/feature_importance_data';
import { CohortData } from '../Data/CohortData';



const Dashboard = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [data, setData] = useState([]);

    const [showOutput, setShowOutput] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleRunModel = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowOutput(true);
            // setShouldRedirect(true);
        }, 5000);
    };


    useEffect(() => {
        if (csvFile) {
            Papa.parse(csvFile, {
                header: true,
                download: true,
                complete: function (results) {
                    setData(results.data);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    }, [csvFile]);

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    }


    const MyMarkers = () => {
        return data.map((item, index) => (
            <Circle
                key={index}
                center={[item.Latitude, item.Longitude]}
                fillColor="red"
                radius={2000}
                color="red"
                opacity={1}
                interactive={false}
            >
            </Circle>
        ));
    }




    return (
        <div className='main_container'>

            <Tabs>
                <TabList>
                    <Tab>
                        <p>Input Dataset</p>
                    </Tab>
                    <Tab>
                        <p>Score </p>
                    </Tab>
                    <Tab>
                        <p>Feature Importance</p>
                    </Tab>
                    <Tab>
                        <p>Cohort Report</p>
                    </Tab>

                </TabList>



                <TabPanel>
                    <div className="input_para">
                        <div className="input_item">
                            <label>Upload the data file.</label>

                            <button class="fileUpload">
                                <label class="upload">
                                    <input type="file" onChange={handleFileChange} />
                                    Choose file
                                </label>
                            </button>




                        </div>




                        <div className="input_item">
                            <label>Select ML Model: </label>
                            <select>
                                <option value="">Select Option</option>
                                <option value="">Option 1</option>
                                <option value="">Option 2</option>
                                <option value="">Option 3</option>
                            </select>


                        </div>



                        <div className="">
                            <div className="input_item_btn">
                            <button onClick={handleRunModel}>
                                {isLoading ? 'Loading...' : 'Run Model'}
                            </button>

                            </div>
                        
                        </div>

                    </div>


                    <div className="map_container">
                        <MapContainer
                            center={[20.5937, 80]}
                            style={{ width: '100%', height: "80vh", backgroundColor: 'white', border: 'none', margin: 'auto' }}
                            zoom={4}
                            maxZoom={12}
                            // minZoom={4}
                            // maxBounds={[[8, 98], [38, 68]]}
                            attributionControl={false}
                            scrollWheelZoom={true}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                            />
                            {
                                data.length === 0 ? (
                                    <div>
                                        {/* <p>Upload the Data file to run the model.</p> */}
                                    </div>
                                ) : (
                                    <MyMarkers />
                                )}

                        </MapContainer>

                    </div>



                </TabPanel>


                <TabPanel>
                    {/* {shouldRedirect && ( */}
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Score</h3>
                        </div>

                        <label>Choose Matrix for Score: </label>

                        <select>
                            <option value="">Select Option</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>


                        <table id="score_table">
                            <tbody>
                                <tr>
                                    <td>Training Score</td>
                                    <td>123</td>

                                </tr>
                                <tr>
                                    <td>Testing Score</td>
                                    <td>123</td>

                                </tr>

                            </tbody>

                        </table>
                    </div>
                    {/* )} */}
                </TabPanel>



                <TabPanel>
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Feature Importance</h3>
                        </div>


                        <Plot
                            data={[{ type: 'bar', x: feature_importance_data.map(item => item.Value), y: feature_importance_data.map(item => item.Feature_Name), orientation: 'h', marker: { color: 'red' }, },]}
                            layout={{
                                title: 'Feature Importance', yaxis: {
                                    automargin: true
                                }
                            }}
                            style={{ width: "100%", height: "500px" }}

                        />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Cohort Report</h3>
                        </div>


                        <label>Select top K Features</label>

                        <select>
                            <option value="">Select Option</option>
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
                        </select>



                        <table id="cohort_table">
                            <thead>
                                <tr>
                                    <th>Market Share</th>
                                    <th>Cohort-1</th>
                                    <th>Cohort-2</th>
                                    <th>Cohort-3</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CohortData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item["Market Share"]}</td>
                                            <td>{item["Cohort-1"]}</td>
                                            <td>{item["Cohort-2"]}</td>
                                            <td>{item["Cohort-3"]}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>
                </TabPanel>

            </Tabs>









            {isLoading && (
                <div className="loading_section">

                    {
                        data.length === 0 ? (
                            <div >
                                <div class="error_msg">
                                    <p>Please upload the file.</p>
                                </div>

                            </div>
                        ) : (
                            <div class="simple-spinner">
                                <span></span>
                            </div>
                        )}

                </div>
            )}










        </div>
    )
}

export default Dashboard