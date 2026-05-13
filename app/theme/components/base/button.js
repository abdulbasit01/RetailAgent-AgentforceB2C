/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
export default {
    baseStyle: {
        borderRadius: 'full',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontSize: 'sm'
    },
    variants: {
        solid: (props) =>
            props.colorScheme === 'blue'
                ? {
                      backgroundColor: '#111111',
                      color: 'white',
                      _hover: {bg: '#404040', _disabled: {bg: '#A3A3A3'}},
                      _active: {bg: '#000000'},
                      _disabled: {bg: '#A3A3A3'}
                  }
                : {
                      backgroundColor: '#111111',
                      color: 'white',
                      _hover: {bg: '#404040', _disabled: {bg: '#A3A3A3'}},
                      _active: {bg: '#000000'},
                      _disabled: {bg: '#A3A3A3'}
                  },
        outline: (props) =>
            props.colorScheme === 'black'
                ? {
                      color: '#111111',
                      _hover: {bg: '#F5F5F5'},
                      borderColor: '#111111',
                      borderWidth: '2px'
                  }
                : {
                      color: '#111111',
                      _hover: {bg: '#F5F5F5'},
                      borderColor: '#111111',
                      borderWidth: '2px'
                  },
        footer: {
            fontSize: 'sm',
            backgroundColor: 'white',
            color: '#111111',
            borderRadius: 'full',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            _hover: {bg: '#F5F5F5'},
            _active: {bg: '#E8E8E8'},
            paddingLeft: 4,
            paddingRight: 4
        },
        link: (props) => ({
            color: props.colorScheme === 'red' ? 'red.500' : '#111111',
            fontWeight: 'normal',
            minWidth: '1em',
            lineHeight: 4,
            textTransform: 'none',
            letterSpacing: 'normal'
        }),
        'menu-link': {
            color: '#111111',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            fontWeight: 'normal',
            textTransform: 'none',
            letterSpacing: 'normal',
            _hover: {
                bg: '#F5F5F5',
                textDecoration: 'underline',
                textDecorationColor: '#111111'
            },
            _activeLink: {
                bg: '#F5F5F5',
                borderLeft: 'solid',
                borderLeftColor: '#111111',
                borderLeftWidth: '4px'
            }
        },
        'menu-link-mobile': {
            color: '#111111',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            fontWeight: 'normal',
            textTransform: 'none',
            letterSpacing: 'normal',
            _hover: {
                bg: '#F5F5F5',
                textDecoration: 'underline',
                textDecorationColor: '#111111'
            },
            _activeLink: {
                bg: '#F5F5F5',
                border: 'solid',
                borderColor: '#111111',
                borderWidth: '1px'
            }
        },
        'search-link': {
            color: '#111111',
            justifyContent: 'flex-start',
            fontSize: 'sm',
            textTransform: 'none',
            letterSpacing: 'normal',
            _hover: {textDecoration: 'none'}
        }
    },
    sizes: {
        md: {
            height: 11,
            minWidth: 11,
            px: 6
        }
    },
    defaultProps: {
        colorScheme: 'blackAlpha'
    }
}
