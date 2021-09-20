// Products Table

import React, {useContext, useState} from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { flattenObject } from "../Functions/commonFunctions"
import { FiltersContext } from "../Context/FiltersContext";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const useRowStyles = makeStyles({
    root: {
        "& > *": {
            borderBottom: "unset"
        }
    }
});

// Create data for the table
function createData(keys, flatProduct) {
    let newProduct = {1: ""}
    keys.forEach(key => {
        if (flatProduct != undefined) {
            if (flatProduct[key] != undefined && flatProduct[key] != "**N/A**") {
                newProduct[key] = flatProduct[key].toString()
            } else {
                newProduct[key] = "(undefined)"
            }
        }
    })

    return newProduct
}

// Create Row for table
function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    const [ open, setOpen ] = useState()
    return (
        <React.Fragment>
            <TableRow className={classes.root} border={0}>
                {Object.keys(row).map(key => {
                    return (
                        <TableCell
                            component="th"
                            key={key}
                            onClick={() => {
                                navigator.clipboard.writeText(row[key])
                                setOpen(true)
                            }}
                        >{row[key]}</TableCell>)
                })}

                <Snackbar open={open} autoHideDuration={6000}>
                    <Alert severity="success">
                        Product ID Copied To Clipboard
                    </Alert>
                </Snackbar>

            </TableRow>
        </React.Fragment>
    );
}

// Process data
const DataTableRows = ({products2, filtersList, keys}) => {
    let tableRows = []

    if (products2 !== undefined ) {
        const products = Object.entries(products2)
        if (products != undefined) {

            products.forEach(product => {
                const flatProduct = flattenObject(product)
                let matchedFilters = 0
                let requiredFiltersMatch = 0

                for (const filter of Object.keys(filtersList)) {
                    if (flatProduct[filter] != undefined && filtersList[filter.toString()] != undefined && filtersList[filter.toString()].length > 0) {
                        filtersList[filter.toString()].forEach(f => {
                            if (f["value"].toString() == flatProduct[filter].toString()) {
                                matchedFilters++
                            }
                        })
                        requiredFiltersMatch++
                    }
                }
                if (matchedFilters === requiredFiltersMatch) {
                    tableRows.push(createData(keys, flatProduct))
                }
            })
        }
    }

    if (tableRows.length > 0) {
        return (
            tableRows.map((row, i) => {
                return <Row key={i} row={row} />
            })
        )
    } else {
        return (
            <>
                <TableCell>No Products Found</TableCell>
            </>
        )
    }
}

// Output
const ProductListComponent = props => {
    const { filtersList2 }  = useContext(FiltersContext)

    if (props.loading) {
        return "Loading..."
    } else {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            {Object.keys(flattenObject(props.products[0])).map(key => {
                                return <TableCell component="th" key={key}>{key}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <DataTableRows products2={props.products} keys={Object.keys(flattenObject(props.products[0]))} filtersList={filtersList2}/>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default ProductListComponent