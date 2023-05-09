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
    const [isLoading, setIsLoading] = useState(false);
    const handleRunModel = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowOutput(true);
        }, 5000);
    };






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
                            <button onClick={handleRunModel}>
                                {isLoading ? 'Loading...' : 'Run Model'}
                            </button>
                        </div>

                    </div>


            
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Score</h3>
                        </div>
        
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Feature Importance</h3>
                        </div>

                    </div>
                </TabPanel>
                <TabPanel>
                    <div className="panel-content">
                        <div className="section_heading">
                            <h3>Cohort Report</h3>
                        </div>
                        
                    </div>
                </TabPanel>

            </Tabs>

            {isLoading && (
                <div className="loading_section">

                    {
                        data.length === 0 ? (
                            <div>
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