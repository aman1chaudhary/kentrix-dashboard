import React from "react";
import Plot from "react-plotly.js";
import ClassificationReport from "../components/ClassificationReport";

const ScorePage = ({ processedData }) => {
  const data = [[2, 0], [0, 1]]

  return (
    <>
      <div className="right_content">
        <div className="panel-content">
          <div className="section_content">
            <div className="section_heading">
              <h3>Model Score</h3>
            </div>
            <table className="item_table">
              <tbody>
                <tr>
                  <td>Training Score</td>
                  <td>
                    {processedData ? (
                      <>{processedData.training_score}</>
                    ) : (
                      "Null"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Testing Score</td>
                  <td>
                    {processedData ? (
                      <>{processedData.testing_score}</>
                    ) : (
                      "Null"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="section_content">
            <div className="section_heading">
              <h3>Accuracy score v/s Threshold values</h3>
            </div>
            {processedData ? (
              <Plot
                data={[
                  {
                    type: "bar",
                    x: processedData.threshold_values,
                    y: processedData.accuracy_score_values,
                    orientation: "v",
                    marker: { color: "#91d9fa" },
                  },
                ]}
                layout={{
                  // title: 'accuracy_score v/s threshold_values',
                  xaxis: { title: "Threshold Values" },
                  yaxis: { title: "Accuracy Score" },
                  margin: { t: 30 },
                }}
                style={{ width: "75vw", height: "500px", marginTop:"20px" }}
              />
            ) : (
              <p>Null</p>
            )}
          </div>

          <div className="section_content">
            <div className="section_heading">
              <h3>Classification Report (Train)</h3>
            </div>
            {processedData ? (
              <ClassificationReport
                report={processedData.classification_report_train}
              />
            ) : (
              <p>Null</p>
            )}
          </div>

          <div className="section_content">
            <div className="section_heading">
              <h3>Classification Report (Test)</h3>
            </div>
            {processedData ? (
              <ClassificationReport
                report={processedData.classification_report_test}
              />
            ) : (
              <p>Null</p>
            )}
          </div>

          <div className="section_content">
            <div className="section_heading">
              <h3>Confusion Matrix</h3>
            </div>
            {processedData ? (
              <Plot
              data={[
                {
                  z: data,
                  type: 'heatmap',
                  colorscale: 'Blues' // You can change the colorscale as per your preference
                }
              ]}
              layout={{
                title: 'Confusion Matrix'
              }}
              style={{ width: "75vw", height: "500px", marginTop:"20px" }}
            />
            ) : (
              <p>Null</p>
            )}
          </div>


          


        </div>
      </div>
    </>
  );
};

export default ScorePage;
