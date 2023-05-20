import React from 'react'
import { CohortData } from '../Data/CohortData';

const CohortReportPage = () => {
    return (
        <>

            <div className="right_content">
                <div className="panel-content">
                    <div className="section_content">

                        <div className="section_heading">
                            <h3>Cohort Report</h3>
                        </div>
                        {/* <label>Select top K Features</label>
                    <select>
                        <option value="">Select Option</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select> */}

                        <table className='item_table'>
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
                </div>
            </div>
        </>
    )
}

export default CohortReportPage