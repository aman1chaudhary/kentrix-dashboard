import React, { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import Papa from 'papaparse';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import ScorePage from './ScorePage';
import CohortReportPage from './CohortReportPage';
import FeatureImportancePage from './FeatureImportancePage';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { BACKEND_URL } from '../components/BackendURL';




const Dashboard = ({ user, setLoginUser }) => {
    const [data, setData] = useState([]);
    const [file, setFile] = useState(null);
    const [selectedVariants, setSelectedVariants] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [processedData, setProcessedData] = useState(null);


    const [showMenu, setShowMenu] = useState(false);
    const handleToggle = () => {
        setShowMenu(!showMenu);
    };

    const handleLinkClick = () => {
        window.scrollTo(0, 0);
        setShowMenu(false);
    };
    const handleLogout = () => {
        setLoginUser({});
        localStorage.removeItem('user');
    };



    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    // console.log(selectedVariants)
    const handleUpload = async () => {
        if (!file || selectedVariants.length === 0 || !selectedModel || !selectedCity) {
            // Show error message as an alert
            alert("Please fill all the required inputs.");
            return;
        }


        const formData = new FormData();
        formData.append('file', file);
        formData.append('variant', selectedVariants);
        formData.append('model', selectedModel);
        formData.append('city', selectedCity);

        try {
            const response = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const result = response.data.boolean_data;
            setProcessedData(result);

            setFile(null);
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 5000);
        } catch (error) {
            console.error(error);
        }
    };

    // console.log(processedData)

    useEffect(() => {
        if (file) {
            Papa.parse(file, {
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
    }, [file]);
    const uniqueVariants = [...new Set(data.map(item => item.variant))];
    const uniqueCities = [...new Set(data.map(item => item.City))];

    // Dropdown event handlers
    const handleVariantChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedVariants((prevSelectedVariants) => [...prevSelectedVariants, value]);
        } else {
            setSelectedVariants((prevSelectedVariants) =>
                prevSelectedVariants.filter((variant) => variant !== value)
            );
        }
    };

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };
    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div className='main_container'>
            <button className="navbar__toggle" onClick={handleToggle}>
                {showMenu ? <FaTimes /> : <FaBars />}
            </button>

            <Tabs forceRenderTabPanel={true} >
                <TabList className={`phone-nav ${showMenu ? 'show' : ''}`}>
                    <Tab onClick={handleLinkClick}>
                        <p>Input Dataset</p>
                    </Tab>
                    <Tab onClick={handleLinkClick}>
                        <p>Score </p>
                    </Tab>
                    <Tab onClick={handleLinkClick}>
                        <p>Feature Importance</p>
                    </Tab>
                    <Tab onClick={handleLinkClick}>
                        <p>Cohort Report</p>
                    </Tab>
                    <Tab onClick={handleLinkClick}>
                        <p  onClick={handleLogout}>Logout <FiLogOut/></p>
                    </Tab>
                </TabList>

                <TabPanel>
                    <>
                        <div className="right_content">
                            <div className="input_para">
                                <div className="input_item">
                                    <div className="mb-2">
                                        <input className="form-control" type="file" accept=".csv" onChange={handleFileChange} />
                                    </div>
                                </div>

                                <div className="dropdown input_item">
                                    <button className="input_btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select Variant
                                    </button>

                                    <div>
                                        {uniqueVariants.length ? (
                                            <ul className="dropdown-menu">
                                                {uniqueVariants.map((variant, index) => (
                                                    <li className="p-2" key={index}>
                                                        <input
                                                            type="checkbox"
                                                            name="variant"
                                                            value={variant}
                                                            checked={selectedVariants.includes(variant)}
                                                            onChange={handleVariantChange}
                                                        />
                                                        {variant}
                                                    </li>
                                                ))}
                                            </ul>

                                        ) : (
                                            <ul className="dropdown-menu">
                                                <li className="p-2">Please upload the data.</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="dropdown input_item">
                                    <button className="input_btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select ML Model:
                                    </button>

                                    <div>
                                        {uniqueVariants.length ? (
                                            <ul className="dropdown-menu">
                                                <li className='p-2'>
                                                    <input type="radio" name="model" value="model_randomForestClassifier" checked={selectedModel === 'model_randomForestClassifier'} onChange={handleModelChange}
                                                    />
                                                    Random Forest Classifier
                                                </li>
                                                <li className='p-2'>
                                                    <input type="radio" name="model" value="model_XGBClassifier" checked={selectedModel === 'model_XGBClassifier'} onChange={handleModelChange}
                                                    />
                                                    XGB Classifier
                                                </li>
                                            </ul>

                                        ) : (
                                            <ul className="dropdown-menu">
                                                <li className="p-2">Please upload the data.</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="dropdown input_item">
                                    <button className="input_btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Select City:
                                    </button>
                                    <div>
                                        {uniqueCities.length ? (
                                            <ul className="dropdown-menu">
                                                {uniqueCities.map((city, index) => (
                                                    <li className='p-2' key={index}>
                                                        <input
                                                            type="radio"
                                                            id={`city${index}`}
                                                            name="city"
                                                            value={city}
                                                            checked={selectedCity === city}
                                                            onChange={handleCityChange}
                                                        />
                                                        <label htmlFor={`city${index}`}>{city}</label>
                                                    </li>
                                                ))}
                                            </ul>

                                        ) : (
                                            <ul className="dropdown-menu">
                                                <li className="p-2">Please upload the data.</li>
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="input_item_btn input_item">
                                    <button onClick={handleUpload}>
                                        {isLoading ? 'Loading...' : 'Run Model'}
                                    </button>
                                </div>
                            </div>

                            <MapContainer
                                center={[20.5937, 80]}
                                style={{ width: '100%', height: "80vh", backgroundColor: 'white', border: 'none', margin: 'auto' }}
                                zoom={4}
                                maxZoom={12}
                                // minZoom={4}
                                // maxBounds={[[8, 98], [38, 68]]}
                                attributionControl={false}
                                scrollWheelZoom={false}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                />
                            </MapContainer>
                        </div>

                        {isLoading && (
                            <div className="loading_section">
                                {data.length > 0 && (
                                    <div className="simple-spinner">
                                        <span></span>
                                    </div>
                                )}
                            </div>
                        )}

                    </>
                </TabPanel>

                <TabPanel>
                    <ScorePage processedData={processedData} />
                </TabPanel>

                <TabPanel>
                    <FeatureImportancePage processedData={processedData} />
                </TabPanel>
                <TabPanel>
                    <CohortReportPage />
                </TabPanel>
                

            </Tabs>
        </div>
    )
}

export default Dashboard