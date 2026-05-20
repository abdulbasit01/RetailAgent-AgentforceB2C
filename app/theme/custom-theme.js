import {extendTheme} from '@chakra-ui/react'
import baseTheme from '@salesforce/retail-react-app/app/theme'

const customTheme = extendTheme(baseTheme, {
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false
    },

    colors: {
        brand: {
            50: '#F5F5F5',
            100: '#E8E8E8',
            200: '#D4D4D4',
            300: '#A3A3A3',
            400: '#737373',
            500: '#111111',
            600: '#000000',
            700: '#000000',
            800: '#000000',
            900: '#000000'
        },
        neutral: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E8E8E8',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#111111'
        }
    },

    fonts: {
        heading: `'Helvetica Neue', Helvetica, Arial, sans-serif`,
        body: `'Helvetica Neue', Helvetica, Arial, sans-serif`
    },

    radii: {
        none: '0',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '8px',
        '2xl': '8px',
        full: '9999px'
    },

    styles: {
        global: {
            'html, body': {
                overflowX: 'hidden',
                maxWidth: '100vw'
            },
            body: {
                bg: 'white',
                color: '#111111',
                minHeight: '100vh'
            }
        }
    },

    components: {
        Header: {
            baseStyle: {
                container: {
                    width: 'full',
                    bg: 'white',
                    borderBottom: '1px solid',
                    borderColor: '#E5E5E5',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    boxShadow: 'none'
                },
                content: {
                    maxWidth: 'container.xxxl',
                    mx: 'auto',
                    px: [4, 4, 6, 8],
                    py: [3, 3, 3, 3]
                },
                logo: {
                    width: [8, 8, 10, 12],
                    height: [6, 6, 7, 8],
                    color: '#111111'
                },
                icons: {
                    color: '#111111',
                    mb: [1, 1, 2, 0],
                    transition: 'color 0.15s ease',
                    _hover: {
                        color: '#737373',
                        transform: 'none'
                    },
                    _focusVisible: {
                        outline: 'none'
                    }
                },
                accountIcon: {
                    height: 11,
                    minWidth: 'auto',
                    cursor: 'pointer',
                    alignSelf: ['self-start', 'self-start', 'self-start', 'auto']
                },
                arrowDown: {
                    height: 11,
                    minWidth: 'auto',
                    display: ['none', 'none', 'none', 'block'],
                    color: '#111111'
                },
                wishlistIcon: {
                    ml: 2
                },
                popoverContent: {
                    borderRadius: 'md',
                    border: '1px solid',
                    borderColor: '#E5E5E5',
                    boxShadow: 'md'
                },
                signout: {
                    width: '100%',
                    height: 11,
                    px: 4,
                    py: 3,
                    mt: 1,
                    borderRadius: 'md',
                    _hover: {
                        bg: '#F5F5F5'
                    }
                },
                signoutIcon: {
                    mr: 2,
                    color: '#737373'
                },
                signoutText: {
                    fontSize: 'sm',
                    fontWeight: 500,
                    color: '#404040'
                }
            }
        },

        ListMenu: {
            baseStyle: {
                listMenuTriggerLink: {
                    color: '#111111',
                    fontWeight: 500,
                    _hover: {
                        color: '#737373',
                        textDecoration: 'none'
                    }
                },
                listMenuTriggerLinkActive: {
                    color: '#111111',
                    _before: {
                        backgroundColor: '#111111'
                    }
                },
                listMenuTriggerlessLinkActive: {
                    color: '#111111',
                    _before: {
                        backgroundColor: '#111111'
                    }
                },
                listMenuTriggerLinkIcon: {
                    color: '#111111',
                    _hover: {
                        color: '#737373'
                    }
                },
                listMenuTriggerIcon: {
                    color: '#111111',
                    _hover: {
                        color: '#737373'
                    }
                }
            }
        },

        Footer: {
            baseStyle: {
                container: {
                    width: 'full',
                    bg: '#111111',
                    boxShadow: 'none'
                },
                content: {
                    maxWidth: 'container.xxl',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    color: 'white',
                    paddingTop: {base: 10, lg: 16},
                    paddingBottom: 10,
                    paddingLeft: [4, 4, 6, 8],
                    paddingRight: [4, 4, 6, 8]
                },
                subscribeHeading: {
                    fontSize: 'lg',
                    marginBottom: 2,
                    color: 'white',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                },
                subscribeMessage: {
                    fontSize: 'sm',
                    marginBottom: 4,
                    color: '#A3A3A3'
                },
                subscribeField: {
                    background: 'white',
                    color: '#111111',
                    borderRadius: 'full',
                    border: 'none'
                },
                copyright: {
                    fontSize: 'sm',
                    marginBottom: 6,
                    color: '#A3A3A3'
                },
                horizontalRule: {
                    marginTop: 8,
                    marginBottom: 8,
                    borderColor: '#2E2E2E'
                },
                socialIcons: {
                    marginTop: 6
                }
            }
        },

        App: {
            baseStyle: {
                container: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    minWidth: 0,
                    maxWidth: '100%',
                    overflowX: 'hidden'
                },
                headerWrapper: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000
                }
            }
        },

        Button: {
            baseStyle: {
                fontWeight: 700,
                borderRadius: 'full',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: 'sm'
            },
            variants: {
                solid: {
                    bg: '#111111',
                    color: 'white',
                    _hover: {
                        bg: '#404040',
                        _disabled: {bg: '#A3A3A3'}
                    },
                    _active: {bg: '#000000'},
                    _disabled: {bg: '#A3A3A3'}
                },
                outline: {
                    borderColor: '#111111',
                    borderWidth: '2px',
                    color: '#111111',
                    _hover: {
                        bg: '#F5F5F5'
                    }
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
                }
            }
        },

        Card: {
            baseStyle: {
                container: {
                    bg: 'white',
                    borderRadius: 'none',
                    border: 'none',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                }
            }
        },

        ProductTile: {
            baseStyle: {
                container: {
                    position: 'relative',
                    bg: 'white',
                    borderRadius: 'none',
                    border: 'none',
                    overflow: 'hidden',
                    padding: 0,
                    transition: 'none'
                },
                imageWrapper: {
                    position: 'relative',
                    marginBottom: 0,
                    overflow: 'hidden',
                    bg: '#F5F5F5'
                },
                image: {
                    ratio: 1,
                    paddingBottom: 0
                },
                link: {
                    display: 'block'
                },
                title: {
                    fontWeight: 600,
                    fontSize: 'sm',
                    color: '#111111',
                    noOfLines: 2,
                    lineHeight: 'tall',
                    mt: 2
                },
                price: {
                    fontSize: 'sm',
                    fontWeight: 400,
                    color: '#737373',
                    mt: 1
                }
            }
        },

        Input: {
            variants: {
                outline: {
                    field: {
                        borderRadius: 'full',
                        borderColor: '#E5E5E5',
                        _focus: {
                            borderColor: '#111111',
                            boxShadow: '0 0 0 1px #111111'
                        }
                    }
                }
            }
        },

        Heading: {
            baseStyle: {
                fontWeight: 800,
                color: '#111111',
                letterSpacing: '-0.02em'
            }
        },

        HorizontalSuggestions: {
            baseStyle: {
                flexContainer: {
                    gap: 4,
                    overflowX: 'hidden',
                    overflowY: 'visible',
                    flexWrap: 'wrap',
                    pb: 2,
                    justifyContent: 'flex-start'
                },
                suggestionItem: {
                    width: {
                        base: 'calc(50% - 8px)',
                        md: 'calc(33.333% - 11px)',
                        lg: 'calc(25% - 12px)'
                    },
                    minWidth: {base: '140px', md: '160px'},
                    flex: '0 0 auto'
                }
            }
        }
    }
})

export default customTheme
