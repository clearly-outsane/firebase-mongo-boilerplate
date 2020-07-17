import React, { useEffect, useContext, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import clsx from 'clsx'
import { SingleCardStyles } from '../styles/Dashboard'
import Typography from '@material-ui/core/Typography'

export const singleCard = ({ single }) => {
  const classes = SingleCardStyles()
  return (
    <div className={clsx(classes.containerSpacing)}>
      <Card
        style={{
          backgroundImage: `url(data:image/png;base64,${single.img})`
        }}
        className={clsx(classes.paperContainer)}
      >
        <Grid
          container
          direction='column'
          justify='flex-end'
          className={clsx(
            classes.overlay,

            classes.contentText
          )}
          style={{ height: '100%', width: '100%' }}
        >
          <CardContent
            className={clsx(classes.cardContainer)}
            style={{ paddingBottom: 12 }}
          >
            <Typography
              variant='body1'
              align='left'
              className={clsx(classes.singleTitle, classes.longText)}
            >
              {single.singleTitle}
            </Typography>

            {single.artists.map((name, index) => {
              return (
                <Typography
                  variant='caption'
                  gutterBottom
                  align='left'
                  className={clsx(classes.singleArtists, classes.longText)}
                >
                  {index === single.artists.length - 1 ? name : name + ', '}
                </Typography>
              )
            })}
          </CardContent>
        </Grid>
      </Card>
    </div>
  )
}

export default singleCard
