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
  Tooltip,
  Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import compareArrays from './utils/compareArrays';
import { setCookie, getCookie, clearCookie } from './utils/cookies';
import addTime from './utils/addTime';

function NuzlockeTracker(props) {
  const [data, setData] = useState([]);
  const cookieName = 'tableData';
  const cookieData = getCookie(cookieName);
  const livingPokemon = ([...cookieData].filter((item) => {if (!item.dead) return item}))
  const deadPokemon = ([...cookieData].filter((item) => {if (item.dead) return item}))
  const [editing, setEditing] = useState(null);
  const routeRef = useRef();
  const pokemonRef = useRef();
  const routeSearchRef = useRef();
  const pokemonSearchRef = useRef();
  const showDeadRef = useRef();
  const routeEditRef = useRef();
  const pokemonEditRef = useRef();
  const expiration = addTime({ days: 30 })

  const refreshPage = () => {
    window.location.reload();
  }

  useEffect(() => {
    try {
      if (cookieData && !showDeadRef.current.checked) {
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

  const search = (myData) => {
    const theData = myData && Array.isArray(myData) ? myData : cookieData;
    if (theData) {
      const newData = theData.filter((item) => {
        const itemRoute = (item.route).toLowerCase();
        const itemPokemon = (item.pokemon).toLowerCase();
        const routeVal = (routeSearchRef.current.value).toLowerCase();
        const pokemonVal = (pokemonSearchRef.current.value).toLowerCase();
        const matchedRoute = !routeVal || (routeVal && itemRoute.match(routeVal))
        const matchedPokemon = !pokemonVal || (pokemonVal && itemPokemon.match(pokemonVal))
        const nothingTyped = !routeVal && !pokemonVal;
        if ((matchedRoute && matchedPokemon) || nothingTyped) {
          if (!showDeadRef.current.checked || (showDeadRef.current.checked && item.dead)) {
            return item;
          }
        }
      })
      setData(newData);
    }
  };

  const editRow = (row) => {
    const newRoute = routeEditRef.current && routeEditRef.current.value;
    const newPokemon = pokemonEditRef.current && pokemonEditRef.current.value;
    const newData = cookieData.map((item) => {
      if (item.index === row.index) {
        return {
          index: item.index,
          dead: row.dead,
          route: newRoute ? newRoute : item.route,
          pokemon: newPokemon ? newPokemon : item.pokemon,
        }
      }
      return item;
    })
    setCookie(cookieName, newData, expiration);
    if (showDeadRef.current.checked) {
      search(newData);
    } else {
      setData(newData);
    }
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
            height: '30em',
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
                <TableRow sx={{ backgroundColor: item.dead ? 'rgba(255, 0, 0, 0.3)' : i % 2 !== 0 ? 'rgba(20, 20, 20, 0.05)' : 'white' }} key={`row_${Math.floor(Math.random() * 100)}_${i}`}>
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
                                  onClick={() => editRow(item)}
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
                        {item.dead
                          ? (
                            <Tooltip title="Set pokemon to alive">
                              <IconButton
                                onClick={() => {
                                  const newItem = {...item};
                                  newItem.dead = false;
                                  editRow(newItem);
                                }}
                                sx={{
                                  width: 'max-content',
                                }}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </Tooltip>
                          )
                          : (
                            <Tooltip title="Set pokemon to dead">
                              <IconButton
                                onClick={() => {
                                  const newItem = {...item};
                                  newItem.dead = true;
                                  editRow(newItem);
                                }}
                                sx={{
                                  width: 'max-content',
                                }}
                              >
                                <HeartBrokenIcon />
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
          height: '100%',
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}><Tooltip title="Clear All"><IconButton onClick={clearAll} sx={{ m: '0.5em', width: 'max-content' }}><RestartAltIcon /></IconButton></Tooltip></Box>
        <TextField sx={{ my: '0.5em' }} inputRef={routeSearchRef} label="Search Route" onChange={search} />
        <TextField sx={{ my: '0.5em' }} inputRef={pokemonSearchRef} label="Search Pokemon" onChange={search} />
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}><Checkbox inputRef={showDeadRef} onChange={search} /><Typography>Show dead</Typography></Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}><Typography>{`Total Pokemon: ${cookieData.length}`}</Typography></Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}><Typography>{`Total Pokemon Alive: ${livingPokemon.length}`}</Typography></Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}><Typography>{`Total Pokemon Dead: ${deadPokemon.length}`}</Typography></Box>
        <Box>
          <TableContainer 
            id="Dead-Pokemon_Table"
            sx={{
              width: 'auto',
              height: '14.4em',
              backgroundColor: 'white',
              mt: '0.5em',
              mb: '1em',
              border: '2px solid black',
              borderRadius: '0.5em',
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow key={`row_two_${Math.floor(Math.random() * 100)}_header`}>
                  <TableCell key={`cell_two_${Math.floor(Math.random() * 100)}_header`} sx={{ backgroundColor: 'lightgray', borderBottom: '2px solid black' }}><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Dead Pokemon</Box></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deadPokemon.map((item, i) => (
                  <TableRow key={`row_two_${Math.floor(Math.random() * 100)}_${i}`}>
                    <TableCell key={`cell_two_${Math.floor(Math.random() * 100)}_${i}`}><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.pokemon}</Box></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

export default NuzlockeTracker;