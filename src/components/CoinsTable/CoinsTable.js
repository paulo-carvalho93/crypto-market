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
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: "center",
  },
  title: {
    fontFamily: "Roboto",
    fontWeight: "bold",
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
    backgroundColor: "#f1f4f7",
  },
  tableCell: {
    fontFamily: "Roboto",
    fontWeight: "bold",
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
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  paginationUl: {
    "& .MuiPaginationItem-root": {
      color: "black",
    },
  },
}));

const CoinsTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, symbol } = useCryptoContext();

  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

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
            <LinearProgress className={classes.linearProgress} />
          ) : (
            <Table aria-label="simple table">
              <TableHead className={classes.tableHead}>
                <TableRow>
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
                  {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
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
                    );
                  })}
              </TableBody>
            </Table>
          )
        }
      </TableContainer>
      <Pagination
        className={classes.pagination}
        classes={{ ul: classes.paginationUl }}
        count={(handleSearch()?.length / 10).toFixed(0)}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </Container>
  )
}

export default CoinsTable;