import React from 'react'
import { Grid } from "@mui/material";


export const RightSidebar = () => {
  return (
    <Grid style={{padding: '10px'}}>
        Table of contents
        <Grid xs={12}>
            <h1 style={{marginLeft: '5px'}}>heading 1</h1>
            <h2 style={{marginLeft: '10px'}}>heading 2</h2>
            <h3 style={{marginLeft: '15px'}}>heading 3</h3>
            <h4 style={{marginLeft: '20px'}}>heading 4</h4>
            <h5 style={{marginLeft: '25px'}}>heading 5</h5>
            <h6 style={{marginLeft: '30px'}}>heading 6</h6>
        </Grid>
    </Grid>
  )
}