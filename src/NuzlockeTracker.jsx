import React, { useRef, useState, useEffect } from 'react';
import {
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import compareArrays from './utils/compareArrays';
import { setCookie, getCookie, clearCookie } from './utils/cookies';
import addTime from './utils/addTime';

function NuzlockeTracker(props) {
  const [data, setData] = useState([]);
  const [editing, setEditing] = useState(null);
  const routeRef = useRef();
  const pokemonRef = useRef();
  const routeSearchRef = useRef();
  const pokemonSearchRef = useRef();
  const routeEditRef = useRef();
  const pokemonEditRef = useRef();

  const cookieName = 'tableData';
  const cookieData = getCookie(cookieName);
  const expiration = addTime({ days: 30 })

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    try {
      if (cookieData) {
        setData(cookieData);
      }
    } catch {
      clearCookie(cookieName);
    }
  }, [])

  const headers = [
    'Route',
    'Pokemon',
  ];

  const addRow = (route, pokemon) => {
    const newData = [...data];
    newData.push({
      index: data[data.length-1] ? data[data.length-1].index + 1 : 0,
      dead: false,
      route,
      pokemon,
    })
    routeRef.current.value = '';
    pokemonRef.current.value = '';
    setCookie(cookieName, newData, expiration);
    setData(newData);
  }

  const deleteRow = (index) => {
    const newData = data.filter((item) => {
      if (item.index !== index) {
        return item;
      }
    })
    if (newData.length) {
      setCookie(cookieName, newData, expiration);
    } else {
      clearCookie(cookieName);
    }
    setData(newData);
  }

  const clearAll = () => {
    clearCookie(cookieName);
    setData([])
  }

  const search = () => {
    if (cookieData) {
      const newData = cookieData.filter((item) => {
        const itemRoute = (item.route).toLowerCase();
        const itemPokemon = (item.pokemon).toLowerCase();
        const routeVal = (routeSearchRef.current.value).toLowerCase();
        const pokemonVal = (pokemonSearchRef.current.value).toLowerCase();
        const matchedRoute = !routeVal || (routeVal && itemRoute.match(routeVal))
        const matchedPokemon = !pokemonVal || (pokemonVal && itemPokemon.match(pokemonVal))
        const nothingTyped = !routeVal && !pokemonVal;
        if ((matchedRoute && matchedPokemon) || nothingTyped) {
          return item;
        }
      })
      setData(newData);
    }
  };

  const editRow = (itemIndex) => {
    const newRoute = routeEditRef.current.value;
    const newPokemon = pokemonEditRef.current.value;
    const newData = data.map((item) => {
      if (item.index === itemIndex) {
        return {
          index: item.index,
          dead: item.dead,
          route: newRoute,
          pokemon: newPokemon,
        }
      }
      return item;
    })
    setCookie(cookieName, newData, expiration);
    setData(newData);
    setEditing(null)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        width: 'max-content',
        height: 'max-content',
        backgroundColor: 'lightblue',
        border: '3px solid black',
        borderRadius: '0.5em',
      }}
    >
      <Box
        id="TableDeck"
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            width: '100%',
            my: '1em',
          }}
        >
          <TextField sx={{ mx: '0.5em', width: '100%' }} inputRef={routeRef} label="Route" />
          <TextField sx={{ mx: '0.5em', width: '100%' }} inputRef={pokemonRef} label="Pokemon" />
          <Button type="submit" onClick={(e) => {e.preventDefault(); addRow(routeRef.current.value, pokemonRef.current.value)}} variant="contained" color="secondary" sx={{ mx: '0.5em', width: 'max-content' }}>Add</Button>
        </Box>
        <TableContainer
          id="Nuzlocke-Table"
          sx={{
            width: 'auto',
            height: '19em',
            backgroundColor: 'white',
            m: '0.5em',
            border: '2px solid black',
            borderRadius: '0.5em',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((header, i) => (
                  <TableCell key={`cell_${Math.floor(Math.random() * 100)}_${i}`} sx={{ backgroundColor: 'lightgray', borderBottom: '2px solid black', borderRight: i < headers.length-1 && '1px solid black', borderLeft: i > 0 && '1px solid black' }}><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{header}</Box></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={`row_${Math.floor(Math.random() * 100)}_${i}`}>
                  <TableCell
                    key={`cell_${Math.floor(Math.random() * 100)}_${i}_1`}
                    sx={{
                      borderRight: '1px solid gray',
                      width: '6em',
                      overFlow: 'scroll',
                    }}
                  >
                    {editing === item.index
                      ? (
                        <TextField variant="standard" inputRef={routeEditRef} defaultValue={item.route} />
                      )
                      : (
                        <Typography
                          sx={{
                            overflowWrap: 'break-word',
                          }}
                        >
                          {item.route}
                        </Typography>
                      )}
                  </TableCell>
                  <TableCell
                    key={`cell_${Math.floor(Math.random() * 100)}_${i}_2`}
                    sx={{
                      borderLeft: '1px solid gray',
                      maxWidth: '15em',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box
                        sx={{
                          maxWidth: '75%',
                        }}
                      >
                        {editing === item.index
                          ? (
                            <TextField variant="standard" inputRef={pokemonEditRef} defaultValue={item.pokemon} />
                          )
                          : (
                            <Typography
                              sx={{
                                overflowWrap: 'break-word',
                              }}
                            >
                              {item.pokemon}
                            </Typography>
                          )}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                        }}
                      >
                        {editing === item.index
                          ? (
                            <>
                              <Tooltip title="Submit row">
                                <IconButton
                                  onClick={() => editRow(item.index)}
                                  sx={{
                                    width: 'max-content',
                                  }}
                                >
                                  <DoneIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Cancel editing">
                                <IconButton
                                  onClick={() => setEditing(null)}
                                  sx={{
                                    width: 'max-content',
                                  }}
                                >
                                  <CancelIcon />
                                </IconButton>
                              </Tooltip>
                            </>
                          )
                          : (
                            <Tooltip title="Edit row">
                              <IconButton
                                onClick={() => setEditing(item.index)}
                                sx={{
                                  width: 'max-content',
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        <Tooltip title="Delete row">
                          <IconButton
                            onClick={() => deleteRow(item.index)}
                            sx={{
                              width: 'max-content',
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box
        id="ControlDeck"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '0.5em',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Tooltip title="Clear All"><IconButton onClick={clearAll} sx={{ m: '0.5em', width: 'max-content' }}><RestartAltIcon /></IconButton></Tooltip></Box>
        <TextField sx={{ my: '0.5em' }} inputRef={routeSearchRef} label="Search Route" onChange={search} />
        <TextField sx={{ my: '0.5em' }} inputRef={pokemonSearchRef} label="Search Pokemon" onChange={search} />
      </Box>
    </Box>
  );
}

export default NuzlockeTracker;