import React from 'react'
import {withStyles} from './styles'
import {timeLineWidth, divider, header} from './Constants'

export const GridHeader = withStyles(({
    root: {
        display: 'grid',
        gridTemplateColumns: ({dates}) => `${timeLineWidth}px repeat(${dates.length}, 1fr)`,
        gridTemplateRows: `60px 1fr`,
        borderBottom: `1px solid ${divider}`,
        overflow: 'hidden',
    },
    sideline: {
        backgroundColor: header,
        borderRight: `1px solid ${divider}`,
        gridRow: `1 / span 2`,
        gridColumn: `1 / span 1`,
    },
    dayHeader: {
        borderRight: `1px solid ${divider}`,
        padding: 8,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 0%",
    },
}))(
    class extends React.PureComponent {
        render() {
            const {classes, dates, renderTime} = this.props;
            return (
                <div className={classes.root}>
                    <div className={classes.sideline}/>
                    {dates.map((date, index) => (
                        <div key={date} style={{gridRow: '1 / span 2', gridColumn: `${index + 2} / span 1`}}
                             className={classes.dayHeader}>
                            {renderTime(date, index)}
                        </div>))}
                </div>
            )
        }
    })
