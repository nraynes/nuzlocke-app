import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { Box } from '@mui/system';
import types from './types';
import capsFirstLetter from './utils/capsFirstLetter';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

function TypeChart(props) {
  const noElement = <HorizontalRuleIcon />
  const commonCellSx = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const commonTypographySx = {
    width: 'max-content'
  };
  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Box sx={commonCellSx}><Typography>Type</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography>Strong Against</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography>Weak Against</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography>Resistant To</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography>Weak To</Typography></Box></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(types).map((type, i) => {
              const curVal = Object.values(types)[i];
              return (
                <TableRow sx={{ backgroundColor: curVal.color }}>
                  <TableCell><Box sx={commonCellSx}><Typography sx={commonTypographySx}>{capsFirstLetter(type)}</Typography></Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.strongAgainst.length ? curVal.strongAgainst.map((item) => (<Typography sx={commonTypographySx}>{item}</Typography>)) : noElement}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.weakAgainst.length ? curVal.weakAgainst.map((item) => (<Typography sx={commonTypographySx}>{item}</Typography>)) : noElement}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.resistantTo.length ? curVal.resistantTo.map((item) => (<Typography sx={commonTypographySx}>{item}</Typography>)) : noElement}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.weakTo.length ? curVal.weakTo.map((item) => (<Typography sx={commonTypographySx}>{item}</Typography>)) : noElement}</Box></TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TypeChart;