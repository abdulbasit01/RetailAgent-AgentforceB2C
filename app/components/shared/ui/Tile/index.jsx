import React from 'react'
import PropTypes from 'prop-types'
import {AspectRatio, Box, Flex, Link, Text} from '@chakra-ui/react'

export const Tile = ({
    href = '/',
    image,
    label,
    subLabel,
    bg = 'gray.100',
    ctaLabel = 'Shop →',
    ratio = 3 / 4
}) => {
    return (
        <Link href={href} _hover={{textDecoration: 'none'}}>
            <Box
                borderRadius="xl"
                overflow="hidden"
                position="relative"
                bg={bg}
                cursor="pointer"
                transition="transform 0.25s ease, box-shadow 0.25s ease"
                _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.18)'
                }}
            >
                <AspectRatio ratio={ratio}>
                    <Box position="relative" w="full" h="full">
                        <Box
                            position="absolute"
                            inset={0}
                            bgImage={`url(${image})`}
                            bgSize="cover"
                            bgPosition="center top"
                            opacity={0.85}
                        />

                        <Box
                            position="absolute"
                            inset={0}
                            bgGradient="
                                linear(
                                    to-t,
                                    rgba(0,0,0,0.82) 0%,
                                    rgba(0,0,0,0.1) 50%,
                                    transparent 100%
                                )
                            "
                        />

                        <Flex
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            p={[4, 5, 6]}
                            direction="column"
                            align="flex-start"
                        >
                            <Text
                                fontSize={['lg', 'xl', '2xl']}
                                fontWeight={900}
                                color="white"
                                textTransform="uppercase"
                                letterSpacing="-0.02em"
                                lineHeight={1}
                            >
                                {label}
                            </Text>

                            {subLabel && (
                                <Text
                                    fontSize="xs"
                                    fontWeight={600}
                                    color="rgba(255,255,255,0.75)"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                    mt={1}
                                >
                                    {subLabel}
                                </Text>
                            )}

                            <Box
                                mt={3}
                                px={3}
                                py="5px"
                                bg="white"
                                borderRadius="full"
                                display="inline-flex"
                                alignItems="center"
                            >
                                <Text
                                    fontSize="xs"
                                    fontWeight={700}
                                    color="#111111"
                                    textTransform="uppercase"
                                    letterSpacing="0.08em"
                                    lineHeight={1}
                                >
                                    {ctaLabel}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                </AspectRatio>
            </Box>
        </Link>
    )
}

Tile.propTypes = {
    href: PropTypes.string,
    image: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    subLabel: PropTypes.string,
    bg: PropTypes.string,
    ctaLabel: PropTypes.string,
    ratio: PropTypes.number
}
