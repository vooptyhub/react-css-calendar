import React from 'react'
import {withStyles} from './styles'

export const GridHeader = withStyles(({
    root: {
        display: 'grid',
        gridTemplateColumns: ({dates, dimensions: {timeLineWidth}}) => `${timeLineWidth}px repeat(${dates.length}, 1fr)`,
        gridTemplateRows: ({dimensions: {headerHeight}}) => `${headerHeight}px 1fr`,
        borderBottom: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        overflow: 'hidden',
    },
    sideline: {
        backgroundColor: ({colorScheme: {header}}) => header,
        borderRight: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        gridRow: `1 / span 2`,
        gridColumn: `1 / span 1`,
    },
    dayHeader: {
        borderRight: ({colorScheme: {divider}}) => `1px solid ${divider}`,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        flex: "1 0 0%",
        alignItems: 'center',
        justifyContent: 'center',
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
