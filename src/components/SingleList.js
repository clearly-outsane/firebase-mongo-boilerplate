import React, { useEffect, useContext, useState } from 'react'
import { Context } from '../state/Store'
import { getSingles } from '../state/api/Albums'
import SingleCard from './singleCard'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { SingleCardStyles } from '../styles/Dashboard'
import clsx from 'clsx'
import { actionTypes } from '../state/constants'

const SingleList = () => {
  const classes = SingleCardStyles()
  const [state, dispatch] = useContext(Context)
  const [singles, setSingles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!!state.user && !!state.user.singles) {
      if (state.user.singles.length !== singles.length) {
        if (
          !!state.singlesArray &&
          state.singlesArray.length === state.user.singles.length
        ) {
          setSingles(state.singlesArray)
          setLoading(false)
        } else {
          getSingles(state.user).then((s) => {
            console.log(s)
            setLoading(false)
            setSingles(s)
            dispatch({ type: actionTypes.SET_USER_SINGLES, payload: s }) // populates singlesArray
          })
        }
      }
      if (state.user.singles.length === 0) setLoading(false)
    }

    return () => {}
  }, [state.user])

  useEffect(() => {
    if ((!state.user || !state.user.singles) && !state.initialLoading) { setLoading(false) }
    return () => {}
  }, [state.initialLoading])

  const createList = () => {
    const singlesArray = []
    if (singles.length === 0) {
      return (
        <Typography variant='h5' gutterBottom align='center'>
          You don't have any releases yet.
        </Typography>
      )
    }
    singles.map((single, index) => {
      singlesArray.push(<SingleCard single={single} key={index} />)
    })
    return singlesArray
  }

  const renderSingleSkeleton = () => {
    const times = state.user ? state.user.singles.length : 1
    const skeleton = [];
    [...Array(times)].map((e, i) => {
      skeleton.push(
        <Skeleton
          key={i}
          className={clsx(classes.containerSpacing)}
          variant='rect'
          width={180}
          height={180}
        />
      )
    })
    return skeleton
  }

  return (
    <div>
      {loading ? (
        <Grid container justify='flex-start' alignItems='center'>
          <Typography
            variant='h4'
            align='left'
            gutterBottom
            className={clsx(classes.titleText)}
          >
            Singles
          </Typography>
          <Grid container direction='row'>
            {renderSingleSkeleton()}
          </Grid>
        </Grid>
      ) : (
        <>
          <Typography
            variant='h4'
            align='left'
            gutterBottom
            className={clsx(classes.titleText)}
          >
            Singles
          </Typography>
          <Grid container direction='row'>
            {createList()}
          </Grid>
        </>
      )}
    </div>
  )
}

export default SingleList
