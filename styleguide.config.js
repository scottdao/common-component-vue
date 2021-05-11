const path = require('path')

module.exports = {
    sections: [{
            name: '介绍',
            content: 'docs/introduction.md',
        },
        {
            name: '文档',
            sections: [{
                name: '安装',
                content: 'docs/installation.md',
            }, ],
        },
        {
            name: '组件',
            components: 'src/components/**/*.vue',
            exampleMode: 'collapse', // 'hide' | 'collapse' | 'expand'
            usageMode: 'expand', // 'hide' | 'collapse' | 'expand'
        },
    ],
    styleguideComponents: {
        // Wrapper: path.join(__dirname, 'src/styleguide/Wrapper'), // styleguilde 文档wrapper，配置公共样式等
    },
}