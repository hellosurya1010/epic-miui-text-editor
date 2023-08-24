export const addNodeAttributes = () => {
    const attrs = ["class", "value", "w-rsidR", "w-rsidRDefault", "w-rsidP", "w-val", "w-id", "w-name", "w-type", "w-rsidRPr", "w-w", "w-h", "w-top", "w-right", "w-bottom", "w-left", "w-header", "w-footer", "w-gutter", "w-space", "w-linePitch", "name",];
    return attrs.reduce((acc, attr) => {
        acc[attr] = {
            default: '',
            parseHTML: (node: HTMLElement) => {
                // // const headingLevel = HeadingClasses.find(headingLevel => node.classList.contains(headingLevel));
                // console.log(node);
                // return '';
                return node.getAttribute(attr);
            },
        }
        return acc;
    }, {});
}

export const removeEmptyAttributes = (attrs) => {
    return Object.keys(attrs).reduce((acc, attr) => {
        const attrValue = attrs[attr];
        if (attrValue != "") {
            acc[attr] = attrValue;
        }
        return acc;
    }, {});
}