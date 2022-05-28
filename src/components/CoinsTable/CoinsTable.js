/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { 
  Container, 
  makeStyles, 
  Typography,
  TextField,
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { CoinList } from '../../config/api';
import { useCryptoContext } from '../../CryptoContext';
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from '../../utils/numberWithCommas';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: 700,
    color: "#0052ff",
    margin: 18,
  },
  search: {
    width: "100%",
    marginBottom: 20,
  },
  linearProgress: {
    backgroundColor: "#0052ff",
  },
  tableHead: {
    backgroudColor: "#0052ff",
  },
  tableCell: {
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#0052ff"
  },
  tableRowCoin: {
    backgroundColor: "#FFF",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f5fe",
    },
    fontFamily: "Roboto",
  },
  tableCellCoin: {
    display: "flex",
    gap: 15,
  },
  tableCellCoinImg: {
    height: 50,
    marginBottom: 10,
  }
}));

const CoinsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, symbol } = useCryptoContext();

  const [search, setSearch] = useState(false);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));
    setCoins(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    ))
  }

  return (
    <Container className={classes.container}>
      <Typography
        variant="h5"
        className={classes.title}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>

      <TextField
        variant="outlined"
        className={classes.search}
        label="Search For a Crypto Currency..." 
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer>
        {loading ? (
            <LinearProgress className={classes.LinearProgress} />
          ) : (
            <Table aria-label="simple table">
              <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableHeadTitle}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      className={classes.tableCell}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                  {handleSearch().map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      <TableRow
                        key={row.name}
                        className={classes.tableRowCoin}
                        onClick={() => history.push(`/coins/${row.id}`)}
                      >
                        <TableCell component='th' scope='row' className={classes.tableCellCoin}>
                          <img 
                            src={row?.image}
                            alt={row.name}
                            className={classes.tableCellCoinImg}
                          />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ textTransform: "uppercase", fontSize: 22 }}>
                              {row.symbol}
                            </span>
                            <span style={{ color: "black" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell 
                          align="right"
                          style={{
                            color: profit > 0 ? "#0ecb81" : "red",
                            fontWeight: 700,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          )
        }
      </TableContainer>
    </Container>
  )
}

export default CoinsTable;