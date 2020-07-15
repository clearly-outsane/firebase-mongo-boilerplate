import React, { useEffect, useContext, useState } from "react";
import { Context } from "../state/Store";
import { getAlbums } from "../state/api/Albums";
import { AlbumStyles } from "../styles/Dashboard";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import TablePagination from "@material-ui/core/TablePagination";
import { actionTypes } from "../state/constants";
import { useTheme } from "@material-ui/core/styles";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";

const AlbumList = () => {
  const [state, dispatch] = useContext(Context);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = AlbumStyles();

  useEffect(() => {
    if (!!state.user && !!state.user.albums) {
      if (state.user.albums.length !== albums.length) {
        if (
          !!state.albumsArray &&
          state.albumsArray.length === state.user.albums.length
        ) {
          setAlbums(state.albumsArray);
          setLoading(false);
        } else {
          getAlbums(state.user).then((s) => {
            console.log(s);
            setLoading(false);
            setAlbums(s);
            dispatch({ type: actionTypes.SET_USER_ALBUMS, payload: s });
          });
        }
      }
      if (state.user.albums.length === 0) setLoading(false);
    }

    return () => {};
  }, [state.user]);

  useEffect(() => {
    if ((!!!state.user || !!!state.user.albums) && !state.initialLoading)
      setLoading(false);
    return () => {};
  }, [state.initialLoading]);

  const renderSkeleton = () => {
    const times = !!state.user ? state.user.albums.length : 1;
    let skeleton = [
      <Skeleton
        className={clsx(classes.containerSpacing)}
        variant="rect"
        width={"100%"}
        height={36}
      />,
    ];
    [...Array(times)].map((e, i) => {
      skeleton.push(
        <Skeleton
          key={i}
          className={clsx(classes.containerSpacing)}
          variant="rect"
          width={"100%"}
          height={64}
        />
      );
    });
    return skeleton;
  };

  const renderSinglesTable = (singles) => {
    if (!!singles) {
      return (
        <TableContainer elevation={0} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableBody>
              {singles.map((singleId) => {
                let foundSingle = state.singlesArray.find(
                  (s) => s._id === singleId
                );
                if (!!foundSingle)
                  return <SingleRow key={foundSingle.name} row={foundSingle} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  const SingleRow = ({ row }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TableRow key={row.upcCode}>
          <TableCell component="th" scope="row">
            <Grid container direction="row">
              <Grid item>
                <Card
                  style={{
                    backgroundImage: `url(data:image/png;base64,${row.img})`,
                  }}
                  className={clsx(classes.imgContainer)}
                ></Card>
              </Grid>
              <Grid item xs container direction="column">
                <Typography
                  className={clsx(classes.leftMargin)}
                  variant="h6"
                  align="left"
                >
                  {row.singleTitle}
                </Typography>
                <div className={classes.leftMargin}>
                  {row.artists.map((name, index) => {
                    return (
                      <Typography
                        variant="body2"
                        display="inline"
                        align="left"
                        className={clsx(classes.longText)}
                      >
                        {index === row.artists.length - 1 ? name : name + ", "}
                      </Typography>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="right">{row.labelName}</TableCell>
          <TableCell align="right">
            <Grid container direction="column">
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                UPC: {row.upcCode}
              </Typography>
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                ISRC: {row.isrcCode}
              </Typography>
            </Grid>
          </TableCell>
          <TableCell align="right">
            <Grid container direction="column">
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                {row.primaryGenre}
              </Typography>
              <Typography
                className={clsx(classes.leftMargin)}
                variant="caption"
              >
                {row.secondaryGenre}
              </Typography>
            </Grid>
          </TableCell>
          <TableCell align="right">
            {row.releaseDate.toLocaleString()}
          </TableCell>
        </TableRow>
      </>
    );
  };

  const Row = ({ row, index }) => {
    const [open, setOpen] = React.useState(false);
    return (
      <>
        <TableRow key={row.upcCode} className={clsx(classes.coloredRow)}>
          <TableCell component="th" scope="row">
            <Grid container direction="row">
              <Grid item>
                <Card
                  style={{
                    backgroundImage: `url(data:image/png;base64,${row.img})`,
                  }}
                  className={clsx(classes.imgContainer)}
                ></Card>
              </Grid>
              <Grid item xs container direction="column">
                <Typography
                  className={clsx(classes.leftMargin)}
                  variant="h6"
                  align="left"
                >
                  {row.albumTitle}
                </Typography>
                <div className={classes.leftMargin}>
                  {row.artists.map((name, index) => {
                    return (
                      <Typography
                        variant="body2"
                        display="inline"
                        align="left"
                        className={clsx(classes.longText)}
                      >
                        {index === row.artists.length - 1 ? name : name + ", "}
                      </Typography>
                    );
                  })}
                </div>
              </Grid>
            </Grid>
          </TableCell>
          <TableCell align="right">{row.labelName}</TableCell>
          <TableCell align="right">
            <Grid container direction="column">
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                UPC: {row.upcCode}
              </Typography>
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                ISRC: {row.isrcCode}
              </Typography>
            </Grid>
          </TableCell>
          <TableCell align="right">
            <Grid container direction="column">
              <Typography className={clsx(classes.leftMargin)} variant="body2">
                {row.primaryGenre}
              </Typography>
              <Typography
                className={clsx(classes.leftMargin)}
                variant="caption"
              >
                {row.secondaryGenre}
              </Typography>
            </Grid>
          </TableCell>
          <TableCell align="right">
            {row.releaseDate.toLocaleString()}
          </TableCell>
          <TableCell>
            <Grid container justify="center">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Grid>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {state.singlesArray ? (
                <>{renderSinglesTable(row.singles)}</>
              ) : (
                <Grid container justify="center">
                  <CircularProgress size={24} />
                </Grid>
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <div className={classes.paginationRoot}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }

  const renderTable = () => {
    return (
      <>
        <TableContainer elevation={0} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead className={clsx(classes.tableHead)}>
              <TableRow className={clsx(classes.tableRow)}>
                <TableCell classes={{ head: classes.whiteCellText }}>
                  Title + Artists
                </TableCell>
                <TableCell
                  className={clsx(classes.whiteCellText)}
                  align="right"
                >
                  Label
                </TableCell>
                <TableCell
                  className={clsx(classes.whiteCellText)}
                  align="right"
                >
                  Identifiers
                </TableCell>
                <TableCell
                  className={clsx(classes.whiteCellText)}
                  align="right"
                >
                  Genre
                </TableCell>
                <TableCell
                  className={clsx(classes.whiteCellText)}
                  align="right"
                >
                  Release Date and Time
                </TableCell>
                <TableCell
                  className={clsx(classes.whiteCellText)}
                  align="right"
                >
                  Singles
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums.map((row, index) => (
                <Row key={row.name} row={row} index={index} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            style={{ display: "flex" }}
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            count={albums.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableContainer>
      </>
    );
  };

  return (
    <div>
      {loading ? (
        <Grid container justify="center" alignItems="center">
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            style={{ marginTop: 18 }}
          >
            Albums
          </Typography>
          <Grid container direction="row">
            {renderSkeleton()}
          </Grid>
        </Grid>
      ) : (
        <>
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            style={{ marginTop: 18 }}
          >
            Albums
          </Typography>
          <Grid container direction="row">
            {renderTable()}
          </Grid>
        </>
      )}
    </div>
  );
};

export default AlbumList;
