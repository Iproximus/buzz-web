import React from 'react';
import { Select,Grid, Box} from '@mui/material';
const Reports = () => {
    return (

        <div >
            <div className="div">This is the Reports page</div>
            <Box display="grid" gridTemplateColumns="repeat(12, 6fr)" gap={4}>
            
                <Box gridColumn="span 4" bgcolor={'red'}>
                    <div>1</div>
                </Box>
                <Box gridColumn="span 4" bgcolor={'green'}>
                    <div>2</div>
                </Box>
                <Box gridColumn="span 4" bgcolor={'pink'}>
                    <div>3</div>
                </Box>
                <Box gridColumn="span 4" bgcolor={'blue'}>
                    <div>4</div>
                </Box>
                <Box gridColumn="span 4" bgcolor={'yellow'}>
                    <div>5</div>
                </Box>
                <Box gridColumn="span 4" bgcolor={'orange'}>
                    <div>6</div>
                </Box>

        

            </Box>



        </div>
    )
};

export default Reports;