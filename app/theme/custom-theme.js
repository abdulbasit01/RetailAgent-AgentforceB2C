import {extendTheme} from '@chakra-ui/react'
import baseTheme from '@salesforce/retail-react-app/app/theme'

const customTheme = extendTheme(baseTheme, {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },

  colors: {
    brand: {
      50: '#F5F7FF',
      100: '#EDEFFF',
      200: '#DADFFF',
      300: '#C2C9FF',
      400: '#9FA8FF',
      500: '#5B61F6', // PRIMARY CTA
      600: '#4B4FE0',
      700: '#3E41B8',
      800: '#2F3192',
      900: '#1F206B'
    },

    neutral: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B'
    }
  },

  fonts: {
    heading: `'Inter', system-ui, sans-serif`,
    body: `'Inter', system-ui, sans-serif`
  },

  radii: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '18px'
  },

  styles: {
    global: {
      'html, body': {
        overflowX: 'hidden',
        maxWidth: '100vw'
      },
      body: {
        bg: 'neutral.50',
        color: 'n',
        minHeight: '100vh',
        backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 8%, #F4F4F5 100%)'
      }
    }
  },

  components: {
    Header: {
      baseStyle: {
        container: {
          width: 'full',
          bg: 'neutral.50',
          borderBottom: 'none',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        },
        content: {
          maxWidth: 'container.xxxl',
          mx: 'auto',
          px: [4, 4, 6, 8],
          py: [2, 2, 3, 4]
        },
        logo: {
          width: [8, 8, 10, 12],
          height: [6, 6, 7, 8],
          color: 'white'
        },
        icons: {
          color: 'black',
          mb: [1, 1, 2, 0],
          transition: 'all 0.2s ease',
          _hover: {
            color: 'black',
            transform: 'scale(1.05)'
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
          color: 'whiteAlpha.800'
        },
        wishlistIcon: {
          ml: 2
        },
        popoverContent: {
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: 'neutral.200',
          boxShadow: 'xl'
        },
        signout: {
          width: '100%',
          height: 11,
          px: 4,
          py: 3,
          mt: 1,
          borderRadius: 'md',
          _hover: {
            bg: 'neutral.100'
          }
        },
        signoutIcon: {
          mr: 2,
          color: 'neutral.600'
        },
        signoutText: {
          fontSize: 'sm',
          fontWeight: 500,
          color: 'neutral.700'
        }
      }
    },

    ListMenu: {
      baseStyle: {
        listMenuTriggerLink: {
          color: 'black',
          _hover: {
            color: 'blackAlpha.900',
            textDecoration: 'none'
          }
        },
        listMenuTriggerLinkActive: {
          color: 'black',
          _before: {
            backgroundColor: 'black'
          }
        },
        listMenuTriggerlessLinkActive: {
          color: 'black',
          _before: {
            backgroundColor: 'black'
          }
        },
        listMenuTriggerLinkIcon: {
          color: 'black',
          _hover: {
            color: 'black'
          }
        },
        listMenuTriggerIcon: {
          color: 'black',
          _hover: {
            color: 'black'
          }
        }
      }
    },

    Footer: {
      baseStyle: {
        container: {
          width: 'full',
          bgGradient: 'linear(to-b, neutral.50, neutral.900)',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.3)'
        },
        content: {
          maxWidth: 'container.xxl',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'whiteAlpha.900',
          paddingTop: {base: 8, lg: 10},
          paddingBottom: 8,
          paddingLeft: [4, 4, 6, 8],
          paddingRight: [4, 4, 6, 8]
        },
        subscribeHeading: {
          fontSize: 'md',
          marginBottom: 2,
          color: '#000',
          fontWeight: 600
        },
        subscribeMessage: {
          fontSize: 'sm',
          marginBottom: 4,
          color: 'whiteAlpha.800'
        },
        subscribeField: {
          background: 'white',
          color: 'gray.900',
          borderRadius: 'lg',
          border: '1px solid',
          borderColor: 'neutral.200'
        },
        copyright: {
          fontSize: 'sm',
          marginBottom: 6,
          color: 'whiteAlpha.700'
        },
        horizontalRule: {
          marginTop: 4,
          marginBottom: 4,
          borderColor: 'whiteAlpha.300'
        },
        socialIcons: {
          marginTop: 4
        }
      }
    },

    App: {
      baseStyle: {
        container: {
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
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
        fontWeight: 500,
        borderRadius: 'lg'
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600'
          }
        }
      }
    },

    Card: {
      baseStyle: {
        container: {
          bg: 'white',
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'neutral.200',
          overflow: 'hidden',
          transition: 'all 0.25s ease',
          _hover: {
            boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
            transform: 'translateY(-3px)',
            borderColor: 'neutral.300'
          }
        }
      }
    },

    ProductTile: {
      baseStyle: {
        container: {
          position: 'relative',
          bg: 'white',
          borderRadius: 'xl',
          border: '1px solid',
          borderColor: 'neutral.200',
          overflow: 'hidden',
          padding: 0,
          transition: 'all 0.25s ease',
          _hover: {
            boxShadow: '0 12px 28px rgba(0,0,0,0.08)',
            transform: 'translateY(-3px)',
            borderColor: 'neutral.300'
          }
        },
        imageWrapper: {
          position: 'relative',
          marginBottom: 0,
          overflow: 'hidden',
          borderTopRadius: 'xl'
        },
        image: {
          ratio: 1,
          paddingBottom: 2
        },
        link: {
          display: 'block',
          padding: 4
        },
        title: {
          fontWeight: 600,
          fontSize: 'sm',
          color: 'neutral.900',
          noOfLines: 2,
          lineHeight: 'tall'
        },
        price: {
          fontSize: 'md',
          fontWeight: 600,
          color: 'neutral.900',
          mt: 1
        }
      }
    },

    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            borderColor: 'neutral.300',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px #5B61F6'
            }
          }
        }
      }
    },

    Heading: {
      baseStyle: {
        fontWeight: 600,
        color: 'neutral.900'
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
          width: {base: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)', lg: 'calc(25% - 12px)'},
          minWidth: {base: '140px', md: '160px'},
          flex: '0 0 auto'
        }
      }
    }
  }
})

export default customTheme
