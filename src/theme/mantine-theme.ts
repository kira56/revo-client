import { Container, createTheme, em, rem } from "@mantine/core"

const BREAKPOINTS: Record<string, number> = {
    md: 800,
    lg: 1300,
}

const CONTAINER_SIZES: Record<string, string> = {
    md: rem(BREAKPOINTS.md),
    lg: rem(BREAKPOINTS.lg),
}

export const mantineTheme = createTheme({
    cursorType: "pointer",
    fontFamily: 'Open Sans, sans-serif',
    fontFamilyMonospace: "Roboto, sans-serif",
    primaryColor: "violet",
    headings: {
        fontFamily: "Roboto, sans-serif",
        sizes: {
            h1: {
                fontSize: rem(40),
                lineHeight: "1.2",
            },
            h2: {
                fontSize: rem(32),
                lineHeight: "1.35",
            },
            h3: {
                fontSize: rem(24),
                lineHeight: "1.33",
            },
            h4: {
                fontSize: rem(20),
                lineHeight: "1.2",
            },
            h5: {
                fontSize: rem(16),
                lineHeight: "1.25",
            },
            h6: {
                fontSize: rem(12),
                lineHeight: "1.33",
            },
        },
        fontWeight: "700",
    },
    fontSizes: {
        xxs: rem(10),
        xs: rem(12),
        sm: rem(14),
        md: rem(16),
        lg: rem(18),
        xl: rem(20),
    },
    lineHeights: {
        xxs: "1.2",
        xs: "1.16",
        sm: "1.14",
        md: "1.14",
        lg: "1.11",
        xl: "1.2",
    },
    breakpoints: {
        md: em(BREAKPOINTS.md),
        lg: em(BREAKPOINTS.lg),
    },
    components: {
        Container: Container.extend({
            vars: (_, { size, fluid }) => ({
                root: {
                    "--container-size": fluid
                        ? "100%"
                        : size !== undefined && size in CONTAINER_SIZES
                            ? CONTAINER_SIZES[size as keyof typeof CONTAINER_SIZES]
                            : rem(size),
                },
            }),
        }),
        TextInput: {
            styles: () => ({
                label: {
                    fontWeight: 600,
                },
            }),
        },
        Select: {
            styles: () => ({
                label: {
                    fontWeight: 600,
                },
            }),
        },
        MultiSelect: {
            styles: () => ({
                label: {
                    fontWeight: 600,
                },
            }),
        },
        DatePickerInput: {
            styles: () => ({
                label: {
                    fontWeight: 600,
                },
            }),
        }
    },
})
