// At the very top of Home.jsx
import React, { useEffect } from 'react'
import { useIntl, FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'

// Slick Slider imports
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Components
import {
    Box,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link
} from '@salesforce/retail-react-app/app/components/shared/ui'

// Project Components
import Hero from '@salesforce/retail-react-app/app/components/hero'
import Seo from '@salesforce/retail-react-app/app/components/seo'
import Section from '@salesforce/retail-react-app/app/components/section'
import ProductScroller from '@salesforce/retail-react-app/app/components/product-scroller'
import Island from '@salesforce/retail-react-app/app/components/island'

// Hooks
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'
import useDataCloud from '@salesforce/retail-react-app/app/hooks/use-datacloud'
import { useServerContext } from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import { useProductSearch } from '@salesforce/commerce-sdk-react'

// Utilities & Constants
import { getAssetUrl } from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import { heroFeatures, features } from '@salesforce/retail-react-app/app/pages/home/data'
import {
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT,
    MAX_CACHE_AGE,
    STALE_WHILE_REVALIDATE
} from '@salesforce/retail-react-app/app/constants'

const Home = () => {
    const intl = useIntl()
    const einstein = useEinstein()
    const dataCloud = useDataCloud()
    const { pathname } = useLocation()
    const { res } = useServerContext()

    if (res) {
        res.set(
            'Cache-Control',
            `s-maxage=${MAX_CACHE_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
        )
    }

    const { data: productSearchResult, isLoading } = useProductSearch({
        parameters: {
            allImages: true,
            allVariationProperties: true,
            expand: ['promotions', 'variations', 'prices', 'images', 'custom_properties'],
            limit: HOME_SHOP_PRODUCTS_LIMIT,
            perPricebook: true,
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master']
        }
    })

    useEffect(() => {
        einstein.sendViewPage(pathname)
        dataCloud.sendViewPage(pathname)
    }, [])

    return (
        <Box data-testid="home-page"  className="pageWrapper">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            {/* Hero Section */}
            <Island hydrateOn={'visible'}>
                <Hero
                    title={intl.formatMessage({
                        defaultMessage: 'The React PWA Starter Store for Retail',
                        id: 'home.title.react_starter_store'
                    })}
                    className="section-container"
                    img={{
                        src: getAssetUrl('static/img/hero.png'),
                        alt: 'npx pwa-kit-create-app',
                        fetchPriority: 'high'
                    }}
                    actions={
                        <Stack spacing={{ base: 4, sm: 6 }} direction={{ base: 'column', sm: 'row' }}>
                            <Button
                                as={Link}
                                href="https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/getting-started.html"
                                target="_blank"
                                width={{ base: 'full', md: 'inherit' }}
                                paddingX={7}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <FormattedMessage
                                    defaultMessage="Get started"
                                    id="home.link.get_started"
                                />
                            </Button>
                        </Stack>
                    }
                />
            </Island>

            {/* Hero Features Section */}
            <Island hydrateOn={'visible'}>
                <Section
                    background={'#ddd'}
                    marginX="auto"
                    paddingY={{ base: 8, md: 16 }}
                    paddingX={{ base: 4, md: 8 }}
                    borderRadius="base"
                    width={{ base: '100vw', md: 'inherit' }}
                    position={{ base: 'relative', md: 'inherit' }}
                    left={{ base: '50%', md: 'inherit' }}
                    right={{ base: '50%', md: 'inherit' }}
                    marginLeft={{ base: '-50vw', md: 'auto' }}
                    marginRight={{ base: '-50vw', md: 'auto' }}
                >
                    <SimpleGrid
                        columns={{ base: 1, md: 1, lg: 3 }}
                        spacingX={{ base: 1, md: 4 }}
                        spacingY={{ base: 4, md: 14 }}
                    >
                        {heroFeatures.map((feature, index) => (
                            <Link key={index} target="_blank" href={feature.href}>
                                <Box
                                    background={'white'}
                                    boxShadow="0px 2px 2px rgba(0, 0, 0, 0.1)"
                                    borderRadius={'4px'}
                                >
                                    <HStack>
                                        <Flex
                                            paddingLeft={6}
                                            height={24}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            {feature.icon}
                                        </Flex>
                                        <Text fontWeight="700">
                                            {intl.formatMessage(feature.message.title)}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Link>
                        ))}
                    </SimpleGrid>
                </Section>
            </Island>

            {/* Shop Products Section with Slick Slider */}
            {productSearchResult && (
                <Island hydrateOn={'visible'}>
                    <Section
                        py={16}
                        title={intl.formatMessage({
                            defaultMessage: 'Shop Products',
                            id: 'home.heading.shop_products'
                        })}
                        className="section-container"
                        subtitle={intl.formatMessage(
                            {
                                defaultMessage:
                                    'This section contains content from the catalog. {docLink} on how to replace it.',
                                id: 'home.description.shop_products',
                            },
                            {
                                docLink: (
                                    <Link
                                        target="_blank"
                                        href={'https://sfdc.co/business-manager-manage-catalogs'}
                                        textDecoration={'none'}
                                    >
                                        {intl.formatMessage({
                                            defaultMessage: 'Read docs',
                                            id: 'home.link.read_docs'
                                        })}
                                    </Link>
                                )
                            }
                        )}
                    >
                        <Box pt={8}>
                            {typeof window !== "undefined" && (
                                <Slider
                                    dots={false}        // hide bullets
                                    arrows={true}       // show arrows
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={4}
                                    slidesToScroll={1}
                                    responsive={[
                                        { breakpoint: 1024, settings: { slidesToShow: 3 } },
                                        { breakpoint: 768, settings: { slidesToShow: 2 } },
                                        { breakpoint: 480, settings: { slidesToShow: 1 } }
                                    ]}
                                    className="slick-intance-chakra"
                                >
                                    {productSearchResult.hits.map((product, index) => (
                                        <Box key={index} padding={2}>
                                            <ProductScroller
                                                products={[product]}
                                                isLoading={isLoading}
                                                imgProps={{ width: "100%", height: "auto" }} // Chakra Image 100%
                                                className="product-item-wrapper"
                                            />
                                        </Box>
                                    ))}
                                </Slider>
                            )}
                        </Box>
                    </Section>
                </Island>
            )}

            {/* Features Section as Horizontal Cards */}
            <Island hydrateOn={'visible'}>
                <Section
                    paddingTop={20}
                    paddingBottom={20}
                    className="feature-section"
                    title={intl.formatMessage({
                        defaultMessage: 'Features',
                        id: 'home.heading.features'
                    })}
                    bg={'#ddd'}
                    subtitle={intl.formatMessage({
                        defaultMessage:
                            'Out-of-the-box features so that you focus only on adding enhancements.',
                        id: 'home.description.features'
                    })}
                >
                    <Container maxW={'6xl'} marginTop={10}>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                            {features.map((feature, index) => (
                                <Box
                                    key={index}
                                    p={4}
                                    borderRadius="md"
                                    boxShadow="md"
                                    bg="white"
                                    _hover={{ boxShadow: "lg", transform: "translateY(-2px)", transition: "all 0.3s" }}
                                >
                                    <HStack align="start" spacing={4}>
                                        {/* Icon on the left */}
                                        <Flex
                                            width={16}
                                            height={16}
                                            align="center"
                                            justify="center"
                                            bg="gray.100"
                                            borderRadius="full"
                                            color="gray.900"
                                            flexShrink={0}
                                        >
                                            {feature.icon}
                                        </Flex>

                                        {/* Text content on the right */}
                                        <VStack align="start" spacing={1}>
                                            <Text
                                                as="h3"
                                                color="black"
                                                fontWeight={700}
                                                fontSize="lg"
                                            >
                                                {intl.formatMessage(feature.message.title)}
                                            </Text>

                                            <Text color="gray.700">
                                                {intl.formatMessage(feature.message.text)}
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Container>
                </Section>
            </Island>

            {/* Contact Section */}
            <Island hydrateOn={'visible'}>
                <Section
                    py={'40px'}
                    title={intl.formatMessage({
                        defaultMessage: "We're here to help",
                        id: 'home.heading.here_to_help'
                    })}
                    className="help-section"
                    bg={'#101010'}
                    color={'#fff'}
                    subtitle={
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'Contact our support staff.',
                                id: 'home.description.here_to_help'
                            })}
                            <br />
                            {intl.formatMessage({
                                defaultMessage: 'They will get you to the right place.',
                                id: 'home.description.here_to_help_line_2'
                            })}
                        </>
                    }
                    actions={
                        <Button
                            as={Link}
                            href="https://help.salesforce.com/s/?language=en_US"
                            target="_blank"
                            width={'auto'}
                            paddingX={7}
                            _hover={{ textDecoration: 'none' }}
                        >
                            <FormattedMessage
                                defaultMessage="Contact Us"
                                id="home.link.contact_us"
                            />
                        </Button>
                    }
                    maxWidth={'xl'}
                />
            </Island>
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home
