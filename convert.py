import json

with open('content.json', 'r') as json_file:
    data = json.load(json_file)


def parserFunciton(tag):
    def parser(node):
        print(node)
    return parser

blockTags = {
    "doc": parserFunciton("doc"),
    "heading": parserFunciton("heading"),
    "orderedList": parserFunciton("orderedList"),
    "listItem": parserFunciton("listItem"),
    "paragraph": parserFunciton("paragraph"),
    "codeBlock": parserFunciton("codeBlock"),
    "image": parserFunciton("image"),
    "table": parserFunciton("table"),
    "tableRow": parserFunciton("tableRow"),
    "tableHeader": parserFunciton("tableHeader"),
    "tableCell": parserFunciton("tableCell"),
    "taskList": parserFunciton("taskList"),
    "taskItem": parserFunciton("taskItem"),
    "blockquote": parserFunciton("blockquote"),
    "hardBreak": parserFunciton("hardBreak"),
}

markTags = {
    "code": "w:code",
    "link": "w:link",
    "bold": "w:bold",
    "italic": "w:italic",
    "strike": "w:strike",
    "underline": "w:underline",
}

def innterContent(innerNodes):
    if innerNodes is not None:
        # return ''.join(map(marksParser, innerNodes))
        print(innerNodes)
    return ""

def jsonToHTML(nodes):
    count = 0
    def nodesParser(node):
        tag = node['type']  
        count += 1
        if tag == "text":
            return node['text']
        else:
            return f"<{blockTags[tag]}>" + innterContent(node.get('content')) + f"</{blockTags[tag]}>"
    return ''.join(map(nodesParser, nodes))

print(f"<doc>" + jsonToHTML(data['content']) + "</doc>")