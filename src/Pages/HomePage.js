// This file manages the home page layout and is responsible for data fetching and manipulation
// Devansh Kaloti

import React, {createRef, useContext, useEffect, useRef, useState} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {Button, Grid, TextField} from "@material-ui/core";
import FiltersComponent from "../Components/FiltersComponent";
import ProductListComponent from "../Components/ProductListComponent";
import {FiltersContext} from "../Context/FiltersContext";
import {flattenObject} from "../Functions/commonFunctions";
import * as fs from 'fs'

const HomePage = () => {
    const [ data, setData ] = useState() // Products Data
    const directDataRef = useRef();
    const [ directData, setDirectData ] = useState("") // Products Data
    const [ url, setUrl ] = useState("https://www.homedepot.ca/api/search/v1/search?q=wood&store=7008&pageSize=40&lang=en") // demo api
    const { filtersObj, setFiltersObj, loading, changeLoading } = useContext(FiltersContext) // Selected Filters Data and loading state


    useEffect(() => {
        const sourceFile = require('./../extra/sampleJson');
        setDirectData(sourceFile.sampleJson)
        // fetchData()
    }, []);

    // Get the possible filter types based on first product returned in API
    const getFilterOptions = (data, keyName) => {
        const options = []

        data.forEach(dt => {
            const flattenedDt = flattenObject(dt)
            if (flattenedDt[keyName] != undefined) {
                options.push(flattenedDt[keyName].toString())
            }
        })

        return [...new Set(options)]
    }

    // Process filter objects and store in context
    const setFiltersObject = (data) => {
        const allFields = flattenObject(data[0])
        let filterObjects = []

        for (const field in allFields) {
            let object = {
                name: field,
                options: getFilterOptions(data, field),
                ref: createRef(),
            }
            filterObjects.push(object)
        }

        setFiltersObj(filterObjects)
    }

    // Fetch data from API
    const fetchData = () => {
        changeLoading(true)
        // For public code without VPN:
        alert("CORS Policy Detected. Please query via JSON Input Instead")
        return

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setFiltersObject(data['products'])
                setData(data['products'])
            })
            .then(() => {
                changeLoading(false)
            })
    }

    const parseDataDirectly = () => {
        changeLoading(true)

        // console.log(directData)
        const dt = JSON.parse(directData)
        // console.log(dt)

        setFiltersObject(dt['products'])
        setData(dt['products'])
        changeLoading(false)
    }

    // Home Page Layout
    return <div style={{marginTop: '30px'}}>
        <CssBaseline />
        <Container maxWidth="false">
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <TextField
                        id="standard-full-width"
                        label="URL"
                        style={{ margin: 8 }}
                        placeholder="https://"
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        defaultValue="https://www.homedepot.ca/api/search/v1/search?q=wood&store=7008&pageSize=40&lang=en"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        id="standard-full-width"
                        label="JSON Input"
                        style={{ margin: 8 }}
                        placeholder="Simply Paste JSON Here"
                        helperText=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={directData}
                        onChange={(e) => setDirectData(e.target.value)}
                    />
                </Grid>
                <Grid item xs={2} style={{marginTop: -15}}>
                    <Button variant="contained" style={{backgroundColor: "#0063cc", borderColor: "#0063cc", color: "#fff", fontWeight: "bold"}} fullWidth onClick={fetchData}>Query from URL</Button>
                </Grid>
                <Grid item xs={2} style={{marginTop: -15}}>
                    <Button variant="outlined" style={{color: "#000", fontWeight: "bold"}} fullWidth onClick={parseDataDirectly}>Query from JSON Input</Button>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                { loading ? <></> :
                    <>
                        <Grid item xs={4}>
                            {/*Filters*/}
                            <FiltersComponent filtersObj={filtersObj} />
                        </Grid>
                        <Grid item xs={8}>
                            {/*Product Table*/}
                            <ProductListComponent loading={loading} products={data} />
                        </Grid>
                    </>
                }
            </Grid>
        </Container>
    </div>
}

export default HomePage