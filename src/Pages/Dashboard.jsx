import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Plot from 'react-plotly.js';



const Dashboard = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (event) => {
        setCsvFile(event.target.files[0]);
    }

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





    return (
        <div className='main_container'>
            <div className="input_para">
                <div className="input_item">
                    <p>Upload the data file.</p>
                    <input type='file' className='' placeholder='Upload File' onChange={handleFileChange} />
                </div>

                <div className="input_item">
                    <div className="container_heading">
                        <p>Choose Matrix for Score</p>
                    </div>
                    <select>
                        <option value="">Select</option>
                        <option value="">Training Score</option>
                        <option value="">Testing Score</option>
                    </select>
                </div>

                <div className="input_item">
                    <div className="container_heading">
                        <p>Select ML model</p>
                    </div>
                    <select>
                        <option value="">Select</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select>

                </div>

                <div className="input_item">
                    <div className="container_heading">
                        <p>Select top K Features</p>
                    </div>
                    <select>
                        <option value="">Select</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>

                    </select>

                </div>
            </div>


            <div className="output_data">
                <div className="output_item">
                    <div className="section_heading">
                        <h3>Score</h3>
                    </div>

                </div>

                <div className="output_item">
                    <div className="section_heading">
                        <h3>Feature Importance</h3>
                    </div>
                    <Plot
                        data={[
                            {
                                type: 'bar',
                                x:
                                [
                                    0.010566373,
                                    0.011203987,
                                    0.01162933,
                                    0.012132097
                                ], 
                                y: [
                                    "Kentrix >> Two_Wheeler_3 >> Yes",
                                    "Kentrix >> Two_Wheeler_6 >> Yes",
                                    "Kentrix >> Two_Wheeler_5 >> Yes",
                                    "Kentrix >> Income >> 06: Very Good Inr 1,70,000 – 2,30,000"
                                ],
                                orientation: 'h'
                            },
                        ]}
                        layout={{ width: "100%", height: "500px", title: 'Feature Importance' }}
                    />



                </div>

                <div className="output_item">
                    <div className="section_heading">
                        <h3>Cohort Report</h3>
                    </div>


                </div>
            </div>


        </div>
    )
}

export default Dashboard