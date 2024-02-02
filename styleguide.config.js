const path = require("path");
const fs = require("fs");

const file = (filepath) => path.join(__dirname, filepath);

module.exports = {
    title: "NavMenu",
    pagePerSection: true,
    skipComponentsWithoutExample: false,
    propsParser: require("react-docgen-typescript").withCustomConfig(
        file("tsconfig.json"),
        {
            savePropValueAsString: true,
            shouldExtractLiteralValuesFromEnum: true,
            propFilter(prop) {
                if (prop.parent) {
                    return !prop.parent.fileName.includes("node_modules");
                }
                return true;
            },
            componentNameResolver: (exp, source) =>
                exp.getName() === "StyledComponentClass" &&
                require("react-docgen-typescript").getDefaultExportForFile(
                    source
                ),
        }
    ).parse,
    getComponentPathLine: (pathname) => {
        const { name } = path.parse(pathname);
        return `import { ${name} } from 'mui-nav-menu'`;
    },
    updateExample(props, exampleFilePath) {
        const { settings, lang } = props;
        if (settings && settings.file && typeof settings.file === "string") {
            // "absolute path to mySourceCode.js"
            const filepath = path.resolve(exampleFilePath, settings.file);
            // displays the block as static code
            settings.static = true;
            // no longer needed
            delete settings.file;
            return {
                content: fs.readFileSync(filepath, "utf8"),
                settings,
                lang,
            };
        }
        return props;
    },
    styleguideDir: path.resolve(__dirname, "styleguide/public"),
    sections: [
        {
            name: "Introduction",
            content: "README.md",
        },
        {
            name: "Usage",
            description: "The description for the installation section",
            sections: [
                {
                    components: "src/NavMenu.tsx",
                    exampleMode: "expand", // 'hide' | 'collapse' | 'expand'
                    usageMode: "expand", // 'hide' | 'collapse' | 'expand'
                },
                {
                    name: "Common File",
                    content: "docs/common.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "Basic",
                    content: "docs/basic.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "Vertical",
                    content: "docs/vertical.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "Horizontal",
                    content: "docs/horizontal.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "Controlled Open Items",
                    content: "docs/controlledOpenItems.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
                {
                    name: "Offset Setting",
                    content: "docs/offset.md",
                    exampleMode: "expand",
                    usageMode: "expand",
                },
            ],
        },
    ],
    template: {
        head: {
            meta: [
                {
                    name: "description",
                    content: "mui-nav-menu",
                },
            ],
        },
    },
    theme: {
        color: {
            link: "#4B4E6A",
            linkHover: "#2B3847",
            baseBackground: "#fff",
            border: "#D0DAE4",
            sidebarBackground: "#fff",
        },
        fontFamily: {
            base: '"Source Sans Pro", sans-serif',
        },
    },
    ribbon: {
        url: "https://github.com/bigrivi/mui-nav-menu",
        text: "Fork me on GitHub",
    },
};
