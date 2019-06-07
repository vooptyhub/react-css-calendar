import injectSheet from 'react-jss'
import _ from 'lodash'

const convertArrayTextStyle = (styles) => {
    const stylePairs = styles.map(style => {
        const prop = prop => [prop, style];
        if (style === 'uppercase') {
            return prop('textTransform')
        }
        if (_.isNumber(style)) {
            return prop('fontSize')
        }
        if (_.isString(style) || _.isFunction(style)) {
            return prop('color')
        }
        return prop('extend')
    })
    return _.fromPairs(stylePairs)
};

const processStyles = (styles) => {
    if (_.isFunction(styles)) {
        return styles
    } else {
        const rest = _.mapValues(styles, (value, key) => {
            if (_.isArray(value)) {
                return convertArrayTextStyle(value)
            } else {
                return value
            }
        });
        return rest
    }
};

export const withStyles = (...args) => Component => {
    const [styles, options] = args;
    return injectSheet(processStyles(styles), options)(Component)
};