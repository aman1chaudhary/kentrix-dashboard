import React from 'react';

const ClassificationReport = ({report }) => {
  // Parse the report string and convert it into an array of objects
  const reportRows = report
    .trim() // Remove leading/trailing whitespace
    .split('\n') // Split into individual rows
    .map(row => row.trim().split(/\s+/)) // Split each row by whitespace
    .map(row => ({
      label: row[0],
      precision: row[1],
      recall: row[2],
      f1Score: row[3],
      support: row[4]
    }));

  return (
    <div>
      <table className='item_table'>
        <thead>
          <tr>
            <th>Label</th>
            <th>Precision</th>
            <th>Recall</th>
            <th>F1-Score</th>
            <th>Support</th>
          </tr>
        </thead>
        <tbody>
          {reportRows.map((row, index) => (
            <tr key={index}>
              <td>{row.label}</td>
              <td>{row.precision}</td>
              <td>{row.recall}</td>
              <td>{row.f1Score}</td>
              <td>{row.support}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassificationReport;
