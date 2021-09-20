import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Grid} from "@material-ui/core";

import { FiltersContext } from "../Context/FiltersContext";
import Select from 'react-select'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    selectContainer: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    selection: {
        width: '100%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


const FiltersComponent = (props) => {
    const classes = useStyles();
    const {updateFiltersList} = useContext(FiltersContext)
    const { filtersObj } = props

    const getPossibleFilterOptions = (variants) => {
        const options = []
        variants.forEach(variant => {
            options.push({value: variant, label: variant})
        })
        return options
    }

    const handleFilterUpdate = (field, selectedOptions) => {
        updateFiltersList(field, selectedOptions)
    }

    const renderFilters = () => {
        if (filtersObj !== undefined) {
            return (
                    filtersObj.map((field, index) => (
                        <Grid key={index} item xs={12} md={6}>
                            <br />{field.name}
                            <Select
                                placeholder={field.name}
                                closeMenuOnSelect={false}
                                name={field.name}
                                options={getPossibleFilterOptions(field.options)}
                                isMulti
                                onChange={(e) => handleFilterUpdate(field.name, e)}
                            />
                        </Grid>
                ))
            )
        }
    }

    return <Card className={classes.root}>
        <CardContent>
            <Typography variant="h5" component="h2">
                Product Query and Filters
            </Typography>
            <Grid container spacing={1} style={{marginTop: '10px'}}>
                {renderFilters()}
            </Grid>
        </CardContent>
        <CardActions>
            <Button size="small">Reset All</Button>
        </CardActions>
    </Card>
}

export default FiltersComponent