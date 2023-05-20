import React from 'react'
import Plot from 'react-plotly.js';

const FeatureImportancePage = ({ processedData }) => {
    return (
        <>
            <div className="right_content">
                <div className="panel-content">
                    <div className="section_content">
                        <div className="section_heading">
                            <h3>Feature Importance</h3>
                        </div>

                        {processedData ? (
                            <>
                                <Plot
                                    data={[{
                                        type: 'bar', x: processedData.feature_Importance_Y
                                        , y: processedData.feature_Importance_X,
                                        orientation: 'h', marker: { color: '#91d9fa' },
                                    },]}
                                    layout={{
                                        title: 'Feature Importance', yaxis: {
                                            automargin: true
                                        }
                                    }}
                                    style={{ width: "75vw", height: "500px" }}

                                />
                            </>
                        ) : (
                            <p>Null</p>
                        )}

                    </div>

                </div>
            </div>
        </>
    )
}

export default FeatureImportancePage