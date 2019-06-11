import React from 'react'
import {withStyles} from './styles'

export const GridHeader = withStyles(({
    root: {
        flex: '1 0 auto',
        display: 'grid',
        gridTemplateColumns: ({columns, dimensions: {timeLineWidth}}) => `${timeLineWidth}px repeat(${columns.length}, 1fr)`,
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
            const {classes, columns, renderColumnName} = this.props;
            return (
                <div className={classes.root}>
                    <div className={classes.sideline}/>
                    {columns.map((column, index) => (
                        <div key={index} style={{gridRow: '1 / span 2', gridColumn: `${index + 2} / span 1`}}
                             className={classes.dayHeader}>
                            {renderColumnName(column, index)}
                        </div>))}
                </div>
            )
        }
    })
