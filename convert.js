let doc = {
    "type": "doc",
    "content": [
        {
            "type": "heading",
            "attrs": {
                "textAlign": "center",
                "level": 2,
                "class": "Heading1 ExtraClass"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Hey there 👋"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "textAlign": "center",
                "level": 1,
                "class": "NoHeading"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Hey there 👋"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "This is a "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "italic"
                        }
                    ],
                    "text": "basic"
                },
                {
                    "type": "text",
                    "text": " example of "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "code"
                        }
                    ],
                    "text": "mui-tiptap"
                },
                {
                    "type": "text",
                    "text": ", which combines "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://tiptap.dev/",
                                "target": "_blank",
                                "class": null
                            }
                        }
                    ],
                    "text": "Tiptap"
                },
                {
                    "type": "text",
                    "text": " with customizable "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "link",
                            "attrs": {
                                "href": "https://mui.com/",
                                "target": "_blank",
                                "class": null
                            }
                        }
                    ],
                    "text": "MUI (Material-UI)"
                },
                {
                    "type": "text",
                    "text": " styles, plus a suite of additional components and extensions! Sure, there are "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": "all "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        },
                        {
                            "type": "italic"
                        }
                    ],
                    "text": "kinds"
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": " of "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        },
                        {
                            "type": "strike"
                        }
                    ],
                    "text": "text"
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": " "
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        },
                        {
                            "type": "underline"
                        }
                    ],
                    "text": "formatting"
                },
                {
                    "type": "text",
                    "marks": [
                        {
                            "type": "bold"
                        }
                    ],
                    "text": " options"
                },
                {
                    "type": "text",
                    "text": " you’d probably expect from a rich text editor. But wait until you see the lists:"
                }
            ]
        },
        {
            "type": "bulletList",
            "content": [
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "textAlign": "left",
                                "class": "Paragraph"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "That’s a bullet list with one …"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "listItem",
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "textAlign": "left",
                                "class": "Paragraph"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "… or two list items."
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:"
                }
            ]
        },
        {
            "type": "codeBlock",
            "attrs": {
                "language": "css"
            },
            "content": [
                {
                    "type": "text",
                    "text": "body {\n  display: none;\n}"
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            }
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "That’s only the tip of the iceberg. Feel free to add and resize images:"
                }
            ]
        },
        {
            "type": "image",
            "attrs": {
                "textAlign": "left",
                "src": "http://placekitten.com/g/500",
                "alt": "wat",
                "title": null,
                "width": "257",
                "aspectRatio": "1 / 1"
            }
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            }
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Organize information in tables:"
                }
            ]
        },
        {
            "type": "table",
            "content": [
                {
                    "type": "tableRow",
                    "content": [
                        {
                            "type": "tableHeader",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Name"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableHeader",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Role"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableHeader",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Team"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tableRow",
                    "content": [
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Alice"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "PM"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Internal tools"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "tableRow",
                    "content": [
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Bob"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Software"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "type": "tableCell",
                            "attrs": {
                                "colspan": 1,
                                "rowspan": 1,
                                "colwidth": null
                            },
                            "content": [
                                {
                                    "type": "paragraph",
                                    "attrs": {
                                        "textAlign": "left",
                                        "class": "Paragraph"
                                    },
                                    "content": [
                                        {
                                            "type": "text",
                                            "text": "Infrastructure"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            }
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Or write down your groceries:"
                }
            ]
        },
        {
            "type": "taskList",
            "content": [
                {
                    "type": "taskItem",
                    "attrs": {
                        "checked": true
                    },
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "textAlign": "left",
                                "class": "Paragraph"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Milk"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "taskItem",
                    "attrs": {
                        "checked": false
                    },
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "textAlign": "left",
                                "class": "Paragraph"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Eggs"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "taskItem",
                    "attrs": {
                        "checked": false
                    },
                    "content": [
                        {
                            "type": "paragraph",
                            "attrs": {
                                "textAlign": "left",
                                "class": "Paragraph"
                            },
                            "content": [
                                {
                                    "type": "text",
                                    "text": "Sriracha"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "blockquote",
            "content": [
                {
                    "type": "paragraph",
                    "attrs": {
                        "textAlign": "left",
                        "class": "Paragraph"
                    },
                    "content": [
                        {
                            "type": "text",
                            "text": "Wow, that’s amazing. Good work! 👏 "
                        },
                        {
                            "type": "hardBreak"
                        },
                        {
                            "type": "text",
                            "text": "— Mom"
                        }
                    ]
                }
            ]
        },
        {
            "type": "paragraph",
            "attrs": {
                "textAlign": "left",
                "class": "Paragraph"
            },
            "content": [
                {
                    "type": "text",
                    "text": "Give it a try and click around!"
                }
            ]
        }
    ]
}

function converter(contents) {
    return contents.map(content => {
        const { type, content: c, text } = content;
        return `<${type}>${c != undefined ? converter(c) : text}<${type}/>`
    }).join('');
}
console.log(`<doc>${converter(doc.content)}</doc>`);