import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import Papa from 'papaparse';

const center = [20.5937, 80];


const MapDashboard = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [data, setData] = useState([]);

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
                color="red"
                opacity={1}
                interactive={false}
            >
            </Circle>
        ));
    }

    const renderMap = () => {
        if (data.length === 0) {
            return
            <div>
                {/* Loading... */}
            </div>;
        }
        return (
            <MapContainer
                center={center}
                style={{ width: '100%', height: "70vh", backgroundColor: 'white', border: 'none', margin: 'auto' }}
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
                <MyMarkers />
            </MapContainer>
        );
    }

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
                        <option value="">Training Score</option>
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
                        <option value="">Training Score</option>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select>

                </div>
            </div>

            <div className="map_container">

                <div className="map_container">
                    {renderMap()}
                </div>

            </div>
        </div>
    )
}

export default MapDashboard