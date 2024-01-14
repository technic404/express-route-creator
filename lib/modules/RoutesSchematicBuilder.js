const fs = require('fs');

class RoutesSchematicBuilder {
    constructor() {

    }

    /**
     * 
     * @param {RouteRequestMethod} method 
     * @param {RouteBuilderSettings} routeBuilderSettings 
     */
    #getRouteFileContent(method, routeBuilderSettings) {
        const parts = [
            `const RouteBuilder = require("../../lib/modules/RouteBuilder");`,
            ``,
            `module.exports = new RouteBuilder().setSchematic({`
        ];

        for(const [key, value] of Object.entries(routeBuilderSettings)) {
            if(value === undefined) continue;

            parts.push(`    ${key}: {`)

            for(const [param, settings] of Object.entries(value)) {
                if(settings === undefined) continue;

                parts.push(`        ${param}: {`)

                for(const [settingName, settingValue] of Object.entries(settings)) {
                    if(settingValue === undefined) continue;

                    const isString = typeof settingValue === "string";
                    const parsedSettingValue = isString
                        ? `"${settingValue}"`
                        : settingValue

                    parts.push(`            ${settingName}: ${parsedSettingValue},`);
                }

                parts.push(`        },`)
            }

            parts.push(`    },`)
        }

        parts.push(`})`);

        
        parts.push(`.${method}(async (req, res) => {`);
        parts.push(`    `);
        parts.push(`});`);

        return parts.join("\n");
    }

    /**
     * 
     * @param {string} dir directory where routes should be created
     * @param {RouteSchematic} schematic schematic of the routes
     */
    create(dir, schematic) {
        const categories = Object.entries(schematic);

        for(const [categoryName, categoryValue] of categories) {
            const subCategories = Object.entries(categoryValue);
            const categoryPath = `${dir}/${categoryName}`;

            fs.mkdirSync(categoryPath, { recursive: true });

            for(const [subCategoryName, settings] of subCategories) {
                const routeFilePath = `${categoryPath}/${subCategoryName}.js`;

                fs.writeFileSync(routeFilePath, this.#getRouteFileContent(settings.method, { body: settings.body, query: settings.query }))
            }
        }
    }
}

module.exports = RoutesSchematicBuilder;