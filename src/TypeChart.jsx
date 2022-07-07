import React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { Box } from '@mui/system';
import types from './types';
import capsFirstLetter from './utils/capsFirstLetter';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

function TypeChart(props) {
  const noElement = (color) => (
    <HorizontalRuleIcon sx={{ color, }} />
  )
  const commonCellSx = {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const commonTypographySx = {
    width: 'max-content',
    transition: '0.5s',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
      p: '0.2em',
    },
  };
  const commonHeaderTypographySx = {
    fontWeight: 'bold',
    fontSize: '1.3em',
  };
  return (
    <Box sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ height: '27em' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><Box sx={commonCellSx}><Typography sx={{...commonHeaderTypographySx, ...commonTypographySx}}>Type</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography sx={{...commonHeaderTypographySx, ...commonTypographySx}}>Strong Against</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography sx={{...commonHeaderTypographySx, ...commonTypographySx}}>Weak Against</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography sx={{...commonHeaderTypographySx, ...commonTypographySx}}>Resistant To</Typography></Box></TableCell>
              <TableCell><Box sx={commonCellSx}><Typography sx={{...commonHeaderTypographySx, ...commonTypographySx}}>Weak To</Typography></Box></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(types).map((type, i) => {
              const curVal = Object.values(types)[i];
              return (
                <TableRow sx={{ backgroundColor: curVal.color }}>
                  <TableCell><Box sx={commonCellSx}><Typography sx={{ color: curVal.text, ...commonTypographySx}}>{capsFirstLetter(type)}</Typography></Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.strongAgainst.length ? curVal.strongAgainst.map((item) => (<Typography sx={{ color: curVal.text, ...commonTypographySx}}>{item}</Typography>)) : noElement(curVal.text)}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.weakAgainst.length ? curVal.weakAgainst.map((item) => (<Typography sx={{ color: curVal.text, ...commonTypographySx}}>{item}</Typography>)) : noElement(curVal.text)}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.resistantTo.length ? curVal.resistantTo.map((item) => (<Typography sx={{ color: curVal.text, ...commonTypographySx}}>{item}</Typography>)) : noElement(curVal.text)}</Box></TableCell>
                  <TableCell><Box sx={commonCellSx}>{curVal.weakTo.length ? curVal.weakTo.map((item) => (<Typography sx={{ color: curVal.text, ...commonTypographySx}}>{item}</Typography>)) : noElement(curVal.text)}</Box></TableCell>
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